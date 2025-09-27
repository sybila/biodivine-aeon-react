import useModelInfoStore from '../../../stores/LiveModel/useModelInfoStore';
import type { LiveModelClass } from './LiveModel';

/**
 * Class for storing and updating model meta-information such as name and description.
 */
class InfoLM {
  // #region --- Properties + Constructor ---

  private liveModel: LiveModelClass;

  constructor(liveModel: LiveModelClass) {
    this.liveModel = liveModel;
  }

  // #endregion

  /** Set the model name and trigger UI update */
  public setModelName(name: string): void {
    const modelName = useModelInfoStore.getState().getModelName();
    if (modelName !== name) {
      useModelInfoStore.getState().setModelName(name);
      this.infoChanged();
    }
  }

  /** Set the model description and trigger UI update */
  public setModelDescription(description: string): void {
    const modelDescription = useModelInfoStore.getState().getModelDescription();
    if (modelDescription !== description) {
      useModelInfoStore.getState().setModelDescription(description);
      this.infoChanged();
    }
  }

  /** Called when info changes to save model */
  private infoChanged(): void {
    this.liveModel.Export.saveModel();
  }
}

export default InfoLM;
