#!/usr/bin/env python3
"""Independent exact checks for the deterministic 2-D GNG trace."""
from __future__ import annotations

import sys
from pathlib import Path

LAB = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(LAB))

from gng_topology_growth import initial_state, policy, run_experiment, step  # noqa: E402


def compact(event: dict) -> dict:
    return {
        "nodes": {node["id"]: (node["position"], node["error"]) for node in event["state_after"]["nodes"]},
        "edges": [(edge["nodes"], edge["age"]) for edge in event["state_after"]["edges"]],
    }


def test_exact_trace_checkpoints() -> None:
    result = run_experiment()
    trace = result["step_trace"]
    assert result["summary"] == {
        "inputs_seen": 12,
        "insertions": 3,
        "prototype_moves": 26,
        "edge_age_events": 14,
        "edge_deletions": 0,
        "final_node_count": 5,
        "final_edge_count": 4,
    }
    assert compact(trace[0]) == {
        "nodes": {0: ([0.11, 0.32], 0.32625), 1: ([0.9, 0.2], 0.0)},
        "edges": [([0, 1], 0)],
    }
    assert compact(trace[3]) == {
        "nodes": {
            0: ([0.18972, 0.44144], 0.186814),
            1: ([0.8444, 0.4232], 0.20861),
            2: ([0.51706, 0.43232], 0.20861),
        },
        "edges": [([0, 2], 0), ([1, 2], 0)],
    }
    assert trace[3]["inserted"] == {"node": 2, "between": [1, 0], "position": [0.51706, 0.43232]}
    assert trace[7]["inserted"] == {"node": 3, "between": [2, 1], "position": [0.659976, 0.562439]}
    assert trace[11]["inserted"] == {"node": 4, "between": [0, 2], "position": [0.346102, 0.636399]}
    assert compact(trace[11]) == {
        "nodes": {
            0: ([0.213068, 0.614949], 0.084221),
            1: ([0.823566, 0.57124], 0.11798),
            2: ([0.479136, 0.657849], 0.076927),
            3: ([0.662428, 0.585651], 0.119595),
            4: ([0.346102, 0.636399], 0.084221),
        },
        "edges": [([0, 4], 0), ([1, 3], 0), ([2, 3], 0), ([2, 4], 0)],
    }


def test_edge_age_is_visible_before_winner_runner_reset() -> None:
    state = initial_state()
    cfg = policy()
    first = step(state, [0.15, 0.8], cfg, 1)
    second = step(state, [0.85, 0.8], cfg, 2)
    assert first["aged_edges"] == []
    assert second["aged_edges"] == [{"nodes": [0, 1], "age": 1}]
    assert second["state_after"]["edges"] == [{"nodes": [0, 1], "age": 0}]


def test_run_is_deterministic_and_boundaries_are_explicit() -> None:
    first = run_experiment()
    assert first == run_experiment()
    assert first["claim_scope"] == [
        "toy-mechanism", "paper-grounded-update-order", "not-a-full-paper-reproduction", "not-human-reviewed"
    ]
    assert first["policy"]["parameter_status"] == "pinned demo choices, not Fritzke's experimental defaults"
    assert all(len(sample) == 2 for sample in first["policy"]["input_order"])


if __name__ == "__main__":
    test_exact_trace_checkpoints()
    test_edge_age_is_visible_before_winner_runner_reset()
    test_run_is_deterministic_and_boundaries_are_explicit()
    print("deterministic 2-D GNG tests passed")
