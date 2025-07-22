import ModelEditor from '../../model-editor/ModelEditor/ModelEditor';
import type { LiveModelClass } from './LiveModel';

/**
 * Class for storing and updating model meta-information such as name and description.
 */
class InfoLM {
  private _liveModel: LiveModelClass;
  private _modelName: string = '';
  private _modelDescription: string = '';

  constructor(liveModel: LiveModelClass) {
    this._liveModel = liveModel;
  }

  /** Get the current model name */
  public getModelName(): string {
    return this._modelName;
  }

  /** Set the model name and trigger UI update */
  public setModelName(name: string): void {
    if (this._modelName !== name) {
      this._modelName = name;
      this._infoChanged();
    }
  }

  /** Get the current model description */
  public getModelDescription(): string {
    return this._modelDescription;
  }

  /** Set the model description and trigger UI update */
  public setModelDescription(description: string): void {
    if (this._modelDescription !== description) {
      this._modelDescription = description;
      this._infoChanged();
    }
  }

  /** Called when info changes to update UI and save model */
  private _infoChanged(): void {
    ModelEditor.reloadModelEditorTab();
    this._liveModel.Export.saveModel();
  }
}

export default InfoLM;
