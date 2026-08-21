#!/usr/bin/env python3
"""Deterministic Dynamic Node Construction reproduction on XOR.

This dependency-free vertical slice follows Ash (1989)'s one-hidden-layer model,
plateau trigger, small random initialization, and ordinary backpropagation after
insertion. It is an automated reproduction and has not been human-reviewed.
"""
from __future__ import annotations

import json
import math
from dataclasses import dataclass, field
from typing import Any

DATASET = [([0.0, 0.0], 0.0), ([0.0, 1.0], 1.0), ([1.0, 0.0], 1.0), ([1.0, 1.0], 0.0)]
ROUND_DIGITS = 12


class Lcg:
    """Small cross-language deterministic generator; not a paper requirement."""

    def __init__(self, seed: int = 1989) -> None:
        self.state = seed & 0xFFFFFFFF

    def uniform(self, low: float, high: float) -> float:
        self.state = (1664525 * self.state + 1013904223) & 0xFFFFFFFF
        return low + (high - low) * (self.state / 2**32)


def sigmoid(value: float) -> float:
    if value >= 0:
        z = math.exp(-value)
        return 1.0 / (1.0 + z)
    z = math.exp(value)
    return z / (1.0 + z)


def rounded(value: float) -> float:
    result = round(float(value), ROUND_DIGITS)
    return 0.0 if result == 0.0 else result


@dataclass
class Network:
    rng: Lcg
    hidden_weights: list[list[float]] = field(default_factory=list)
    output_weights: list[float] = field(default_factory=list)
    hidden_velocity: list[list[float]] = field(default_factory=list)
    output_velocity: list[float] = field(default_factory=list)

    @classmethod
    def with_width(cls, width: int, seed: int = 1989) -> "Network":
        rng = Lcg(seed)
        network = cls(rng)
        for _ in range(width):
            network.add_hidden_node()
        return network

    def add_hidden_node(self) -> dict[str, Any]:
        incoming = [self.rng.uniform(-0.1666, 0.1666) for _ in range(3)]
        outgoing = self.rng.uniform(-0.1666, 0.1666)
        self.hidden_weights.append(incoming)
        self.hidden_velocity.append([0.0, 0.0, 0.0])
        # Keep the output bias last so adding a node does not disturb it.
        if not self.output_weights:
            self.output_weights = [outgoing, self.rng.uniform(-0.1666, 0.1666)]
            self.output_velocity = [0.0, 0.0]
        else:
            self.output_weights.insert(-1, outgoing)
            self.output_velocity.insert(-1, 0.0)
        return {"incoming": [rounded(x) for x in incoming], "outgoing": rounded(outgoing)}

    def predict(self, inputs: list[float]) -> tuple[list[float], float]:
        augmented = [*inputs, 1.0]
        hidden = [sigmoid(sum(w * x for w, x in zip(weights, augmented))) for weights in self.hidden_weights]
        output = sigmoid(sum(w * h for w, h in zip(self.output_weights[:-1], hidden)) + self.output_weights[-1])
        return hidden, output

    def train_sweep(self, learning_rate: float, momentum: float) -> None:
        for inputs, target in DATASET:
            hidden, output = self.predict(inputs)
            output_delta = (target - output) * output * (1.0 - output)
            hidden_deltas = [
                value * (1.0 - value) * weight * output_delta
                for value, weight in zip(hidden, self.output_weights[:-1])
            ]
            output_inputs = [*hidden, 1.0]
            for index, value in enumerate(output_inputs):
                change = learning_rate * output_delta * value + momentum * self.output_velocity[index]
                self.output_weights[index] += change
                self.output_velocity[index] = change
            augmented = [*inputs, 1.0]
            for node, delta in enumerate(hidden_deltas):
                for index, value in enumerate(augmented):
                    change = learning_rate * delta * value + momentum * self.hidden_velocity[node][index]
                    self.hidden_weights[node][index] += change
                    self.hidden_velocity[node][index] = change

    def errors(self) -> tuple[float, float, list[float]]:
        outputs = [self.predict(inputs)[1] for inputs, _ in DATASET]
        squared = [(target - output) ** 2 for output, (_, target) in zip(outputs, DATASET)]
        return sum(squared) / len(squared), max(squared), outputs


def run_dnc(
    *,
    window: int = 250,
    trigger_threshold: float = 0.002,
    max_trials: int = 12000,
    learning_rate: float = 0.5,
    momentum: float = 0.9,
    average_cutoff: float = 0.002,
    maximum_cutoff: float = 0.01,
    max_insertions: int = 1,
    seed: int = 1989,
) -> dict[str, Any]:
    """Train from one node and apply Ash's normalized plateau trigger."""
    if window < 1 or trigger_threshold < 0:
        raise ValueError("window must be positive and trigger threshold non-negative")
    network = Network.with_width(1, seed)
    initial_parameters = serialize_parameters(network)
    average, maximum, _ = network.errors()
    errors = [average]
    topology_start_trial = 0
    topology_start_error = average
    insertion: dict[str, Any] | None = None
    curve = [{"trial": 0, "average_squared_error": rounded(average), "width": 1}]

    for trial in range(1, max_trials + 1):
        network.train_sweep(learning_rate, momentum)
        average, maximum, outputs = network.errors()
        errors.append(average)
        if trial % 25 == 0:
            curve.append({"trial": trial, "average_squared_error": rounded(average), "width": len(network.hidden_weights)})

        learned = average <= average_cutoff and maximum <= maximum_cutoff
        eligible = trial - window >= topology_start_trial
        slope = None
        if eligible:
            slope = (errors[trial - window] - average) / topology_start_error
        if (
            not learned
            and insertion is None
            and max_insertions > 0
            and eligible
            and slope is not None
            and slope < trigger_threshold
        ):
            before = {"average_squared_error": rounded(average), "outputs": [rounded(x) for x in outputs]}
            initialized = network.add_hidden_node()
            after_average, _, after_outputs = network.errors()
            insertion = {
                "trial": trial,
                "normalized_drop": rounded(slope),
                "threshold": trigger_threshold,
                "window": window,
                "initialized_weights": initialized,
                "before": before,
                "immediately_after": {
                    "average_squared_error": rounded(after_average),
                    "outputs": [rounded(x) for x in after_outputs],
                },
            }
            topology_start_trial = trial
            topology_start_error = after_average
            if curve[-1]["trial"] != trial:
                curve.append({"trial": trial, "average_squared_error": rounded(after_average), "width": 2})
            else:
                curve[-1]["width"] = 2

        if learned and insertion is not None:
            break
    else:
        trial = max_trials

    average, maximum, outputs = network.errors()
    if curve[-1]["trial"] != trial:
        curve.append({"trial": trial, "average_squared_error": rounded(average), "width": len(network.hidden_weights)})
    return {
        "algorithm": "dynamic-node-construction",
        "review_status": "automated reproduction; not human-reviewed",
        "source_formula": "(a[t-window] - a[t]) / a[topology_start] < trigger_threshold, with t-window >= topology_start",
        "policy": {
            "dataset_order": [inputs for inputs, _ in DATASET],
            "seed": seed,
            "learning_rate": learning_rate,
            "momentum": momentum,
            "initial_weight_range": [-0.1666, 0.1666],
            "window": window,
            "trigger_threshold": trigger_threshold,
            "average_cutoff": average_cutoff,
            "maximum_cutoff": maximum_cutoff,
            "max_insertions": max_insertions,
        },
        "initial_parameters": initial_parameters,
        "insertion": insertion,
        "summary": {
            "trials": trial,
            "insertions": int(insertion is not None),
            "final_width": len(network.hidden_weights),
            "average_squared_error": rounded(average),
            "maximum_squared_error": rounded(maximum),
            "outputs": [rounded(x) for x in outputs],
            "learned": average <= average_cutoff and maximum <= maximum_cutoff,
        },
        "curve": curve,
        "final_parameters": serialize_parameters(network),
    }


def run_fixed_width(*, width: int = 2, trials: int, seed: int = 1989, learning_rate: float = 0.5, momentum: float = 0.9) -> dict[str, Any]:
    """Ash-style normal-BP comparator with the same final hidden width."""
    if width < 1 or trials < 0:
        raise ValueError("width must be positive and trials non-negative")
    network = Network.with_width(width, seed)
    curve = []
    average, maximum, outputs = network.errors()
    for trial in range(trials + 1):
        if trial:
            network.train_sweep(learning_rate, momentum)
        average, maximum, outputs = network.errors()
        if trial % 25 == 0 or trial == trials:
            curve.append({"trial": trial, "average_squared_error": rounded(average), "width": width})
    return {
        "algorithm": "fixed-width-backpropagation",
        "review_status": "automated comparison; not human-reviewed",
        "policy": {"width": width, "trials": trials, "seed": seed, "learning_rate": learning_rate, "momentum": momentum},
        "summary": {
            "trials": trials,
            "final_width": width,
            "average_squared_error": rounded(average),
            "maximum_squared_error": rounded(maximum),
            "outputs": [rounded(x) for x in outputs],
        },
        "curve": curve,
        "final_parameters": serialize_parameters(network),
    }


def serialize_parameters(network: Network) -> dict[str, Any]:
    return {
        "hidden": [[rounded(value) for value in row] for row in network.hidden_weights],
        "output": [rounded(value) for value in network.output_weights],
    }


def run_experiment(window: int = 250, trigger_threshold: float = 0.002) -> dict[str, Any]:
    dnc = run_dnc(window=window, trigger_threshold=trigger_threshold)
    baseline = run_fixed_width(width=2, trials=dnc["summary"]["trials"])
    return {
        "question": "What changes when Ash's error-curve plateau trigger adds one hidden node?",
        "review_status": "not human-reviewed",
        "dnc": dnc,
        "fixed_width_baseline": baseline,
    }


if __name__ == "__main__":
    print(json.dumps(run_experiment(), indent=2))
