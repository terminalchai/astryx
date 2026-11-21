---
'@astryxdesign/cli': patch
---

[experimental] `astryx experimental theme editor how`: on a theme with one mode, an undo that names a mode ("reset the dark mode accent" on a dark-only theme) takes nothing back and says it is not read on such a theme yet, with the undo that names no mode to use instead. It no longer answers that a setting is saved the same for both modes when the theme shows only one, and a change said earlier in the same ask stays written.

@josephfarina
