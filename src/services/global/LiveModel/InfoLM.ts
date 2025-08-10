import useModelInfoStore from '../../../stores/LiveModel/useModelInfoStore';
import type { LiveModelClass } from './LiveModel';

/**
 * Class for storing and updating model meta-information such as name and description.
 */
class InfoLM {
  private _liveModel: LiveModelClass;

  constructor(liveModel: LiveModelClass) {
    this._liveModel = liveModel;
  }

  /** Set the model name and trigger UI update */
  public setModelName(name: string): void {
    const modelName = useModelInfoStore.getState().getModelName();
    if (modelName !== name) {
      useModelInfoStore.getState().setModelName(name);
      this._infoChanged();
    }
  }

  /** Set the model description and trigger UI update */
  public setModelDescription(description: string): void {
    const modelDescription = useModelInfoStore.getState().getModelDescription();
    if (modelDescription !== description) {
      useModelInfoStore.getState().setModelDescription(description);
      this._infoChanged();
    }
  }

  /** Called when info changes to update UI and save model */
  private _infoChanged(): void {
    this._liveModel.Export.saveModel();
  }
}

export default InfoLM;
