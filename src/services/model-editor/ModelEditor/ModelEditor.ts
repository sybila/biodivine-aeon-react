import type { ModelStats, Variable } from '../../../types';
import { LiveModel } from '../../global/LiveModel/LiveModel';

/**
	Responsible for managing the UI of the model editor, i.e. adding/removing variables and regulations, focusing
	right elements when needed, etc.
*/
class ModelEditorClass {
  //Function for reloading the ModelEditorTabContent.tsx component
  private reloadEditorTab: (() => void) | null = null;

  //Sets reload function for the ModelEditorTabContent.tsx (needs to be called before reloadModelEditorTab function)
  public setReloadFunction(reloadFunction: () => void) {
    this.reloadEditorTab = reloadFunction;
  }

  //Function which enforces reload of the ModelEditorTabContent.tsx component (you must first set reloadEditorTab with setReloadFunction)
  public reloadModelEditorTab() {
    if (this.reloadEditorTab) {
      this.reloadEditorTab();
    }
  }

  public getModelStats(): ModelStats {
    return LiveModel.Export.stats();
  }

  public getAllVariables(): Variable[] {
    return LiveModel.Variables.getAllVariables();
  }
}

const ModelEditor: ModelEditorClass = new ModelEditorClass();

export default ModelEditor;
