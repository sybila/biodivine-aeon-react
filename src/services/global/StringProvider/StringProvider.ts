import AttractorBifurcationExplorerPageStrings from './AttractorBifurcationExplorerPageStrings/AttractorBifurcationExplorerPageStrings';
import type { AttractorBifurcationExplorerPageStringsInt } from './AttractorBifurcationExplorerPageStrings/AttractorBifurcationExplorerPageStringsInt';
import AttractorVisualizerPageStrings from './AttractorVisualizerPageStrings/AttractorVisualizerPageStrings';
import type { AttractorVisualizerPageStringsInt } from './AttractorVisualizerPageStrings/AttractorVisualizerPageStringsInt';
import ControlPerturbationTablePageStrings from './ControlPerturbationTablePageStrings/ControlPerturbationTablePageStrings';
import type { ControlPerturbationTablePageStringsInt } from './ControlPerturbationTablePageStrings/ControlPerturbationTablePageStringsInt';
import GlobalStrings from './GlobalStrings/GlobalStrings';
import type { GlobalStringsInt } from './GlobalStrings/GlobalStringsInt';
import ModelEditorPageStrings from './ModelEditorPageStrings/ModelEditorPageStrings';
import type { ModelEditorPageStringsInt } from './ModelEditorPageStrings/ModelEditorPageStringsInt';
import type { StringProviderInt } from './StringProviderInt';
import TrapSpaceSDPageStrings from './TrapSpaceSDPageStrings/TrapSpaceSDPageStrings';
import type { TrapSpaceSDPageStringsInt } from './TrapSpaceSDPageStrings/TrapSpaceSDPageStringsInt';

class StringProvider implements StringProviderInt {
  public ModelEditorPage: ModelEditorPageStringsInt =
    new ModelEditorPageStrings();
  public AttractorBifurcationExplorerPage: AttractorBifurcationExplorerPageStringsInt =
    new AttractorBifurcationExplorerPageStrings();
  public AttractorVisualizerPage: AttractorVisualizerPageStringsInt =
    new AttractorVisualizerPageStrings();
  public ControlPerturbationTablePage: ControlPerturbationTablePageStringsInt =
    new ControlPerturbationTablePageStrings();
  public TrapSpaceSDPage: TrapSpaceSDPageStringsInt =
    new TrapSpaceSDPageStrings();
  public Global: GlobalStringsInt = new GlobalStrings();
}

export default StringProvider;
