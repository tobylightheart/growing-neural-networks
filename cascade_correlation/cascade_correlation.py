"""
Cascade-Correlation Neural Network Implementation

Based on:
- Fahlman, S. E., & Lebiere, C. (1990). The cascade-correlation architecture.

Key concepts:
1. Start with a minimal network (input → output only)
2. Iteratively add hidden units that best reduce training error
3. Each added unit is "frozen" (weights fixed, no longer modified)
4. New units are trained only on remaining error
5. Process stops when: error acceptable, no units left, or max iterations
"""

import random
import math
from typing import List, Tuple, Dict, Any
from dataclasses import dataclass


@dataclass
class Unit:
    """Represents a neural network unit (neuron)."""
    id: int
    type: str
    bias: float
    weights: Dict[int, float]
    activation: str = 'sigmoid'
    
    def activate(self, input_values: List[float]) -> float:
        total = self.bias
        for other_id, weight in self.weights.items():
            total += weight * input_values[other_id]
        
        if self.activation == 'sigmoid':
            return 1 / (1 + math.exp(-total))
        elif self.activation == 'tanh':
            return math.tanh(total)
        else:
            return total


class CascadeCorrelation:
    """Cascade-Correlation Neural Network."""
    
    def __init__(self, input_size: int, output_size: int, 
                 learning_rate: float = 0.1, max_units: int = 20,
                 max_iterations: int = 50, error_threshold: float = 0.01):
        self.input_size = input_size
        self.output_size = output_size
        self.learning_rate = learning_rate
        self.max_units = max_units
        self.max_iterations = max_iterations
        self.error_threshold = error_threshold
        
        # Initialize input units (pass-through)
        self.input_units = [Unit(id=i, type='input', bias=0.0, weights={}) 
                           for i in range(input_size)]
        
        # Initialize output units with random weights
        self.output_units = [Unit(id=input_size + i, type='output', 
                                  bias=random.uniform(-0.5, 0.5), 
                                  weights={j: random.uniform(-0.5, 0.5) 
                                           for j in range(input_size)}) 
                            for i in range(output_size)]
        
        # No hidden units initially
        self.hidden_units = []
    
    def forward(self, inputs: List[float]) -> List[float]:
        """Forward propagation."""
        input_activations = list(inputs)
        hidden_activations = [unit.activate(input_activations) 
                             for unit in self.hidden_units]
        
        outputs = []
        for output_unit in self.output_units:
            output_activations = input_activations + hidden_activations
            outputs.append(output_unit.activate(output_activations))
        
        return outputs
    
    def compute_error(self, inputs: List[float], targets: List[float]) -> float:
        """Compute MSE error."""
        outputs = self.forward(inputs)
        return sum((o - t) ** 2 for o, t in zip(outputs, targets)) / len(targets)
    
    def train_epoch(self, data: List[Tuple[List[float], List[float]]]) -> float:
        """Train one epoch, return average error."""
        total_error = 0.0
        for inputs, targets in data:
            total_error += self.compute_error(inputs, targets)
        return total_error / len(data)
    
    def train(self, data: List[Tuple[List[float], List[float]]], 
              epochs: int = 100, verbose: bool = True) -> Dict[str, Any]:
        """Full training loop."""
        history = {'errors': [], 'num_units': [0]}
        
        for epoch in range(epochs):
            epoch_error = self.train_epoch(data)
            history['errors'].append(epoch_error)
            history['num_units'].append(len(self.hidden_units))
            
            if verbose:
                print(f"Epoch {epoch}: error={epoch_error:.4f}, units={len(self.hidden_units)}")
            
            if epoch_error < self.error_threshold:
                if verbose:
                    print(f"✓ Converged! Error: {epoch_error:.4f}")
                break
            
            # Try to find a hidden unit that reduces error
            best_unit = None
            best_error = float('inf')
            
            # Try 10 random initializations
            for attempt in range(10):
                # Create candidate hidden unit
                new_unit = Unit(
                    id=self.input_size + len(self.hidden_units),
                    type='hidden',
                    bias=random.uniform(-1, 1),
                    weights={i: random.uniform(-1, 1) for i in range(self.input_size)}
                )
                
                # Temporarily add to network
                old_hidden = self.hidden_units.copy()
                self.hidden_units.append(new_unit)
                
                # Train briefly
                for _ in range(100):
                    for inputs, targets in data:
                        input_act = list(inputs)
                        hidden_act = [u.activate(input_act) for u in self.hidden_units]
                        
                        # Forward
                        outputs = []
                        for out_unit in self.output_units:
                            out_act = input_act + hidden_act
                            outputs.append(out_unit.activate(out_act))
                        
                        # Backprop to new unit
                        for i in range(len(outputs)):
                            o = outputs[i]
                            t = targets[i]
                            error = o - t
                            grad = self.output_units[i].derivative(o) if hasattr(self.output_units[i], 'derivative') else error
                            
                            # Update new unit weights
                            for j in range(len(input_act)):
                                new_unit.weights[j] -= self.learning_rate * grad * input_act[j]
                        
                        # Update old hidden units
                        for k, old_unit in enumerate(old_hidden):
                            for j in range(len(input_act)):
                                old_unit.weights[j] -= self.learning_rate * grad * input_act[j]
                
                # Check error
                error = self.train_epoch(data)
                
                # Remove unit
                self.hidden_units = old_hidden
                
                if error < best_error:
                    best_error = error
                    best_unit = new_unit
            
            # Add best unit if it helps
            if best_unit is not None and len(self.hidden_units) < self.max_units:
                self.hidden_units.append(best_unit)
                if verbose:
                    print(f"✓ Added hidden unit {len(self.hidden_units)}")
            else:
                if verbose:
                    print(f"✗ No improvement, stopping growth")
        
        return history
    
    def predict(self, inputs: List[float]) -> List[float]:
        return self.forward(inputs)
    
    def get_weights(self) -> Dict[str, Any]:
        """Get network weights for inspection."""
        weights = {}
        for unit in self.hidden_units:
            weights[f'hidden_{unit.id}'] = {
                'bias': unit.bias,
                'weights': unit.weights
            }
        for unit in self.output_units:
            weights[f'output_{unit.id}'] = {
                'bias': unit.bias,
                'weights': unit.weights
            }
        return weights


def sigmoid(x):
    return 1 / (1 + math.exp(-x))


class NeuralNetwork:
    """Simple neural network for comparison."""
    
    def __init__(self, input_size: int, hidden_size: int, output_size: int,
                 learning_rate: float = 0.1):
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.output_size = output_size
        self.learning_rate = learning_rate
        
        # Initialize weights
        self.input_to_hidden = [[random.uniform(-1, 1) for _ in range(hidden_size)] 
                                for _ in range(input_size)]
        self.hidden_bias = [random.uniform(-1, 1) for _ in range(hidden_size)]
        
        self.hidden_to_output = [[random.uniform(-1, 1) for _ in range(output_size)] 
                                  for _ in range(hidden_size)]
        self.output_bias = [random.uniform(-1, 1) for _ in range(output_size)]
    
    def forward(self, inputs: List[float]) -> List[float]:
        # Hidden layer
        hidden = []
        for j in range(self.hidden_size):
            total = self.hidden_bias[j]
            for i in range(self.input_size):
                total += self.input_to_hidden[i][j] * inputs[i]
            hidden.append(sigmoid(total))
        
        # Output layer
        outputs = []
        for j in range(self.output_size):
            total = self.output_bias[j]
            for i in range(self.hidden_size):
                total += self.hidden_to_output[i][j] * hidden[i]
            outputs.append(sigmoid(total))
        
        return outputs
    
    def train(self, data: List[Tuple[List[float], List[float]]], 
              epochs: int = 1000, verbose: bool = False) -> float:
        for epoch in range(epochs):
            total_error = 0.0
            
            for inputs, targets in data:
                # Forward
                hidden = []
                for j in range(self.hidden_size):
                    total = self.hidden_bias[j]
                    for i in range(self.input_size):
                        total += self.input_to_hidden[i][j] * inputs[i]
                    hidden.append(sigmoid(total))
                
                outputs = []
                for j in range(self.output_size):
                    total = self.output_bias[j]
                    for i in range(self.hidden_size):
                        total += self.hidden_to_output[i][j] * hidden[i]
                    outputs.append(sigmoid(total))
                
                # Backprop
                for i, (o, t) in enumerate(zip(outputs, targets)):
                    error = o - t
                    self.output_bias[i] += self.learning_rate * error
                    
                    for j in range(self.hidden_size):
                        self.hidden_to_output[j][i] += self.learning_rate * error * hidden[j]
                        hidden[j] *= (1 - hidden[j])
                        for k in range(self.input_size):
                            self.input_to_hidden[k][j] += self.learning_rate * error * hidden[j] * inputs[k]
                
                total_error += sum((o - t) ** 2 for o, t in zip(outputs, targets))
            
            avg_error = total_error / len(data)
            if verbose and epoch % 100 == 0:
                print(f"Epoch {epoch}: error={avg_error:.4f}")
            
            if avg_error < 0.01:
                if verbose:
                    print(f"✓ Converged at epoch {epoch}")
                return avg_error
        
        return avg_error


def main():
    # XOR problem
    data = [
        ([0, 0], [0]),
        ([0, 1], [1]),
        ([1, 0], [1]),
        ([1, 1], [0]),
    ]
    
    print("=" * 60)
    print("Testing Cascade-Correlation Network")
    print("=" * 60)
    
    # Test 1: Simple XOR with Cascade-Correlation
    cc_network = CascadeCorrelation(input_size=2, output_size=1, 
                                     learning_rate=0.5, max_iterations=30)
    
    print("\n1. Cascade-Correlation (3 hidden units max):")
    history = cc_network.train(data, epochs=100)
    
    print("\nPredictions:")
    for inputs, target in data:
        pred = cc_network.predict(inputs)
        print(f"  {inputs} → {pred[0]:.3f} (target: {target[0]})")
    
    print("\n" + "=" * 60)
    print("Testing Standard Neural Network")
    print("=" * 60)
    
    # Test 2: Standard network with fixed architecture
    nn = NeuralNetwork(input_size=2, hidden_size=4, output_size=1, 
                       learning_rate=0.5)
    
    print("\n2. Standard Neural Network (4 hidden units):")
    final_error = nn.train(data, epochs=1000)
    
    print("\nPredictions:")
    for inputs, target in data:
        pred = nn.forward(inputs)
        print(f"  {inputs} → {pred[0]:.3f} (target: {target[0]})")


if __name__ == '__main__':
    main()
