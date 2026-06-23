#!/usr/bin/env python3
"""Simple test of Cascade-Correlation."""

import random
import math

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

def tanh(x):
    return math.tanh(x)

def forward(inputs, hidden_weights, hidden_bias, output_weights, output_bias, hidden_units):
    """Forward pass."""
    # Hidden activations
    hidden = []
    for j in range(len(hidden_bias)):
        total = hidden_bias[j]
        for i in range(len(inputs)):
            total += hidden_weights[i][j] * inputs[i]
        hidden.append(sigmoid(total))
    
    # Output activations
    outputs = []
    for j in range(len(output_bias)):
        total = output_bias[j]
        for i in range(len(hidden)):
            total += output_weights[i][j] * hidden[i]
        outputs.append(sigmoid(total))
    
    return hidden, outputs

def train_xor():
    """Train a network on XOR problem."""
    # Data
    data = [
        ([0, 0], [0]),
        ([0, 1], [1]),
        ([1, 0], [1]),
        ([1, 1], [0]),
    ]
    
    # Initialize
    hidden_size = 2
    input_size = 2
    output_size = 1
    
    hidden_weights = [[random.uniform(-1, 1) for _ in range(hidden_size)] for _ in range(input_size)]
    hidden_bias = [random.uniform(-1, 1) for _ in range(hidden_size)]
    
    output_weights = [[random.uniform(-1, 1) for _ in range(output_size)] for _ in range(hidden_size)]
    output_bias = [random.uniform(-1, 1) for _ in range(output_size)]
    
    # Training
    for epoch in range(1000):
        total_error = 0.0
        
        for inputs, targets in data:
            hidden, outputs = forward(inputs, hidden_weights, hidden_bias, 
                                      output_weights, output_bias, hidden_size)
            
            # Compute error
            error = sum((outputs[i] - targets[i]) ** 2 for i in range(output_size))
            total_error += error
            
            # Backprop
            for i in range(output_size):
                o = outputs[i]
                t = targets[i]
                error_i = o - t
                grad_o = error_i * o * (1 - o)
                
                # Update output weights
                for j in range(hidden_size):
                    output_weights[j][i] += 0.1 * grad_o * hidden[j]
                    hidden[j] *= (1 - hidden[j]) ** 2  # Approximation
                    
                    # Propagate to hidden
                    for k in range(input_size):
                        hidden_weights[k][j] += 0.1 * grad_o * hidden[j] * inputs[k]
        
        avg_error = total_error / len(data)
        if epoch % 100 == 0:
            print(f"Epoch {epoch}: error = {avg_error:.4f}")
        
        if avg_error < 0.1:
            break
    
    # Test
    print("\nFinal predictions:")
    for inputs, target in data:
        hidden, outputs = forward(inputs, hidden_weights, hidden_bias,
                                  output_weights, output_bias, hidden_size)
        print(f"  {inputs} → {outputs[0]:.3f} (target: {target[0]})")
    
    return hidden_weights, hidden_bias, output_weights, output_bias

if __name__ == '__main__':
    train_xor()
