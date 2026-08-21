#!/usr/bin/env python3
"""Exact assertions for the automated DNC vertical slice."""
from __future__ import annotations

import sys
from pathlib import Path

LAB_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(LAB_DIR))

from dnc import run_experiment  # noqa: E402


def test_exact_default_trace() -> None:
    result = run_experiment()
    dnc = result["dnc"]
    insertion = dnc["insertion"]

    assert dnc["initial_parameters"] == {
        "hidden": [[-0.164297671166, 0.06276015861, 0.068068576266]],
        "output": [-0.068832891606, 0.161756628432],
    }
    assert insertion is not None
    assert insertion["trial"] == 686
    assert insertion["normalized_drop"] == 0.001998044348
    assert insertion["window"] == 250
    assert insertion["threshold"] == 0.002
    assert insertion["initialized_weights"] == {
        "incoming": [0.106198211089, 0.058770859466, 0.122709762819],
        "outgoing": -0.052586135196,
    }
    assert insertion["immediately_after"]["average_squared_error"] < insertion["before"]["average_squared_error"]
    assert dnc["summary"] == {
        "trials": 912,
        "insertions": 1,
        "final_width": 2,
        "average_squared_error": 0.001999959852,
        "maximum_squared_error": 0.003337231044,
        "outputs": [0.033720967672, 0.958029912093, 0.957999804458, 0.057768772224],
        "learned": True,
    }


def test_insertion_is_followed_by_ordinary_backpropagation() -> None:
    dnc = run_experiment()["dnc"]
    inserted = dnc["insertion"]["initialized_weights"]
    final = dnc["final_parameters"]

    assert dnc["summary"]["trials"] > dnc["insertion"]["trial"]
    assert final["hidden"][1] != inserted["incoming"]
    assert final["output"][1] != inserted["outgoing"]
    assert final["hidden"][0] != dnc["initial_parameters"]["hidden"][0]


def test_fixed_width_baseline_is_exact_and_equivalent_in_scope() -> None:
    result = run_experiment()
    dnc = result["dnc"]
    baseline = result["fixed_width_baseline"]

    assert baseline["policy"] == {
        "width": 2,
        "trials": 912,
        "seed": 1989,
        "learning_rate": 0.5,
        "momentum": 0.9,
    }
    assert baseline["summary"] == {
        "trials": 912,
        "final_width": 2,
        "average_squared_error": 0.000388284988,
        "maximum_squared_error": 0.000541120274,
        "outputs": [0.017615896125, 0.981272025819, 0.981265997141, 0.023261992053],
    }
    assert baseline["summary"]["trials"] == dnc["summary"]["trials"]
    assert baseline["summary"]["final_width"] == dnc["summary"]["final_width"]


def test_parameter_controls_move_or_bound_the_trigger() -> None:
    early = run_experiment(window=100, trigger_threshold=0.01)["dnc"]
    conservative = run_experiment(window=1000, trigger_threshold=0.0)["dnc"]

    assert early["insertion"]["trial"] < 686
    assert early["summary"]["insertions"] == 1
    assert conservative["summary"]["insertions"] in (0, 1)
    if conservative["insertion"] is not None:
        assert conservative["insertion"]["normalized_drop"] < 0.0


if __name__ == "__main__":
    test_exact_default_trace()
    test_insertion_is_followed_by_ordinary_backpropagation()
    test_fixed_width_baseline_is_exact_and_equivalent_in_scope()
    test_parameter_controls_move_or_bound_the_trigger()
    print("DNC exact trace tests passed")
