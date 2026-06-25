#!/usr/bin/env python3
"""Cron-compatible wrapper for the repository data validator.

Scheduled synthesis jobs historically invoke this path. Keep the wrapper tiny so
there is a single canonical validator in ``scripts/validate_data.py``.
"""

from __future__ import annotations

import runpy
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
VALIDATOR = ROOT / "scripts" / "validate_data.py"

if __name__ == "__main__":
    runpy.run_path(str(VALIDATOR), run_name="__main__")
