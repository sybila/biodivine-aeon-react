import type { HelpTextsInt } from './HelpTextsInt';

class HelpTexts implements HelpTextsInt {
  modelEditor(): string {
    return `
# Model Editor Help

The **Model Editor** page allows you to create, edit, and manage Boolean network models. Below is an overview of the main menus and their functions.

---

## Menus Overview

### Start Computation Menu

Use this menu to run computations on your model, including:
- Attractor analysis
- Control perturbation exploration

### Import/Export Menu

- Import models from supported formats such as '.aeon', '.bnet', and '.sbml', or from the model repository.
- Export your current model in various formats for sharing or backup.

### Model Editor Menu

- Add or remove variables.
- Edit update functions for each variable.
- Modify the structure of your model as needed.

### Control Editor Menu

- Define and edit control parameters.
- Manage phenotype variables and control-enabled variables.

### Visual Options Menu

- Customize the graph layout.
- Highlight or focus on specific elements to enhance visualization.

---

`.trim();
  }

  attractorVisualizer(): string {
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

  controlPerturbationsTable(): string {
    return 'The Control Perturbations Table allows you to analyze the effects of perturbations on your model. You can filter and sort perturbations based on various criteria, and view detailed information about each perturbation by clicking on it.';
  }

  attractorBifurcationExplorer(): string {
    return 'The Attractor Bifurcation Explorer enables you to investigate how changes in model parameters affect the attractors of your system. You can perform stability analysis, make decisions based on bifurcation diagrams, and explore the state space to understand the impact of parameter variations.';
  }
}

export default HelpTexts;
