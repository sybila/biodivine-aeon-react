import AttractorBifurcationExplorerPageStrings from './AttractorBifurcationExplorerPageStrings/AttractorBifurcationExplorerPageStrings';
import type { AttractorBifurcationExplorerPageStringsInt } from './AttractorBifurcationExplorerPageStrings/AttractorBifurcationExplorerPageStringsInt';
import ControlPerturbationTablePageStrings from './ControlPerturbationTablePageStrings/ControlPerturbationTablePageStrings';
import type { ControlPerturbationTablePageStringsInt } from './ControlPerturbationTablePageStrings/ControlPerturbationTablePageStringsInt';
import GlobalStrings from './GlobalStrings/GlobalStrings';
import type { GlobalStringsInt } from './GlobalStrings/GlobalStringsInt';
import ModelEditorPageStrings from './ModelEditorPageStrings/ModelEditorPageStrings';
import type { ModelEditorPageStringsInt } from './ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { StringProviderInt } from './StringProviderInt';

class StringProvider implements StringProviderInt {
  public ModelEditorPage: ModelEditorPageStringsInt;
  public AttractorBifurcationExplorerPage: AttractorBifurcationExplorerPageStringsInt;
  public AttractorVisualizerPage: AttractorBifurcationExplorerPageStringsInt;
  public ControlPerturbationTablePage: ControlPerturbationTablePageStringsInt;
  public Global: GlobalStringsInt;

  constructor() {
    this.ModelEditorPage = new ModelEditorPageStrings();
    this.AttractorBifurcationExplorerPage =
      new AttractorBifurcationExplorerPageStrings();
    this.AttractorVisualizerPage =
      new AttractorBifurcationExplorerPageStrings();
    this.ControlPerturbationTablePage =
      new ControlPerturbationTablePageStrings();
    this.Global = new GlobalStrings();
  }
}

export default StringProvider;
