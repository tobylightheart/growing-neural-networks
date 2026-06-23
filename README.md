# Growing Neural Networks Implementation

## Project Overview

Historical neural network implementations using pure Python (no external dependencies):

1. **Cascade-Correlation** (Fahlman & Lebiere, 1990) - Dynamic node creation
2. **Dynamic Node Creation** (Ash, 1989) - Incremental learning

## References

### Cascade-Correlation (CasCor)
- Fahlman, S. E., & Lebiere, C. (1990). *The cascade-correlation architecture*. In Proceedings of the Second International Conference on Neural Information Processing Systems.
- Fahlman, S. E. (1988). *Chaining together simple modules to create complex functions*. Carnegie Mellon University.

### Dynamic Node Creation
- Ash, A. (1989). *Dynamic node construction for the backpropagation algorithm*.

## Why Pure Python?

These classic algorithms were originally implemented in C/Fortran. Implementing them in pure Python:
- Makes the code accessible and educational
- Demonstrates the core ideas without library overhead
- Serves as a clean reference implementation
- Easy to extend with features like visualization

## Getting Started

```bash
cd /workspace/growing-neural-networks
pip install numpy  # Optional, for faster numerical operations
python cascade_correlation.py
```

## Architecture

See individual module documentation:
- `cascade_correlation/` - Cascade-Correlation implementation
- `dynamic_node_creation/` - Dynamic Node Creation implementation
- `models/` - Abstract model interfaces
- `datasets/` - Test datasets
- `visualization/` - Plotting utilities

## Roadmap

- [ ] Implement Cascade-Correlation from scratch
- [ ] Implement Dynamic Node Creation
- [ ] Add more test datasets
- [ ] Create visualizations
- [ ] Benchmark against modern deep learning approaches
- [ ] Add pruning mechanisms
- [ ] Support for multi-layer growth
