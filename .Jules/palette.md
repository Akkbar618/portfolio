# PALETTE'S JOURNAL - CRITICAL LEARNINGS ONLY
## 2025-02-18 - [Drag vs. Click Interaction]
**Learning:** Custom drag handlers on containers (using `mousedown` + `preventDefault`) block interactive children like links.
**Action:** Always check `e.target.closest('a, button')` in custom drag handlers before calling `preventDefault()`.
