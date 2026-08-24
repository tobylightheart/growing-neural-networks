#!/usr/bin/env python3
"""Behaviour and exact-value checks for capacity control after growth."""
from __future__ import annotations

import sys
from pathlib import Path

LAB_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(LAB_DIR))

from capacity_control import run_experiment  # noqa: E402


def test_three_policies_share_one_growth_checkpoint() -> None:
    result = run_experiment()
    checkpoint = result["growth_checkpoint"]
    assert checkpoint["before_insertion"]["width"] == 1
    assert checkpoint["immediately_after_insertion"]["width"] == 2
    assert checkpoint["inserted_parameters"] == {
        "incoming": [0.106198211089, 0.058770859466, 0.122709762819],
        "outgoing": -0.052586135196,
    }


def test_freeze_and_fine_tune_are_behaviourally_distinct() -> None:
    policies = run_experiment()["policies"]
    assert policies["freeze"]["established_feature_changed"] is False
    assert policies["fine_tune"]["established_feature_changed"] is True
    assert policies["freeze"]["result"] == {
        "width": 2,
        "average_squared_error": 0.00131608319,
        "maximum_squared_error": 0.001443773611,
        "outputs": [0.037997021083, 0.965015237089, 0.96500856691, 0.037043557117],
    }
    assert policies["fine_tune"]["result"] == {
        "width": 2,
        "average_squared_error": 0.000851859382,
        "maximum_squared_error": 0.001328274399,
        "outputs": [0.023730982637, 0.97247438893, 0.97246194763, 0.036445499023],
    }


def test_pruning_reduces_capacity_without_promising_equal_fit() -> None:
    prune = run_experiment()["policies"]["prune"]
    assert prune["proxy_values"] == [0.004724603832, 0.015940280579]
    assert prune["removed_node"] == 0
    assert prune["before_pruning"]["width"] == 2
    assert prune["result"] == {
        "width": 1,
        "average_squared_error": 0.173113670964,
        "maximum_squared_error": 0.491143097436,
        "outputs": [0.700816022531, 0.686248843769, 0.686418346035, 0.067367237449],
    }
    assert prune["result"]["average_squared_error"] > prune["before_pruning"]["average_squared_error"]


def test_trace_is_deterministic() -> None:
    assert run_experiment() == run_experiment()


if __name__ == "__main__":
    test_three_policies_share_one_growth_checkpoint()
    test_freeze_and_fine_tune_are_behaviourally_distinct()
    test_pruning_reduces_capacity_without_promising_equal_fit()
    test_trace_is_deterministic()
    print("capacity-control exact checks passed")
