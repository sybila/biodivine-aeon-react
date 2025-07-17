import type { ModelStats, Variable } from "../../../types";
import { LiveModel } from "../../global/LiveModel/LiveModel";

/**
	Responsible for managing the UI of the model editor, i.e. adding/removing variables and regulations, focusing
	right elements when needed, etc.
*/
class ModelEditorClass {

	public getModelStats(): ModelStats {
		return LiveModel.Export.stats();
	}

	public getAllVariables(): Variable[] {
		return LiveModel.Variables.getAllVariables();
	}


    
}

const ModelEditor: ModelEditorClass = new ModelEditorClass();

export default ModelEditor;
