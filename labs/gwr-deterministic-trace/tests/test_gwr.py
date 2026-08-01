#!/usr/bin/env python3
"""Independent checks for the deterministic GWR mechanism slice.

The checkpoint values below were calculated separately from the implementation.
They intentionally do not call its distance, adaptation, habituation, midpoint,
or serialization helpers when constructing expected results.
"""
from __future__ import annotations

import math
import sys
from pathlib import Path

LAB_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(LAB_DIR))

from gwr_deterministic_trace import demo_policy, initial_demo_state, run_experiment, step  # noqa: E402


def compact_state(event: dict) -> dict:
    state = event["state_after"]
    return {
        "iteration": event["iteration"],
        "branch": event["branch"],
        "activity": event["activity"],
        "nodes": {
            node["id"]: (node["weight"], node["firing"])
            for node in state["nodes"]
        },
        "edges": [(edge["nodes"], edge["age"]) for edge in state["edges"]],
        "deleted_nodes": event["deleted_nodes"],
    }


def test_demo_trace_matches_independent_oracle() -> None:
    result = run_experiment()
    trace = result["step_trace"]

    assert [row["branch"] for row in trace] == [
        "adapt", "adapt", "insert", "adapt", "adapt", "insert", "adapt"
    ]
    assert [row["activity"] for row in trace] == [
        1.0, 1.0, 0.018316, 0.135335, 0.256661, 0.117373, 0.867274
    ]

    expected = {
        1: {
            "nodes": {0: ([0.0], 0.5), 1: ([9.0], 0.8)},
            "edges": [([0, 1], 1)],
        },
        3: {
            "nodes": {0: ([0.0], 0.125), 1: ([8.28], 0.64), 2: ([2.0], 0.8)},
            "edges": [([0, 2], 1), ([1, 2], 0)],
        },
        5: {
            "nodes": {
                0: ([0.0895], 0.08),
                1: ([7.800969], 0.4096),
                2: ([2.8576], 0.2),
            },
            "edges": [([0, 2], 1), ([1, 2], 2)],
        },
        6: {
            "nodes": {
                0: ([0.0895], 0.064),
                1: ([7.800969], 0.4096),
                2: ([2.8576], 0.1),
                3: ([3.9288], 0.8),
            },
            "edges": [([0, 2], 2), ([1, 3], 0), ([2, 3], 1)],
        },
        7: {
            "nodes": {
                1: ([7.800969], 0.4096),
                2: ([2.863296], 0.05),
                3: ([3.854496], 0.64),
            },
            "edges": [([1, 3], 0), ([2, 3], 1)],
        },
    }

    for iteration, oracle in expected.items():
        observed = compact_state(trace[iteration - 1])
        assert observed["nodes"] == oracle["nodes"]
        assert observed["edges"] == oracle["edges"]

    assert trace[5]["inserted_node"] == 3
    assert trace[6]["deleted_nodes"] == [0]
    assert result["summary"] == {
        "inputs_seen": 7,
        "insertions": 2,
        "adaptations": 5,
        "growth_resumed": True,
        "final_node_count": 3,
        "final_edge_count": 2,
    }


def test_insertion_uses_midpoint_without_adapting_existing_weights() -> None:
    policy = demo_policy()
    state = {
        "nodes": {
            0: {"weight": [0.0], "firing": 0.25},
            1: {"weight": [2.0], "firing": 0.25},
        },
        "edges": {},
        "next_node_id": 2,
    }

    event = step(state, [1.0], policy, iteration=1)

    assert event["branch"] == "insert"
    assert event["activity"] == round(math.exp(-1.0), 6)
    assert event["winner"] == 0  # deterministic lowest-id tie break
    assert event["inserted_node"] == 2
    assert state["nodes"][0]["weight"] == [0.0]
    assert state["nodes"][1]["weight"] == [2.0]
    assert state["nodes"][2]["weight"] == [0.5]
    assert state["edges"] == {(0, 2): 1, (1, 2): 0}


def test_adaptation_scales_winner_and_neighbor_by_their_own_firing() -> None:
    policy = demo_policy()
    state = {
        "nodes": {
            0: {"weight": [0.0], "firing": 0.5},
            1: {"weight": [2.0], "firing": 0.25},
        },
        "edges": {},
        "next_node_id": 2,
    }

    event = step(state, [0.2], policy, iteration=1)

    assert event["branch"] == "adapt"
    assert state["nodes"][0] == {"weight": [0.04], "firing": 0.25}
    assert state["nodes"][1] == {"weight": [1.955], "firing": 0.2}
    assert state["edges"] == {(0, 1): 1}


def test_branch_uses_unrounded_activity_at_the_threshold_boundary() -> None:
    policy = demo_policy()
    distance = -math.log(0.4999996)
    state = {
        "nodes": {
            0: {"weight": [0.0], "firing": 0.25},
            1: {"weight": [10.0], "firing": 0.25},
        },
        "edges": {},
        "next_node_id": 2,
    }

    event = step(state, [distance], policy, iteration=1)

    assert event["activity"] == 0.5
    assert event["insertion_test"]["activity_below_threshold"] is True
    assert event["branch"] == "insert"


def test_demo_is_repeatable_and_reports_policy_boundaries() -> None:
    first = run_experiment()
    second = run_experiment()

    assert first == second
    assert first["claim_scope"] == ["toy-mechanism", "not-a-full-paper-reproduction"]
    assert first["policy"]["parameter_status"] == "pinned demo choices, not universal GWR defaults"
    assert first["policy"]["input_order"] == [[0.0], [0.0], [4.0], [4.0], [4.0], [5.0], [3.0]]
    assert initial_demo_state() == {
        "nodes": {
            0: {"weight": [0.0], "firing": 1.0},
            1: {"weight": [10.0], "firing": 1.0},
        },
        "edges": {},
        "next_node_id": 2,
    }


if __name__ == "__main__":
    test_demo_trace_matches_independent_oracle()
    test_insertion_uses_midpoint_without_adapting_existing_weights()
    test_adaptation_scales_winner_and_neighbor_by_their_own_firing()
    test_branch_uses_unrounded_activity_at_the_threshold_boundary()
    test_demo_is_repeatable_and_reports_policy_boundaries()
    print("deterministic GWR trace tests passed")
