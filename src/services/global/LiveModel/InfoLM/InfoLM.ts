import type { ModelInfoState } from '../../../../stores/LiveModel/ModelInfoStore/ModelInfoState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import type { LiveModelInt } from '../LiveModelInt';
import type { InfoLMInt } from './InfoLMInt';

/**
 * Class for storing and updating model meta-information such as name and description.
 */
class InfoLM implements InfoLMInt {
  // #region --- Properties + Constructor ---

  private liveModel: LiveModelInt;

  private modelInfoStore: ZustandStore<ModelInfoState>;

  constructor(
    liveModel: LiveModelInt,
    modelInfoStore: ZustandStore<ModelInfoState>
  ) {
    this.liveModel = liveModel;
    this.modelInfoStore = modelInfoStore;
  }

  // #endregion

  // #region --- Setters ---

  /** Set the model name and trigger UI update */
  public setModelName(name: string, force: boolean = false): void {
    if (!force && !this.liveModel.modelCanBeModified()) {
      return;
    }

    const modelName = this.modelInfoStore.getState().getModelName();
    if (modelName !== name) {
      this.modelInfoStore.getState().setModelName(name);
      window.document.title = `Biodivine/Aeon - ${name}`;
      this.infoChanged();
    }
  }

  /** Set the model description and trigger UI update */
  public setModelDescription(
    description: string,
    force: boolean = false
  ): void {
    if (!force && !this.liveModel.modelCanBeModified()) {
      return;
    }

    const modelDescription = this.modelInfoStore
      .getState()
      .getModelDescription();
    if (modelDescription !== description) {
      this.modelInfoStore.getState().setModelDescription(description);
      this.infoChanged();
    }
  }

  // #endregion

  // #region --- Setter helpers ---

  /** Called when info changes to save model */
  private infoChanged(): void {
    this.liveModel.Export.saveModel();
  }

  // #endregion
}

export default InfoLM;
