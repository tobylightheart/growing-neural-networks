#!/usr/bin/env python3
"""Simple Cascade-Correlation for XOR."""

import random
import math

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

def train():
    """Train XOR with Cascade-Correlation."""
    
    data = [
        ([0, 0], [0]),
        ([0, 1], [1]),
        ([1, 0], [1]),
        ([1, 1], [0]),
    ]
    
    input_size = 2
    output_size = 1
    
    random.seed(42)
    
    # Phase 1: Input to output only
    print("Phase 1: Train input→output (no hidden units)")
    w_output = [random.uniform(-1, 1) for _ in range(output_size)]
    b_output = [random.uniform(-1, 1) for _ in range(output_size)]
    
    def forward_simple(inputs):
        outputs = []
        for j in range(output_size):
            z = b_output[j]
            for i in range(input_size):
                z += w_output[j] * inputs[i]
            outputs.append(sigmoid(z))
        return outputs
    
    for epoch in range(5000):
        total_error = 0.0
        for inputs, targets in data:
            outputs = forward_simple(inputs)
            error = sum((o - t) ** 2 for o, t in zip(outputs, targets))
            total_error += error
            
            # Backprop
            for j in range(output_size):
                o = outputs[j]
                t = targets[j]
                o_delta = (o - t) * o * (1 - o)
                b_output[j] += 0.01 * o_delta
                for i in range(input_size):
                    w_output[j] += 0.01 * o_delta * inputs[i]
        
        avg_error = total_error / len(data)
        if epoch % 500 == 0:
            print(f"  Epoch {epoch}: error = {avg_error:.4f}")
        if avg_error < 0.1:
            print(f"  ✓ Converged")
            break
    
    # Phase 2: Add first hidden unit
    print("\nPhase 2: Add hidden unit 1")
    
    w_input_hidden1 = [random.uniform(-1, 1) for _ in range(input_size)]
    b_hidden1 = random.uniform(-1, 1)
    w_hidden1_output = [random.uniform(-1, 1) for _ in range(output_size)]
    
    for epoch in range(5000):
        total_error = 0.0
        for inputs, targets in data:
            h1 = sigmoid(sum(w_input_hidden1[i] * inputs[i] for i in range(input_size)) + b_hidden1)
            
            outputs = []
            for j in range(output_size):
                z = b_output[j]
                for i in range(input_size):
                    z += w_output[j] * inputs[i]
                z += w_hidden1_output[j] * h1
                outputs.append(sigmoid(z))
            
            error = sum((o - t) ** 2 for o, t in zip(outputs, targets))
            total_error += error
            
            # Backprop to hidden unit
            for j in range(output_size):
                o = outputs[j]
                t = targets[j]
                o_delta = (o - t) * o * (1 - o)
                
                b_hidden1 += 0.01 * o_delta * w_hidden1_output[j] * h1
                for i in range(input_size):
                    w_input_hidden1[i] += 0.01 * o_delta * w_hidden1_output[j] * h1 * inputs[i]
                
                # Update output weights
                for i in range(input_size):
                    w_output[j] += 0.01 * o_delta * inputs[i]
        
        avg_error = total_error / len(data)
        if epoch % 500 == 0:
            print(f"  Epoch {epoch}: error = {avg_error:.4f}")
        if avg_error < 0.1:
            print(f"  ✓ Unit 1 trained")
            break
    
    # Phase 3: Add second hidden unit
    print("\nPhase 3: Add hidden unit 2")
    
    w_input_hidden2 = [random.uniform(-1, 1) for _ in range(input_size)]
    b_hidden2 = random.uniform(-1, 1)
    w_hidden2_output = [random.uniform(-1, 1) for _ in range(output_size)]
    
    for epoch in range(5000):
        total_error = 0.0
        for inputs, targets in data:
            h1 = sigmoid(sum(w_input_hidden1[i] * inputs[i] for i in range(input_size)) + b_hidden1)
            h2 = sigmoid(sum(w_input_hidden2[i] * inputs[i] for i in range(input_size)) + b_hidden2)
            
            outputs = []
            for j in range(output_size):
                z = b_output[j]
                for i in range(input_size):
                    z += w_output[j] * inputs[i]
                z += w_hidden1_output[j] * h1 + w_hidden2_output[j] * h2
                outputs.append(sigmoid(z))
            
            error = sum((o - t) ** 2 for o, t in zip(outputs, targets))
            total_error += error
            
            # Backprop to hidden unit 2
            for j in range(output_size):
                o = outputs[j]
                t = targets[j]
                o_delta = (o - t) * o * (1 - o)
                
                b_hidden2 += 0.01 * o_delta * w_hidden2_output[j] * h2
                for i in range(input_size):
                    w_input_hidden2[i] += 0.01 * o_delta * w_hidden2_output[j] * h2 * inputs[i]
        
        avg_error = total_error / len(data)
        if epoch % 500 == 0:
            print(f"  Epoch {epoch}: error = {avg_error:.4f}")
        if avg_error < 0.1:
            print(f"  ✓ Unit 2 trained")
            break
    
    # Test
    print("\nFinal predictions:")
    for inputs, target in data:
        h1 = sigmoid(sum(w_input_hidden1[i] * inputs[i] for i in range(input_size)) + b_hidden1)
        h2 = sigmoid(sum(w_input_hidden2[i] * inputs[i] for i in range(input_size)) + b_hidden2)
        
        z = b_output[0]
        z += w_output[0] * inputs[0] + w_output[0] * inputs[1]
        z += w_hidden1_output[0] * h1 + w_hidden2_output[0] * h2
        o = sigmoid(z)
        
        print(f"  {inputs} → {o:.3f} (target: {target[0]})")


if __name__ == '__main__':
    train()
