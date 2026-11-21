---
'@astryxdesign/cli': patch
---

[experimental] `astryx experimental theme editor how`: on a theme with one mode, an undo that names that mode ("reset the dark mode accent" on a dark-only theme) takes back a setting saved with no mode (one saved before the theme was made one-mode, or one that is the same in every mode), instead of naming it as a setting saved the same for both modes; an undo that names the mode the theme does not show still names it so, as the build writes it for that mode's regions too. A setting kept for the other mode, and a change on a theme that lacks the mode the undo names, are not taken back.

@josephfarina
