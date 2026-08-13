# Constructive XOR implementation

The working implementation is [`xor_example.py`](xor_example.py). It is the
single source used by all seven historical example entry points in this
directory. The implementation starts with direct input-to-output connections,
installs hidden units one at a time, and freezes each installed unit's input
weights before adding the next.

Run any entry point, for example:

```bash
python3 cascade_correlation/cascade_correlation.py
```

Every run is deterministic, asserts that the four predictions match XOR's
`0/1/1/0` targets within the printed tolerance, and emits the same bytes as the
committed `xor_trace.txt`.
