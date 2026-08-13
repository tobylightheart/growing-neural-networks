#!/usr/bin/env python3
"""Deterministic, dependency-free constructive XOR teaching example.

The network begins with direct input-to-output connections. Hidden units are
then installed one at a time. While a candidate is being installed, its input
weights and the output layer are trained by gradient descent; previously
installed hidden units stay frozen, which is the defining architectural idea
illustrated by Cascade-Correlation.
"""

from __future__ import annotations

import math
import random
from dataclasses import dataclass

DATA = (((0.0, 0.0), 0.0), ((0.0, 1.0), 1.0),
        ((1.0, 0.0), 1.0), ((1.0, 1.0), 0.0))
TOLERANCE = 0.1


def sigmoid(value: float) -> float:
    """Numerically stable logistic function."""
    if value >= 0:
        return 1.0 / (1.0 + math.exp(-value))
    exponential = math.exp(value)
    return exponential / (1.0 + exponential)


@dataclass
class HiddenUnit:
    weights: list[float]
    bias: float

    def output(self, inputs: tuple[float, float]) -> float:
        return math.tanh(self.bias + sum(w * x for w, x in zip(self.weights, inputs)))


class ConstructiveXOR:
    """Small constructive network whose installed hidden units are frozen."""

    def __init__(self, seed: int = 42) -> None:
        self.random = random.Random(seed)
        self.hidden: list[HiddenUnit] = []
        self.output_weights = [0.0, 0.0]
        self.hidden_output_weights: list[float] = []
        self.output_bias = 0.0

    def predict(self, inputs: tuple[float, float]) -> float:
        total = self.output_bias
        total += sum(w * x for w, x in zip(self.output_weights, inputs))
        total += sum(w * unit.output(inputs) for w, unit in
                     zip(self.hidden_output_weights, self.hidden))
        return sigmoid(total)

    def _train_output_layer(self, epochs: int, learning_rate: float) -> None:
        for _ in range(epochs):
            for inputs, target in DATA:
                hidden_values = [unit.output(inputs) for unit in self.hidden]
                output = self.predict(inputs)
                delta = (output - target) * output * (1.0 - output)
                self.output_bias -= learning_rate * delta
                for index, value in enumerate(inputs):
                    self.output_weights[index] -= learning_rate * delta * value
                for index, value in enumerate(hidden_values):
                    self.hidden_output_weights[index] -= learning_rate * delta * value

    def add_unit(self, epochs: int = 6000, learning_rate: float = 0.35) -> None:
        """Train one candidate, then freeze its input weights permanently."""
        candidate = HiddenUnit(
            [self.random.uniform(-1.0, 1.0) for _ in range(2)],
            self.random.uniform(-1.0, 1.0),
        )
        self.hidden.append(candidate)
        self.hidden_output_weights.append(self.random.uniform(-1.0, 1.0))

        new_index = len(self.hidden) - 1
        for _ in range(epochs):
            for inputs, target in DATA:
                hidden_values = [unit.output(inputs) for unit in self.hidden]
                output = self.predict(inputs)
                delta = (output - target) * output * (1.0 - output)
                candidate_delta = (
                    delta * self.hidden_output_weights[new_index]
                    * (1.0 - hidden_values[new_index] ** 2)
                )

                self.output_bias -= learning_rate * delta
                for index, value in enumerate(inputs):
                    self.output_weights[index] -= learning_rate * delta * value
                for index, value in enumerate(hidden_values):
                    self.hidden_output_weights[index] -= learning_rate * delta * value
                candidate.bias -= learning_rate * candidate_delta
                for index, value in enumerate(inputs):
                    candidate.weights[index] -= learning_rate * candidate_delta * value

    def train(self) -> list[float]:
        self._train_output_layer(epochs=1000, learning_rate=0.2)
        for _ in range(4):
            self.add_unit()
            predictions = [self.predict(inputs) for inputs, _ in DATA]
            if all(abs(prediction - target) <= TOLERANCE
                   for prediction, (_, target) in zip(predictions, DATA)):
                return predictions
        return [self.predict(inputs) for inputs, _ in DATA]


def run_example() -> None:
    network = ConstructiveXOR()
    predictions = network.train()

    print("Constructive XOR trace")
    print(f"hidden units: {len(network.hidden)}")
    print(f"tolerance: {TOLERANCE:.3f}")
    for (inputs, target), prediction in zip(DATA, predictions):
        print(f"{int(inputs[0])} xor {int(inputs[1])} = {prediction:.6f} (target {int(target)})")

    failures = [
        (inputs, target, prediction)
        for (inputs, target), prediction in zip(DATA, predictions)
        if abs(prediction - target) > TOLERANCE
    ]
    if failures:
        raise AssertionError(f"XOR did not converge within tolerance: {failures}")
    print("PASS: all XOR outputs are within tolerance")


if __name__ == "__main__":
    run_example()
