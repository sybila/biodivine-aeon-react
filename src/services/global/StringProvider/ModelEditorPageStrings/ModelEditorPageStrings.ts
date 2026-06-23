import type { ModelEditorPageStringsInt } from './ModelEditorPageStringsInt';
import OtherStrings from './OtherStrings/OtherStrings';
import type { OtherStringsInt } from './OtherStrings/OtherStringsInt';
import Tooltips from './Tooltips/Tooltips';
import type { TooltipsInt } from './Tooltips/TooltipsInt';

class ModelEditorPageStrings implements ModelEditorPageStringsInt {
  Tooltips: TooltipsInt;
  OtherStrings: OtherStringsInt;

  constructor() {
    this.Tooltips = new Tooltips();
    this.OtherStrings = new OtherStrings();
  }

  helpTextModelEditor(): string {
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

## Keyboard Shortcuts

The Model Editor supports keyboard shortcuts to quickly access menus and perform common editing actions.

### Menu Navigation

- Ctrl + Shift + S → Open Start Computation menu  
- Ctrl + Shift + E → Open Import/Export menu  
- Ctrl + Shift + M → Open Model Editor menu  
- Ctrl + Shift + C → Open Control Editor menu  
- Ctrl + Shift + V → Open Visual Options menu  
- Ctrl + Shift + U → Open Utilities menu

### Navigation & Search

- Ctrl + F → Focus global search input  

### Variable Actions

- Ctrl + E → Edit update function of selected variable  
- Ctrl + R → Rename selected variable  
- Ctrl + S → Scroll selected variable into view  
- Ctrl + F → Focus global search input  

### Regulation Actions

- Ctrl + M → Toggle monotonicity of selected regulation  
- Ctrl + O → Toggle observability of selected regulation  

### Editing Actions

- Ctrl + D → Remove all selected elements  
- Ctrl + Z → Undo last action  
- Ctrl + Y → Redo last undone action  

`.trim();
  }

  helpTextWitness(): string {
    return `
# Witness Help

The **Witness** page allows you to explore the witness of your Boolean network model.

The witness represents a specific interpretation of the model (fully specified boolean network). It allows similar interactions as the model editor, however witness page does not allow changes to the model and running computations.
`.trim();
  }
}

export default ModelEditorPageStrings;
