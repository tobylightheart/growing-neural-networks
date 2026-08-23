#!/usr/bin/env python3
"""Deterministic 2-D Growing Neural Gas teaching trace.

The update order follows Fritzke (1995), section 3, steps 0--10. The finite
input stream, initial prototypes, parameters, tie policy, and rounding are
pinned educational choices; this is not a reproduction of the paper's runs.
"""
from __future__ import annotations

import copy
import json
import math
from typing import Any

DIGITS = 6


def rounded(value: float) -> float:
    result = round(float(value), DIGITS)
    return 0.0 if result == 0.0 else result


def edge_key(left: int, right: int) -> tuple[int, int]:
    if left == right:
        raise ValueError("self-edges are not part of GNG")
    return (left, right) if left < right else (right, left)


def distance_squared(left: list[float], right: list[float]) -> float:
    if len(left) != len(right):
        raise ValueError("input and prototype dimensions must match")
    return sum((a - b) ** 2 for a, b in zip(left, right))


def policy() -> dict[str, Any]:
    return {
        "winner_rate": 0.2,
        "neighbor_rate": 0.05,
        "maximum_edge_age": 2,
        "insertion_interval": 4,
        "insertion_error_reduction": 0.5,
        "global_error_decay": 0.9,
        "round_digits": DIGITS,
        "tie_breaking": "lowest node id wins equal values",
        "initial_nodes": [
            {"id": 0, "position": [0.1, 0.2]},
            {"id": 1, "position": [0.9, 0.2]},
        ],
        "input_order": [
            [0.15, 0.8], [0.85, 0.8], [0.2, 0.75], [0.8, 0.75],
            [0.5, 0.9], [0.18, 0.72], [0.82, 0.72], [0.5, 0.85],
            [0.12, 0.78], [0.88, 0.78], [0.5, 0.82], [0.22, 0.7],
        ],
        "parameter_status": "pinned demo choices, not Fritzke's experimental defaults",
    }


def initial_state() -> dict[str, Any]:
    return {
        "nodes": {
            0: {"position": [0.1, 0.2], "error": 0.0},
            1: {"position": [0.9, 0.2], "error": 0.0},
        },
        "edges": {},
        "next_node_id": 2,
    }


def neighbors(state: dict[str, Any], node_id: int) -> list[int]:
    result = []
    for left, right in state["edges"]:
        if left == node_id:
            result.append(right)
        elif right == node_id:
            result.append(left)
    return sorted(result)


def serialize(state: dict[str, Any]) -> dict[str, Any]:
    return {
        "nodes": [
            {"id": node_id, "position": node["position"][:], "error": node["error"]}
            for node_id, node in sorted(state["nodes"].items())
        ],
        "edges": [
            {"nodes": [left, right], "age": age}
            for (left, right), age in sorted(state["edges"].items())
        ],
    }


def step(state: dict[str, Any], sample: list[float], cfg: dict[str, Any], iteration: int) -> dict[str, Any]:
    before = serialize(state)
    ranking = sorted(
        ((distance_squared(sample, node["position"]), node_id) for node_id, node in state["nodes"].items()),
        key=lambda item: (item[0], item[1]),
    )
    winner_distance_squared, winner = ranking[0]
    runner = ranking[1][1]

    aged_edges = []
    for edge in list(state["edges"]):
        if winner in edge:
            state["edges"][edge] += 1
            aged_edges.append({"nodes": list(edge), "age": state["edges"][edge]})

    state["nodes"][winner]["error"] = rounded(
        state["nodes"][winner]["error"] + winner_distance_squared
    )

    moved = []
    participants = [(winner, cfg["winner_rate"])] + [
        (node_id, cfg["neighbor_rate"]) for node_id in neighbors(state, winner)
    ]
    for node_id, rate in participants:
        node = state["nodes"][node_id]
        old = node["position"][:]
        node["position"] = [rounded(value + rate * (target - value)) for value, target in zip(old, sample)]
        moved.append({"node": node_id, "before": old, "after": node["position"][:]})

    winning_edge = edge_key(winner, runner)
    state["edges"][winning_edge] = 0

    deleted_edges = []
    for edge, age in list(state["edges"].items()):
        if age > cfg["maximum_edge_age"]:
            deleted_edges.append(list(edge))
            del state["edges"][edge]

    connected = {node_id for edge in state["edges"] for node_id in edge}
    deleted_nodes = []
    for node_id in sorted(list(state["nodes"])):
        if node_id not in connected:
            deleted_nodes.append(node_id)
            del state["nodes"][node_id]

    insertion = None
    if iteration % cfg["insertion_interval"] == 0:
        q = min(state["nodes"], key=lambda node_id: (-state["nodes"][node_id]["error"], node_id))
        q_neighbors = neighbors(state, q)
        if not q_neighbors:
            raise ValueError("maximum-error node has no neighbor for insertion")
        f = min(q_neighbors, key=lambda node_id: (-state["nodes"][node_id]["error"], node_id))
        new_id = state["next_node_id"]
        state["next_node_id"] += 1
        midpoint = [rounded((a + b) / 2.0) for a, b in zip(state["nodes"][q]["position"], state["nodes"][f]["position"])]
        state["nodes"][q]["error"] = rounded(state["nodes"][q]["error"] * cfg["insertion_error_reduction"])
        state["nodes"][f]["error"] = rounded(state["nodes"][f]["error"] * cfg["insertion_error_reduction"])
        state["nodes"][new_id] = {"position": midpoint, "error": state["nodes"][q]["error"]}
        state["edges"].pop(edge_key(q, f), None)
        state["edges"][edge_key(q, new_id)] = 0
        state["edges"][edge_key(f, new_id)] = 0
        insertion = {"node": new_id, "between": [q, f], "position": midpoint}

    for node in state["nodes"].values():
        node["error"] = rounded(node["error"] * cfg["global_error_decay"])

    return {
        "iteration": iteration,
        "input": sample[:],
        "winner": winner,
        "runner_up": runner,
        "winner_distance_squared": rounded(winner_distance_squared),
        "aged_edges": aged_edges,
        "moved_prototypes": moved,
        "inserted": insertion,
        "deleted_edges": deleted_edges,
        "deleted_nodes": deleted_nodes,
        "state_before": before,
        "state_after": serialize(state),
    }


def run_experiment() -> dict[str, Any]:
    cfg = policy()
    state = initial_state()
    start = serialize(copy.deepcopy(state))
    trace = [step(state, sample, cfg, iteration) for iteration, sample in enumerate(cfg["input_order"], 1)]
    return {
        "algorithm": "growing-neural-gas",
        "claim_scope": ["toy-mechanism", "paper-grounded-update-order", "not-a-full-paper-reproduction", "not-human-reviewed"],
        "explanatory_question": "How do moving prototypes, competitive-Hebbian edges, local edge aging, and periodic error-driven insertion jointly grow a 2-D topology?",
        "policy": cfg,
        "initial_state": start,
        "step_trace": trace,
        "summary": {
            "inputs_seen": len(trace),
            "insertions": sum(row["inserted"] is not None for row in trace),
            "prototype_moves": sum(len(row["moved_prototypes"]) for row in trace),
            "edge_age_events": sum(len(row["aged_edges"]) for row in trace),
            "edge_deletions": sum(len(row["deleted_edges"]) for row in trace),
            "final_node_count": len(state["nodes"]),
            "final_edge_count": len(state["edges"]),
        },
        "final_state": serialize(state),
    }


if __name__ == "__main__":
    print(json.dumps(run_experiment(), indent=2))
