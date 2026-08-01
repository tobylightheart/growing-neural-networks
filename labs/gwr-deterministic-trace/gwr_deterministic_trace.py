#!/usr/bin/env python3
"""A deterministic, dependency-free Grow When Required mechanism slice.

This lab operationalizes the core update order described by Marsland, Shapiro,
and Nehmzow (2002), but it is not a reproduction of their experiments. Initial
nodes, inputs, thresholds, learning rates, habituation factors, edge age, tie
breaking, and rounding are pinned educational choices.
"""
from __future__ import annotations

import copy
import json
import math
from typing import Any

ROUND_DIGITS = 6


def rounded(value: float) -> float:
    """Apply the trace's explicit numerical policy and avoid negative zero."""
    result = round(float(value), ROUND_DIGITS)
    return 0.0 if result == 0.0 else result


def edge_key(left: int, right: int) -> tuple[int, int]:
    if left == right:
        raise ValueError("self-edges are not part of this GWR slice")
    return (left, right) if left < right else (right, left)


def euclidean(left: list[float], right: list[float]) -> float:
    if len(left) != len(right):
        raise ValueError("input and node weight dimensions must match")
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(left, right)))


def demo_policy() -> dict[str, Any]:
    """Return all source-structure and demo-choice boundaries in one place."""
    return {
        "activity": "exp(-euclidean_distance)",
        "activity_threshold": 0.5,
        "firing_threshold": 0.3,
        "winner_learning_rate": 0.4,
        "neighbor_learning_rate": 0.1,
        "winner_habituation_factor": 0.5,
        "neighbor_habituation_factor": 0.8,
        "habituation_treatment": (
            "pedagogical multiplicative decrease; preserves faster winner than "
            "neighbor habituation but does not claim the paper's experimental constants"
        ),
        "new_node_firing": 1.0,
        "maximum_edge_age": 2,
        "edge_age_order": (
            "create or reset winner-runner edge, take branch, age winner edges, "
            "habituate winner and current neighbors, then delete old edges and isolated nodes"
        ),
        "tie_breaking": "lowest node id wins equal-distance comparisons",
        "round_digits": ROUND_DIGITS,
        "input_order": [[0.0], [0.0], [4.0], [4.0], [4.0], [5.0], [3.0]],
        "initial_nodes": [
            {"id": 0, "weight": [0.0], "firing": 1.0},
            {"id": 1, "weight": [10.0], "firing": 1.0},
        ],
        "parameter_status": "pinned demo choices, not universal GWR defaults",
    }


def initial_demo_state() -> dict[str, Any]:
    return {
        "nodes": {
            0: {"weight": [0.0], "firing": 1.0},
            1: {"weight": [10.0], "firing": 1.0},
        },
        "edges": {},
        "next_node_id": 2,
    }


def connected_neighbors(edges: dict[tuple[int, int], int], node_id: int) -> list[int]:
    neighbors = []
    for left, right in edges:
        if left == node_id:
            neighbors.append(right)
        elif right == node_id:
            neighbors.append(left)
    return sorted(neighbors)


def serialize_state(state: dict[str, Any]) -> dict[str, Any]:
    return {
        "nodes": [
            {
                "id": node_id,
                "weight": node["weight"][:],
                "firing": node["firing"],
            }
            for node_id, node in sorted(state["nodes"].items())
        ],
        "edges": [
            {"nodes": [left, right], "age": age}
            for (left, right), age in sorted(state["edges"].items())
        ],
    }


def step(
    state: dict[str, Any],
    input_vector: list[float],
    policy: dict[str, Any],
    *,
    iteration: int,
) -> dict[str, Any]:
    """Apply one deterministic GWR input step, mutating and tracing ``state``."""
    if len(state["nodes"]) < 2:
        raise ValueError("GWR matching requires at least two nodes")

    state_before = serialize_state(state)
    ranking = sorted(
        (
            (euclidean(input_vector, node["weight"]), node_id)
            for node_id, node in state["nodes"].items()
        ),
        key=lambda item: (item[0], item[1]),
    )
    winner_distance, winner = ranking[0]
    _, runner_up = ranking[1]
    winner_firing_before = state["nodes"][winner]["firing"]

    winner_runner_edge = edge_key(winner, runner_up)
    state["edges"][winner_runner_edge] = 0

    activity = rounded(math.exp(-winner_distance))
    should_insert = (
        activity < policy["activity_threshold"]
        and winner_firing_before < policy["firing_threshold"]
    )
    inserted_node = None
    weight_changes: list[dict[str, Any]] = []

    if should_insert:
        branch = "insert"
        inserted_node = state["next_node_id"]
        state["next_node_id"] += 1
        winner_weight = state["nodes"][winner]["weight"]
        midpoint = [
            rounded((weight + value) / 2.0)
            for weight, value in zip(winner_weight, input_vector)
        ]
        state["nodes"][inserted_node] = {
            "weight": midpoint,
            "firing": policy["new_node_firing"],
        }
        state["edges"][edge_key(winner, inserted_node)] = 0
        state["edges"][edge_key(runner_up, inserted_node)] = 0
        state["edges"].pop(winner_runner_edge, None)
    else:
        branch = "adapt"
        participants = [
            (winner, policy["winner_learning_rate"]),
            *(
                (neighbor, policy["neighbor_learning_rate"])
                for neighbor in connected_neighbors(state["edges"], winner)
            ),
        ]
        for node_id, learning_rate in participants:
            node = state["nodes"][node_id]
            before = node["weight"][:]
            after = [
                rounded(weight + learning_rate * node["firing"] * (value - weight))
                for weight, value in zip(before, input_vector)
            ]
            node["weight"] = after
            weight_changes.append({"node": node_id, "before": before, "after": after})

    for edge in list(state["edges"]):
        if winner in edge:
            state["edges"][edge] += 1

    current_neighbors = connected_neighbors(state["edges"], winner)
    state["nodes"][winner]["firing"] = rounded(
        state["nodes"][winner]["firing"] * policy["winner_habituation_factor"]
    )
    for neighbor in current_neighbors:
        state["nodes"][neighbor]["firing"] = rounded(
            state["nodes"][neighbor]["firing"] * policy["neighbor_habituation_factor"]
        )

    deleted_edges = []
    for edge, age in list(state["edges"].items()):
        if age > policy["maximum_edge_age"]:
            deleted_edges.append([edge[0], edge[1]])
            del state["edges"][edge]

    connected = {node_id for edge in state["edges"] for node_id in edge}
    deleted_nodes = []
    for node_id in sorted(list(state["nodes"])):
        if node_id not in connected:
            deleted_nodes.append(node_id)
            del state["nodes"][node_id]

    return {
        "iteration": iteration,
        "input": input_vector[:],
        "winner": winner,
        "runner_up": runner_up,
        "winner_distance": rounded(winner_distance),
        "activity": activity,
        "winner_firing_before": winner_firing_before,
        "insertion_test": {
            "activity_below_threshold": activity < policy["activity_threshold"],
            "winner_firing_below_threshold": winner_firing_before < policy["firing_threshold"],
        },
        "branch": branch,
        "inserted_node": inserted_node,
        "weight_changes": weight_changes,
        "deleted_edges": deleted_edges,
        "deleted_nodes": deleted_nodes,
        "state_before": state_before,
        "state_after": serialize_state(state),
    }


def run_experiment() -> dict[str, Any]:
    policy = demo_policy()
    state = initial_demo_state()
    initial_state = serialize_state(copy.deepcopy(state))
    trace = [
        step(state, input_vector, policy, iteration=iteration)
        for iteration, input_vector in enumerate(policy["input_order"], start=1)
    ]
    insertion_indices = [index for index, row in enumerate(trace) if row["branch"] == "insert"]
    growth_resumed = any(
        any(row["branch"] == "adapt" for row in trace[left + 1 : right])
        for left, right in zip(insertion_indices, insertion_indices[1:])
    )

    return {
        "algorithm": "grow-when-required",
        "claim_scope": ["toy-mechanism", "not-a-full-paper-reproduction"],
        "explanatory_question": (
            "How do match quality and habituation choose between adaptation and insertion, "
            "and how can growth resume after represented inputs stop triggering it?"
        ),
        "policy": policy,
        "initial_state": initial_state,
        "step_trace": trace,
        "summary": {
            "inputs_seen": len(trace),
            "insertions": sum(row["branch"] == "insert" for row in trace),
            "adaptations": sum(row["branch"] == "adapt" for row in trace),
            "growth_resumed": growth_resumed,
            "final_node_count": len(state["nodes"]),
            "final_edge_count": len(state["edges"]),
        },
        "final_state": serialize_state(state),
    }


if __name__ == "__main__":
    print(json.dumps(run_experiment(), indent=2))
