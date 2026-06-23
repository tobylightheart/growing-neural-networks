#!/usr/bin/env python3
"""Clean XOR training with backpropagation."""

import random
import math

def sigmoid(x):
    if x >= 0:
        return 1 / (1 + math.exp(-x))
    else:
        exp_x = math.exp(x)
        return exp_x / (1 + exp_x)

def train_xor():
    """Train XOR with 2-layer neural network."""
    data = [
        ([0, 0], [0]),
        ([0, 1], [1]),
        ([1, 0], [1]),
        ([1, 1], [0]),
    ]
    
    hidden_size = 4
    input_size = 2
    output_size = 1
    
    random.seed(42)
    
    # Initialize weights with small random values
    w1 = [[random.uniform(-0.5, 0.5) for _ in range(hidden_size)] for _ in range(input_size)]
    w2 = [[random.uniform(-0.5, 0.5) for _ in range(output_size)] for _ in range(hidden_size)]
    b1 = [random.uniform(-0.5, 0.5) for _ in range(hidden_size)]
    b2 = [random.uniform(-0.5, 0.5) for _ in range(output_size)]
    
    lr = 0.5
    
    print("Training...")
    for epoch in range(5000):
        total_error = 0.0
        
        for inputs, targets in data:
            # Forward
            z1 = [b1[j] + sum(w1[i][j] * inputs[i] for i in range(input_size)) 
                  for j in range(hidden_size)]
            h = [sigmoid(z) for z in z1]
            
            z2 = [b2[j] + sum(w2[i][j] * h[i] for i in range(hidden_size)) 
                  for j in range(output_size)]
            o = [sigmoid(z) for z in z2]
            
            # Error
            e = sum((o[j] - targets[j]) ** 2 for j in range(output_size))
            total_error += e
            
            # Backprop - output layer
            delta2 = [(o[j] - targets[j]) * o[j] * (1 - o[j]) for j in range(output_size)]
            
            for j in range(output_size):
                b2[j] += lr * delta2[j]
                for i in range(hidden_size):
                    w2[i][j] += lr * delta2[j] * h[i]
            
            # Backprop - hidden layer
            delta1 = [sum(delta2[k] * w2[i][k] * h[i] * (1 - h[i])) 
                      for i in range(hidden_size) for k in range(output_size)]
            
            for i in range(input_size):
                for j in range(hidden_size):
                    w1[i][j] += lr * delta1[j] * inputs[i]
            
            for j in range(hidden_size):
                b1[j] += lr * delta1[j]
        
        avg_error = total_error / len(data)
        if epoch % 500 == 0:
            print(f"  Epoch {epoch}: error = {avg_error:.4f}")
        
        if avg_error < 0.1:
            print(f"✓ Converged at epoch {epoch}")
            break
    
    # Test
    print("\nPredictions:")
    for inputs, target in data:
        z1 = [b1[j] + sum(w1[i][j] * inputs[i] for i in range(input_size)) 
              for j in range(hidden_size)]
        h = [sigmoid(z) for z in z1]
        
        z2 = [b2[j] + sum(w2[i][j] * h[i] for i in range(hidden_size)) 
              for j in range(output_size)]
        o = [sigmoid(z) for z in z2]
        
        print(f"  {inputs} → {o[0]:.3f} (target: {target[0]})")

if __name__ == '__main__':
    train_xor()
