#!/usr/bin/env python3
"""Train XOR with neural network using proper backpropagation."""

import random
import math

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

def sigmoid_derivative(s):
    """Derivative of sigmoid given the sigmoid output."""
    return s * (1 - s)

def train_xor():
    """Train a network on XOR problem."""
    # Data
    data = [
        ([0, 0], [0]),
        ([0, 1], [1]),
        ([1, 0], [1]),
        ([1, 1], [0]),
    ]
    
    # Initialize weights with small random values
    hidden_size = 4
    input_size = 2
    output_size = 1
    
    random.seed(42)
    
    # Input to hidden weights
    w1 = [[random.uniform(-1, 1) for _ in range(hidden_size)] for _ in range(input_size)]
    # Hidden to output weights  
    w2 = [[random.uniform(-1, 1) for _ in range(output_size)] for _ in range(hidden_size)]
    # Biases
    b1 = [random.uniform(-1, 1) for _ in range(hidden_size)]
    b2 = [random.uniform(-1, 1) for _ in range(output_size)]
    
    # Training
    learning_rate = 0.3
    epochs = 2000
    
    for epoch in range(epochs):
        total_error = 0.0
        
        for inputs, targets in data:
            # Forward pass
            hidden = []
            for j in range(hidden_size):
                z1 = b1[j]
                for i in range(input_size):
                    z1 += w1[i][j] * inputs[i]
                hidden.append(sigmoid(z1))
            
            output = []
            for j in range(output_size):
                z2 = b2[j]
                for i in range(hidden_size):
                    z2 += w2[i][j] * hidden[i]
                output.append(sigmoid(z2))
            
            # Compute error
            error = sum((output[i] - targets[i]) ** 2 for i in range(output_size))
            total_error += error
            
            # Backpropagation
            # Output layer
            for j in range(output_size):
                output_error = output[j] - targets[j]
                b2[j] += learning_rate * output_error * sigmoid_derivative(output[j])
                
                for i in range(hidden_size):
                    w2[i][j] += learning_rate * output_error * hidden[i] * sigmoid_derivative(output[j])
            
            # Hidden layer
            for j in range(hidden_size):
                hidden_error = 0
                for k in range(output_size):
                    hidden_error += w2[j][k] * (output[k] - targets[k])
                hidden_delta = hidden_error * sigmoid_derivative(hidden[j])
                
                b1[j] += learning_rate * hidden_delta
                for i in range(input_size):
                    w1[i][j] += learning_rate * hidden_delta * inputs[i]
        
        avg_error = total_error / len(data)
        if epoch % 200 == 0:
            print(f"Epoch {epoch}: error = {avg_error:.4f}")
        
        if avg_error < 0.1:
            print(f"✓ Converged at epoch {epoch}")
            break
    
    # Test
    print("\nFinal predictions:")
    for inputs, target in data:
        hidden = []
        for j in range(hidden_size):
            z1 = b1[j]
            for i in range(input_size):
                z1 += w1[i][j] * inputs[i]
            hidden.append(sigmoid(z1))
        
        output = []
        for j in range(output_size):
            z2 = b2[j]
            for i in range(hidden_size):
                z2 += w2[i][j] * hidden[i]
            output.append(sigmoid(z2))
        
        print(f"  {inputs} → {output[0]:.3f} (target: {target[0]})")


if __name__ == '__main__':
    train_xor()
