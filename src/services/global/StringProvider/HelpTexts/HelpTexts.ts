import type { HelpTextsInt } from './HelpTextsInt';

class HelpTexts implements HelpTextsInt {
  modelEditor(): string {
    return `
# Model Editor

The Model Editor page is where you can create and edit your boolean network models.

## Menus

### Start Computation Menu

The Start Computation menu allows you to run various computations on your model, such as computing attractors, and control perturbations.

### Import/Export Menu

The Import/Export menu allows you to import and export your model in various formats, such as .aeon, .bnet, and .sbml. You can also import some predefined models from our model repository.

### Model Editor Menu

The Model Editor menu provides you with basic functionality for creation/editing of your model, such as adding and removing variables, editing update functions...

### Control Editor Menu

The Control Editor menu allows you to create and edit control connected parameters of your model. These parameters consists of phenotype variables and control-enabled variables.

### Visual Options Menu

The Visual Options menu allows you to customize the visualization of your model in the editor. It allows you to change the layout of the graph or to toggle highliting of certain elements.
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
