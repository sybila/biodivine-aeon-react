import type { AttractorBifurcationExplorerPageStringsInt } from './AttractorBifurcationExplorerPageStrings/AttractorBifurcationExplorerPageStringsInt';
import type { AttractorVisualizerPageStringsInt } from './AttractorVisualizerPageStrings/AttractorVisualizerPageStringsInt';
import type { ControlPerturbationTablePageStringsInt } from './ControlPerturbationTablePageStrings/ControlPerturbationTablePageStringsInt';
import type { GlobalStringsInt } from './GlobalStrings/GlobalStringsInt';
import type { ModelEditorPageStringsInt } from './ModelEditorPageStrings/ModelEditorPageStringsInt';

/** Class which provides strings for different parts of application. (ex. tooltips, help text...k) */
export interface StringProviderInt {
  ModelEditorPage: ModelEditorPageStringsInt;
  AttractorBifurcationExplorerPage: AttractorBifurcationExplorerPageStringsInt;
  AttractorVisualizerPage: AttractorVisualizerPageStringsInt;
  ControlPerturbationTablePage: ControlPerturbationTablePageStringsInt;
  Global: GlobalStringsInt;
}
