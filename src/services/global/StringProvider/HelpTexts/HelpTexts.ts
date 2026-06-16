import type { HelpTextsInt } from './HelpTextsInt';

class HelpTexts implements HelpTextsInt {

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
    return `
# Control Perturbations Table Help

The **Control Perturbations Table** allows you to explore possible control perturbations for your model.

Control perturbations are modifications to the models state (fixing of variables to specific values) that can influence its behavior and potentially steer it towards desired outcomes.

Below is an overview of the main menus and their functions.

---

## Menus Overview

### Overview Menu

This menu provides a summary of the control perturbations, including:
- The number of perturbations found.
- The number of models interpretaions for which perturbations were found.
- The maximal robustness found among the perturbations. (robustness is measure which indicates for how many model interpretations a perturbation is valid).
- The minimal size found among the perturbations. (size is the number of variables that are perturbed inside one perturbation).
- Set phenotype oscillation, phenotype oscillation means that the phenotype variables are not fixed to specific values, but are allowed to oscillate between active and inactive states. Possible values are:
  - "Allowed": Phenotype variables may oscillate.
  - "Required": Phenotype variables must oscillate.
  - "Forbidden": Phenotype variables may not oscillate.
- The control-enabled variables in the model, these are the variables that are allowed to be perturbed inside control perturbations.
- The phenotype variables in the model, these are the variables that we want to steer towards specific states using control perturbations. States of phenotype variables are by default encoded by color (green: active, red: inactive).

### Filters Menu

This menu allows you to filter the control perturbations based on specific criteria. There different filters include:
- Number Filters - filter perturbations based on numerical criteria such as robustness and size.
- Perturbed Variables Filter - filter perturbations based on which variables are perturbed and to which values.

### Sorting Menu

This menu allows you to sort the control perturbations based on specific criteria.

Sorting uses primary and secondary sorting criteria. The primary sorting criterion is applied first, and the secondary sorting criterion is used to break ties when multiple perturbations have the same value for the primary sorting criterion. 

Available sorting criteria include:

- id
- interpretations: number of model interpretations for which a perturbation is valid. (this sorting is same as robustness sorting, because robustness is measure which indicates for how many model interpretations a perturbation is valid).
- size: number of variables that are perturbed inside one perturbation.

### Pages Menu

This menu allows you to navigate through different pages of control perturbations. Each page displays a limited number of perturbations, and you can use this menu to move to the next or previous page.

---
`.trim();
  }


}

export default HelpTexts;
