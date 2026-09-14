import type { AttractorVisualizerPageStringsInt } from './AttractorVisualizerPageStringsInt';

class AttractorVisualizerPageStrings implements AttractorVisualizerPageStringsInt {
  helpText(): string {
    return `
# Attractor Visualizer Help

The **Attractor Visualizer** page enables you to explore the attractors of your Boolean network model. Attractors are visualized as state transition graphs, where nodes represent states and edges represent transitions between states. Below is an overview of the main menus and their functions.

---

## Menus Overview

### State Overview Menu

- View detailed information about the currently selected state.
- Visualize the state of each variable, encoded by color:
  - Green: active
  - Red: inactive
  - Gray: undefined

### Witness Update Functions Menu

- View the update functions for each variable in the model.
- The "witness" represents a specific interpretation of the model for which the attractor is valid; only the update functions for this witness are shown.
- Understand how the state of each variable is determined based on the states of other variables.

---
`.trim();
  }
}

export default AttractorVisualizerPageStrings;
