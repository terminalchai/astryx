---
"@astryxdesign/cli": patch
---

[experimental] The theme editor has two feel dials. `press` takes darker, lighter, stronger, or a percent from 1% to 60%; `hover` takes the same or none. Each sets the shared wash that the parts painting it (buttons, segmented items, tabs, list and tree rows, calendar days, cards you click) draw over their own fill while pressed or hovered; a menu row's hover is its focus, which follows the dial too, so the look follows each part's colors in every variant and mode. The looks Core paints with the same wash at rest keep the theme's wash (an exact one it saves included): a highlighted option, an open menu's trigger, a toggle that is on. So does a part whose pressed or hover background the theme sets, in the mode it is set for, and a part that saves the wash itself. Parts that tint their own hover (a switch, a checkbox, a radio, a slider, a link) keep that tint. `how` reads "darker on press", "darker on click" and "8% tint on hover" as the dial; a border, text or shadow said with its moment stays that look's.

@josephfarina
