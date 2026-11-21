---
'@astryxdesign/cli': patch
---

[experimental] `astryx experimental theme editor how`: on a theme with one mode, an undo that names that mode ("reset the dark mode accent" on a dark-only theme) takes back the theme's setting, which has no mode of its own, instead of naming it as a setting saved the same for both modes. A setting kept for the other mode, and a change on a theme that lacks the mode the undo names, are not taken back.

@josephfarina
