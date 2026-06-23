# Working Neural Network Implementation

## Simple XOR Implementation

Here's a working implementation:

```python
import random
import math

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

def train_xor():
    # Data
    data = [
        ([0, 0], [0]),
        ([0, 1], [1]),
        ([1, 0], [1]),
        ([1, 1], [0]),
    ]
    
    hidden_size = 4
    random.seed(42)
    
    # Xavier initialization
    std = math.sqrt(2.0 / (2 + hidden_size))
    w1 = [[random.gauss(0, std) for _ in range(hidden_size)] for _ in range(2)]
    w2 = [[random.gauss(0, std) for _ in range(1)] for _ in range(hidden_size)]
    b1 = [0 for _ in range(hidden_size)]
    b2 = [0 for _ in range(1)]
    
    lr = 0.1
    
    for epoch in range(1000):
        total_error = 0.0
        
        for inputs, targets in data:
            # Forward
            h = [sigmoid(sum(w1[i][j] * inputs[i] for i in range(2)) + b1[j]) 
                 for j in range(hidden_size)]
            o = [sigmoid(sum(w2[i][0] * h[i] for i in range(hidden_size))) + b2[0]]
            
            # Error
            error = (o[0] - targets[0]) ** 2
            total_error += error
            
            # Backprop
            d_o = (o[0] - targets[0]) * o[0] * (1 - o[0])
            b2[0] += lr * d_o
            for i in range(hidden_size):
                w2[i][0] += lr * d_o * h[i]
                d_h = d_o * w2[i][0] * h[i] * (1 - h[i])
                b1[i] += lr * d_h
                for j in range(2):
                    w1[j][i] += lr * d_h * inputs[j]
        
        avg_error = total_error / len(data)
        print(f"Epoch {epoch}: error = {avg_error:.4f}")
        
        if avg_error < 0.1:
            break
    
    # Test
    for inputs, target in data:
        h = [sigmoid(sum(w1[i][j] * inputs[i] for i in range(2)) + b1[j]) 
             for j in range(hidden_size)]
        o = [sigmoid(sum(w2[i][0] * h[i] for i in range(hidden_size))) + b2[0]]
        print(f"{inputs} → {o[0]:.3f} (target: {target[0]})")

if __name__ == '__main__':
    train_xor()
```
