import type { ModelInfoState } from '../../../../stores/LiveModel/ModelInfoStore/ModelInfoState';
import type { UndoRedoState } from '../../../../stores/UndoRedo/UndoRedoState';
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
  private modelUndoRedoStore: ZustandStore<UndoRedoState>;

  constructor(
    liveModel: LiveModelInt,

    modelInfoStore: ZustandStore<ModelInfoState>,
    modelUndoRedoStore: ZustandStore<UndoRedoState>
  ) {
    this.liveModel = liveModel;

    this.modelInfoStore = modelInfoStore;
    this.modelUndoRedoStore = modelUndoRedoStore;
  }

  // #endregion

  // #region --- Setters ---

  public setModelName(
    name: string,
    addIntoUndoRedo: boolean,
    force: boolean = false
  ): void {
    if (!force && !this.liveModel.modelCanBeModified()) {
      return;
    }

    const modelName = this.modelInfoStore.getState().getModelName();
    if (modelName !== name) {
      this.modelInfoStore.getState().setModelName(name);
      window.document.title = `Biodivine/Aeon - ${name}`;
      this.infoChanged();

      if (addIntoUndoRedo) {
        this.modelUndoRedoStore.getState().addOperation({
          undo: () => this.setModelName(modelName, false, true),
          redo: () => this.setModelName(name, false, true),
        });
      }
    }
  }

  public setModelDescription(
    description: string,
    addIntoUndoRedo: boolean,
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

      if (addIntoUndoRedo) {
        this.modelUndoRedoStore.getState().addOperation({
          undo: () => this.setModelDescription(modelDescription, false, true),
          redo: () => this.setModelDescription(description, false, true),
        });
      }
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
