import AttractorBifurcationExplorerPageStrings from './AttractorBifurcationExplorerPageStrings/AttractorBifurcationExplorerPageStrings';
import type { AttractorBifurcationExplorerPageStringsInt } from './AttractorBifurcationExplorerPageStrings/AttractorBifurcationExplorerPageStringsInt';
import ControlPerturbationTablePageStrings from './ControlPerturbationTablePageStrings/ControlPerturbationTablePageStrings';
import type { ControlPerturbationTablePageStringsInt } from './ControlPerturbationTablePageStrings/ControlPerturbationTablePageStringsInt';
import ModelEditorPageStrings from './ModelEditorPageStrings/ModelEditorPageStrings';
import type { ModelEditorPageStringsInt } from './ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { StringProviderInt } from './StringProviderInt';
import ToolTips from './ToolTips/ToolTips';
import type { ToolTipsInt } from './ToolTips/ToolTipsInt';

class StringProvider implements StringProviderInt {
  public ModelEditorPage: ModelEditorPageStringsInt;
  public AttractorBifurcationExplorerPage: AttractorBifurcationExplorerPageStringsInt;
  public AttractorVisualizerPage: AttractorBifurcationExplorerPageStringsInt;
  public ControlPerturbationTablePage: ControlPerturbationTablePageStringsInt;
  public ToolTips: ToolTipsInt;

  constructor() {
    this.ModelEditorPage = new ModelEditorPageStrings();
    this.AttractorBifurcationExplorerPage =
      new AttractorBifurcationExplorerPageStrings();
    this.AttractorVisualizerPage =
      new AttractorBifurcationExplorerPageStrings();
    this.ControlPerturbationTablePage =
      new ControlPerturbationTablePageStrings();
    this.ToolTips = new ToolTips();
  }
}

export default StringProvider;
