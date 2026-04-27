import type { HelpTextsInt } from "./HelpTextsInt";

class HelpTexts implements HelpTextsInt {
  modelEditor(): string {
    return 'The Model Editor allows you to create and edit your models. You can add variables, define their update functions, and set initial conditions. Use the toolbar on the left to access different editing features.';
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
