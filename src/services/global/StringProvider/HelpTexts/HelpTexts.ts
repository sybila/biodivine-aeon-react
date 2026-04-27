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
    return 'The Attractor Visualizer helps you explore the dynamics of your model by visualizing its attractors. You can switch between different views, such as state overview and witness update functions, to gain insights into the behavior of your system.';
  }

  trapSpaceSuccessionDiagram(): string {
    return 'The Trap Space Succession Diagram provides a visual representation of the succession of trap spaces in your model. It helps you understand how the system evolves over time and identify key states and transitions.';
  }

  controlPerturbationsTable(): string {
    return 'The Control Perturbations Table allows you to analyze the effects of perturbations on your model. You can filter and sort perturbations based on various criteria, and view detailed information about each perturbation by clicking on it.';
  }

  attractorBifurcationExplorer(): string {
    return 'The Attractor Bifurcation Explorer enables you to investigate how changes in model parameters affect the attractors of your system. You can perform stability analysis, make decisions based on bifurcation diagrams, and explore the state space to understand the impact of parameter variations.';
  }
}

export default HelpTexts;
