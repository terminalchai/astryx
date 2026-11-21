---
'@astryxdesign/cli': patch
---

[experimental] `astryx experimental theme editor`: the corners dial at a size (`set <theme> corners 8px`, or "8px corners" asked of `how`) sets the containers (cards, banners, dialogs, popovers, sheets) to that size too, up to their radius at pill, instead of a step rounder at the base theme's proportions; chat corners follow the containers as before, and a rung (`round`, `more`) keeps the base's proportions. `how` reads a role or a part said before a corner size as its subject ("controls with 12px corners", "give overlays 12px corners"), and names a subject no part has ("FAB 16px corners") instead of writing the whole theme's corners.

@josephfarina
