#!/usr/bin/env python3
"""Simple XOR training."""

import random
import math

def sigmoid(x):
    if x >= 0:
        return 1 / (1 + math.exp(-x))
    else:
        exp_x = math.exp(x)
        return exp_x / (1 + exp_x)

def train():
    data = [([0, 0], [0]), ([0, 1], [1]), ([1, 0], [1]), ([1, 1], [0])]
    
    hidden_size = 4
    random.seed(42)
    
    w1 = [[random.uniform(-0.5, 0.5) for _ in range(hidden_size)] for _ in range(2)]
    w2 = [[random.uniform(-0.5, 0.5) for _ in range(1)] for _ in range(hidden_size)]
    b1 = [random.uniform(-0.5, 0.5) for _ in range(hidden_size)]
    b2 = [random.uniform(-0.5, 0.5) for _ in range(1)]
    
    lr = 0.01
    
    print("Training...")
    for epoch in range(5000):
        total_error = 0.0
        
        for inputs, targets in data:
            # Hidden
            z1 = [b1[j] + sum(w1[i][j] * inputs[i] for i in range(2)) for j in range(hidden_size)]
            h = [sigmoid(z) for z in z1]
            
            # Output
            z2 = [b2[j] + sum(w2[i][j] * h[i] for i in range(hidden_size)) for j in range(1)]
            o = [sigmoid(z) for z in z2]
            
            # Error
            e = (o[0] - targets[0]) ** 2
            total_error += e
            
            # Backprop - output
            o_err = o[0] - targets[0]
            o_delta = o_err * o[0] * (1 - o[0])
            b2[0] += lr * o_delta
            for i in range(hidden_size):
               w2[i][0] += lr * o_delta * h[i]
            
            # Backprop - hidden
            for j in range(hidden_size):
                h_err = o_err * w2[j][0]
                b1[j] += lr * h_err * h[j] * (1 - h[j])
                for i in range(2):
                    w1[i][j] += lr * h_err * inputs[i] * h[j] * (1 - h[j])
        
        avg_error = total_error / len(data)
        if epoch % 500 == 0:
            print(f"  Epoch {epoch}: error = {avg_error:.4f}")
        
        if avg_error < 0.1:
            print(f"✓ Converged at epoch {epoch}")
            break
    
    print("\nPredictions:")
    for inputs, target in data:
        z1 = [b1[j] + sum(w1[i][j] * inputs[i] for i in range(2)) for j in range(hidden_size)]
        h = [sigmoid(z) for z in z1]
        z2 = [b2[j] + sum(w2[i][j] * h[i] for i in range(hidden_size)) for j in range(1)]
        o = [sigmoid(z) for z in z2]
        print(f"  {inputs} → {o[0]:.3f} (target: {target[0]})")

if __name__ == '__main__':
    train()
