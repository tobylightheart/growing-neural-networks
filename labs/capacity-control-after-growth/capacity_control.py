#!/usr/bin/env python3
"""Deterministic freeze/fine-tune/prune comparison after capacity insertion.

This dependency-free XOR teaching artifact is not a reproduction of any cited
pruning paper. It has not been human-reviewed. The diagonal curvature proxy is
OBD-inspired; it is deliberately not OBD or OBS.
"""
from __future__ import annotations

import copy
import json
import math
from dataclasses import dataclass, field
from typing import Any

DATASET = [([0.0, 0.0], 0.0), ([0.0, 1.0], 1.0), ([1.0, 0.0], 1.0), ([1.0, 1.0], 0.0)]
ROUND_DIGITS = 12


class Lcg:
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
        network = cls(Lcg(seed))
        for _ in range(width):
            network.add_hidden_node()
        return network

    def add_hidden_node(self) -> dict[str, Any]:
        incoming = [self.rng.uniform(-0.1666, 0.1666) for _ in range(3)]
        outgoing = self.rng.uniform(-0.1666, 0.1666)
        self.hidden_weights.append(incoming)
        self.hidden_velocity.append([0.0, 0.0, 0.0])
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

    def errors(self) -> tuple[float, float, list[float]]:
        outputs = [self.predict(inputs)[1] for inputs, _ in DATASET]
        squared = [(target - output) ** 2 for output, (_, target) in zip(outputs, DATASET)]
        return sum(squared) / len(squared), max(squared), outputs


def parameters(network: Network) -> dict[str, Any]:
    return {
        "hidden": [[rounded(value) for value in row] for row in network.hidden_weights],
        "output": [rounded(value) for value in network.output_weights],
    }


def metrics(network: Network) -> dict[str, Any]:
    average, maximum, outputs = network.errors()
    return {
        "width": len(network.hidden_weights),
        "average_squared_error": rounded(average),
        "maximum_squared_error": rounded(maximum),
        "outputs": [rounded(value) for value in outputs],
    }


def train(network: Network, sweeps: int, policy: str) -> None:
    """Train all output weights; optionally freeze the established feature."""
    if policy not in {"freeze-established", "fine-tune-all"}:
        raise ValueError(f"unknown policy: {policy}")
    learning_rate = 0.5
    momentum = 0.9
    for _ in range(sweeps):
        for inputs, target in DATASET:
            hidden, output = network.predict(inputs)
            output_delta = (target - output) * output * (1.0 - output)
            hidden_deltas = [
                value * (1.0 - value) * weight * output_delta
                for value, weight in zip(hidden, network.output_weights[:-1])
            ]
            for index, value in enumerate([*hidden, 1.0]):
                change = learning_rate * output_delta * value + momentum * network.output_velocity[index]
                network.output_weights[index] += change
                network.output_velocity[index] = change
            for node, delta in enumerate(hidden_deltas):
                if policy == "freeze-established" and node == 0:
                    continue
                for index, value in enumerate([*inputs, 1.0]):
                    change = learning_rate * delta * value + momentum * network.hidden_velocity[node][index]
                    network.hidden_weights[node][index] += change
                    network.hidden_velocity[node][index] = change


def diagonal_group_proxy(network: Network) -> list[float]:
    """Return a simple output-path diagonal-curvature proxy per hidden node.

    OBD motivates curvature-aware deletion, but this deliberately omits the full
    parameter Hessian. OBS specifically warns that a diagonal Hessian can choose
    the wrong deletion. The artifact exposes that limitation instead of hiding it.
    """
    saliencies = []
    for node, weight in enumerate(network.output_weights[:-1]):
        curvature = 0.0
        for inputs, _ in DATASET:
            hidden, output = network.predict(inputs)
            curvature += (output * (1.0 - output) * hidden[node]) ** 2
        saliencies.append(0.5 * weight * weight * curvature / len(DATASET))
    return saliencies


def remove_hidden_node(network: Network, node: int) -> None:
    del network.hidden_weights[node]
    del network.hidden_velocity[node]
    del network.output_weights[node]
    del network.output_velocity[node]


def run_experiment() -> dict[str, Any]:
    checkpoint = Network.with_width(1)
    train(checkpoint, 600, "fine-tune-all")
    before_insertion = metrics(checkpoint)
    established_before = list(checkpoint.hidden_weights[0])
    inserted_parameters = checkpoint.add_hidden_node()
    after_insertion = metrics(checkpoint)

    frozen = copy.deepcopy(checkpoint)
    train(frozen, 400, "freeze-established")

    fine_tuned = copy.deepcopy(checkpoint)
    train(fine_tuned, 400, "fine-tune-all")

    pruned = copy.deepcopy(checkpoint)
    train(pruned, 400, "fine-tune-all")
    proxy = diagonal_group_proxy(pruned)
    removed = min(range(len(proxy)), key=proxy.__getitem__)
    before_pruning = metrics(pruned)
    remove_hidden_node(pruned, removed)
    immediately_after_pruning = metrics(pruned)
    train(pruned, 100, "fine-tune-all")

    return {
        "question": "What does the network retain after one hidden-unit insertion under freeze, fine-tune, and prune policies?",
        "review_status": "automated teaching artifact; not human-reviewed",
        "claim_boundary": "Deterministic XOR comparison, not a reproduction of Reed, OBD, OBS, or GPSNN.",
        "schedule": {
            "seed": 1989,
            "pre_insertion_sweeps": 600,
            "post_insertion_sweeps": 400,
            "post_prune_recovery_sweeps": 100,
            "learning_rate": 0.5,
            "momentum": 0.9,
        },
        "growth_checkpoint": {
            "before_insertion": before_insertion,
            "inserted_parameters": inserted_parameters,
            "immediately_after_insertion": after_insertion,
        },
        "policies": {
            "freeze": {
                "rule": "Keep the established hidden feature's incoming weights fixed; train the new feature and all output weights.",
                "established_feature_changed": [rounded(x) for x in frozen.hidden_weights[0]] != [rounded(x) for x in established_before],
                "result": metrics(frozen),
                "parameters": parameters(frozen),
            },
            "fine_tune": {
                "rule": "Continue ordinary backpropagation through established and inserted features.",
                "established_feature_changed": [rounded(x) for x in fine_tuned.hidden_weights[0]] != [rounded(x) for x in established_before],
                "result": metrics(fine_tuned),
                "parameters": parameters(fine_tuned),
            },
            "prune": {
                "rule": "Fine-tune, remove the hidden node with the smaller OBD-inspired diagonal group proxy, then run 100 recovery sweeps.",
                "proxy_name": "0.5 * output_weight^2 * mean((output_derivative * hidden_activation)^2)",
                "proxy_values": [rounded(value) for value in proxy],
                "removed_node": removed,
                "before_pruning": before_pruning,
                "immediately_after_pruning": immediately_after_pruning,
                "result": metrics(pruned),
                "parameters": parameters(pruned),
            },
        },
        "interpretation": [
            "Fine-tuning reaches the lowest XOR error here, but retains both hidden units.",
            "Freezing the established feature preserves it exactly while the inserted feature and output layer adapt; its error is slightly higher in this run.",
            "The diagonal pruning proxy removes one unit and sharply worsens fit, even after recovery: lower proxy is not proof that deletion is harmless.",
            "Growth creates an option, not an obligation to keep capacity; pruning creates a capacity bound, not a guarantee of equal performance.",
        ],
    }


if __name__ == "__main__":
    print(json.dumps(run_experiment(), indent=2))
