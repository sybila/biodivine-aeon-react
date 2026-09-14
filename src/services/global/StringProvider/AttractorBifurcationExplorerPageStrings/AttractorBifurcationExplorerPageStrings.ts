import type { AttractorBifurcationExplorerPageStringsInt } from './AttractorBifurcationExplorerPageStringsInt';
import Tooltips from './Tooltips/Tooltips';
import type { TooltipsInt } from './Tooltips/TooltipsInt';

class AttractorBifurcationExplorerPageStrings implements AttractorBifurcationExplorerPageStringsInt {
  Tooltips: TooltipsInt;

  constructor() {
    this.Tooltips = new Tooltips();
  }

  helpText(): string {
    return `
# Attractor Bifurcation Explorer Help

The **Attractor Bifurcation Explorer** allows you to explore attractor classses which are the results of attractor analysis in a bifurcation tree structure.

Attractor classes are groups of attractors that share the same behavior with respect to a specific set of variables. The bifurcation tree organizes these attractor classes based on the decisions that lead to them.

Each decision represents a specific variable present in the attractor. The branches of the tree represent the possible values of these variables (positive/negative), and the leaf nodes represent the attractor classes that are reached by following the decisions along the path from the root to the leaf.

Below is an overview of the main menus and their functions.

---

## Menus Overview

### Overview Menu

This menu provides a summary for selected node in the bifurcation tree. These include for example:
- Node type:
    - mixed - node for which no decision is made
    - decision - node for which a decision is made
    - leaf - node which is leaf in the tree and represents attractor class
- Number of attractor classes that are represented by the node.
- Necessary conditions - the decisions that need to be made to reach the node.
- Number of models interpretations that are represented by the node.
- and more...

### Stability Analysis Menu

This menu allows you to perform stability analysis for selected node in the bifurcation tree.

### Make Decision Menu

This menu allows you to make a decision for a specific variable. This means you can select a variable which is the new decision.
This will split the node into two new nodes, one for positive decision (variable is active) and one for negative decision (variable is inactive).
You can also use auto expand option to automatically make decisions, wich will expand the tree to the given depth.

### Visual Options Menu

This menu allows you to customize the visualization of the bifurcation tree.

You can for example reset layout of the tree or set the precision of the tree.

---
`.trim();
  }
}

export default AttractorBifurcationExplorerPageStrings;
