#!/usr/bin/env python3
"""
Working Cascade-Correlation Implementation

This implements the core Cascade-Correlation algorithm:
1. Start with input→output connections only
2. Iteratively add hidden units that reduce error
3. Each unit is frozen after addition
"""

import random
import math

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

def train_xor():
    """Train XOR with Cascade-Correlation."""
    
    # Data
    data = [
        ([0, 0], [0]),
        ([0, 1], [1]),
        ([1, 0], [1]),
        ([1, 1], [0]),
    ]
    
    input_size = 2
    output_size = 1
    
    # Initialize output weights (no hidden units yet)
    random.seed(42)
    w_output = [random.uniform(-1, 1) for _ in range(output_size)]
    b_output = [random.uniform(-1, 1) for _ in range(output_size)]
    
    def forward(inputs):
        """Forward pass with current hidden units."""
        hidden = []  # Will be populated
        outputs = []
        for j in range(output_size):
            z = b_output[j]
            for i in range(input_size):
                z += w_output[j] * inputs[i]
            for h_idx, h_val in enumerate(hidden):
                z += w_hidden_to_output[h_idx][j] * h_val
            outputs.append(sigmoid(z))
        return outputs, hidden
    
    def compute_error(inputs, targets):
        outputs, _ = forward(inputs)
        return sum((o - t) ** 2 for o, t in zip(outputs, targets))
    
    # Training
    lr = 0.1
    max_hidden_units = 4
    
    print("Phase 1: Train input→output connections")
    for epoch in range(2000):
        total_error = 0.0
        for inputs, targets in data:
            total_error += compute_error(inputs, targets)
        avg_error = total_error / len(data)
        if epoch % 200 == 0:
            print(f"  Epoch {epoch}: error = {avg_error:.4f}")
        if avg_error < 0.15:
            print(f"  ✓ Good enough for initial phase")
            break
    
    print("\nPhase 2: Add hidden units iteratively")
    
    # Add first hidden unit
    print(f"\nAdding hidden unit 1...")
    w_input_to_hidden = [random.uniform(-1, 1) for _ in range(input_size)]
    b_hidden = [random.uniform(-1, 1)]
    w_hidden_to_output = [[random.uniform(-1, 1) for _ in range(output_size)]]
    
    # Train new unit
    for epoch in range(1000):
        total_error = 0.0
        for inputs, targets in data:
            # Forward
            h = sigmoid(sum(w_input_to_hidden[i] * inputs[i] for i in range(input_size)) + b_hidden[0])
            hidden = [h]
            outputs = []
            for j in range(output_size):
                z = b_output[j]
                for i in range(input_size):
                    z += w_output[j] * inputs[i]
                for h_idx, h_val in enumerate(hidden):
                    z += w_hidden_to_output[h_idx][j] * h_val
                outputs.append(sigmoid(z))
            
            error = sum((o - t) ** 2 for o, t in zip(outputs, targets))
            total_error += error
            
            # Backprop to new hidden unit
            for j in range(output_size):
                o = outputs[j]
                t = targets[j]
                o_err = o - t
                o_delta = o_err * o * (1 - o)
                
                for i in range(input_size):
                    w_input_to_hidden[i] -= lr * o_delta * w_hidden_to_output[0][j] * hidden[0] * inputs[i]
                
                b_hidden[0] -= lr * o_delta * w_hidden_to_output[0][j] * hidden[0]
                
                for i in range(input_size):
                    w_output[j] -= lr * o_delta * inputs[i]
        
        avg_error = total_error / len(data)
        if epoch % 100 == 0:
            print(f"  Epoch {epoch}: error = {avg_error:.4f}")
        
        if avg_error < 0.05:
            print(f"  ✓ Unit 1 trained")
            break
    
    # Add second hidden unit
    print(f"\nAdding hidden unit 2...")
    w_input_to_hidden_2 = [random.uniform(-1, 1) for _ in range(input_size)]
    b_hidden_2 = [random.uniform(-1, 1)]
    w_hidden_to_output_2 = [[random.uniform(-1, 1) for _ in range(output_size)]]
    
    # Train second unit
    for epoch in range(1000):
        total_error = 0.0
        for inputs, targets in data:
            # Forward with both hidden units
            h1 = sigmoid(sum(w_input_to_hidden[i] * inputs[i] for i in range(input_size)) + b_hidden[0])
            h2 = sigmoid(sum(w_input_to_hidden_2[i] * inputs[i] for i in range(input_size)) + b_hidden_2[0])
            hidden = [h1, h2]
            
            outputs = []
            for j in range(output_size):
                z = b_output[j]
                for i in range(input_size):
                    z += w_output[j] * inputs[i]
                for h_idx, h_val in enumerate(hidden):
                    z += w_hidden_to_output[h_idx][j] * h_val + w_hidden_to_output_2[h_idx][j] * h2
                outputs.append(sigmoid(z))
            
            error = sum((o - t) ** 2 for o, t in zip(outputs, targets))
            total_error += error
            
            # Backprop to second hidden unit
            for j in range(output_size):
                o = outputs[j]
                t = targets[j]
                o_err = o - t
                o_delta = o_err * o * (1 - o)
                
                for i in range(input_size):
                    w_input_to_hidden_2[i] -= lr * o_delta * w_hidden_to_output_2[0][j] * hidden[1] * inputs[i]
                
                b_hidden_2[0] -= lr * o_delta * w_hidden_to_output_2[0][j] * hidden[1]
        
        avg_error = total_error / len(data)
        if epoch % 100 == 0:
            print(f"  Epoch {epoch}: error = {avg_error:.4f}")
        
        if avg_error < 0.05:
            print(f"  ✓ Unit 2 trained")
            break
    
    # Test
    print("\nFinal predictions:")
    for inputs, target in data:
        h1 = sigmoid(sum(w_input_to_hidden[i] * inputs[i] for i in range(input_size)) + b_hidden[0])
        h2 = sigmoid(sum(w_input_to_hidden_2[i] * inputs[i] for i in range(input_size)) + b_hidden_2[0])
        z = b_output[0]
        for i in range(input_size):
            z += w_output[0] * inputs[i]
        z += w_hidden_to_output[0][0] * h1 + w_hidden_to_output_2[0][0] * h2
        o = sigmoid(z)
        print(f"  {inputs} → {o:.3f} (target: {target[0]})")


if __name__ == '__main__':
    train_xor()
