import type { ModelEditorStatus } from '../../../../stores/ModelEditor/ModelEditorStatus';
import type { UndoRedoState } from '../../../../stores/UndoRedo/UndoRedoState';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import type { ModelEditorInt } from '../../../model-editor/ModelEditor/ModelEditorInt';
import type { LiveModelInt } from '../../LiveModel/LiveModelInt';
import type { PageShortcutsInt } from './PageShortcutsInt';

/** Implementation of keyboard shortcuts for the Model Editor page. */
class ModelEditorShortcuts implements PageShortcutsInt {
  private modelEditorServ: ModelEditorInt;
  private liveModelServ: LiveModelInt;

  private modelEditorStatusStore: ZustandStore<ModelEditorStatus>;
  private modelUndoRedoStore: ZustandStore<UndoRedoState>;

  constructor(
    liveModelServ: LiveModelInt,
    modelEditorServ: ModelEditorInt,

    modelEditorStatusStore: ZustandStore<ModelEditorStatus>,
    modelUndoRedoStore: ZustandStore<UndoRedoState>
  ) {
    this.liveModelServ = liveModelServ;
    this.modelEditorServ = modelEditorServ;

    this.modelEditorStatusStore = modelEditorStatusStore;
    this.modelUndoRedoStore = modelUndoRedoStore;
  }

  public applyShortcuts(event: KeyboardEvent): void {
    /** Open start computation menu */
    if (event.ctrlKey && event.shiftKey && event.key === 'S') {
      event.preventDefault();
      this.modelEditorServ.openMenuTab('Start Computation');
      return;
    }

    /** Open import export menu */
    if (event.ctrlKey && event.shiftKey && event.key === 'E') {
      event.preventDefault();
      this.modelEditorServ.openMenuTab('Import/Export');
      return;
    }

    /** Open model editor menu */
    if (event.ctrlKey && event.shiftKey && event.key === 'M') {
      event.preventDefault();
      this.modelEditorServ.openMenuTab('Model Editor');
      return;
    }

    /** Open model control editor menu */
    if (event.ctrlKey && event.shiftKey && event.key === 'C') {
      event.preventDefault();
      this.modelEditorServ.openMenuTab('Control Editor');
      return;
    }

    /** Open visual options menu */
    if (event.ctrlKey && event.shiftKey && event.key === 'V') {
      event.preventDefault();
      this.modelEditorServ.openMenuTab('Visual Options');
      return;
    }

    /** Edit update function of variable. */
    if (event.ctrlKey && event.key === 'e') {
      event.preventDefault();
      this.doForSelectedVariable((varId: number) =>
        this.modelEditorServ.openChangeUpdateFunctionWindow(varId)
      );
      return;
    }

    /** Rename variable. */
    if (event.ctrlKey && event.key === 'r') {
      event.preventDefault();
      this.doForSelectedVariable((varId: number) =>
        this.modelEditorServ.openChangeVarNameWindow(varId)
      );
      return;
    }

    /** Remove all selected. */
    if (event.ctrlKey && event.key === 'd') {
      event.preventDefault();
      this.removeAllSelected();
      return;
    }

    /** Toggle monotonicity for selected regulation. */
    if (event.ctrlKey && event.key === 'm') {
      event.preventDefault();
      this.doForSelectedRegulation((regulatorId: number, targetId: number) =>
        this.modelEditorServ.toggleRegulationMonocity(regulatorId, targetId)
      );
      return;
    }

    /** Toggle observability for selected regulation. */
    if (event.ctrlKey && event.key === 'o') {
      event.preventDefault();
      this.doForSelectedRegulation((regulatorId: number, targetId: number) =>
        this.modelEditorServ.toggleRegulationObservability(
          regulatorId,
          targetId
        )
      );
      return;
    }

    /** Undo */
    if (event.ctrlKey && event.key === 'z') {
      event.preventDefault();
      this.modelUndoRedoStore.getState().undo();
      return;
    }

    /** Redo */
    if (event.ctrlKey && event.key === 'y') {
      event.preventDefault();
      this.modelUndoRedoStore.getState().redo();
      return;
    }
  }

  private doForSelectedVariable(func: (varId: number) => void) {
    const selected = this.modelEditorStatusStore.getState().selectedItemsInfo;

    if (selected.variables.size === 1) {
      const selectedVariableId = selected.variables.values().next().value;

      if (selectedVariableId != undefined) {
        func(selectedVariableId);
      }
    }
  }

  private doForSelectedRegulation(
    func: (regulatorId: number, targetId: number) => void
  ) {
    const selectedRegulations = Object.entries(
      this.modelEditorStatusStore.getState().selectedItemsInfo.regulations
    );

    if (selectedRegulations.length === 1) {
      const selectedRegulation = selectedRegulations[0];

      if (selectedRegulation[1].size === 1) {
        const targetVariable = selectedRegulation[1].values().next().value;

        if (targetVariable != undefined)
          func(targetVariable, Number(selectedRegulation[0]));
      }
    }
  }

  private removeAllSelected() {
    const selectedVariables = this.modelEditorStatusStore
      .getState()
      .selectedItemsInfo.variables.values();
    const selectedRegulations = Object.entries(
      this.modelEditorStatusStore.getState().selectedItemsInfo.regulations
    );

    selectedRegulations.forEach(([targetId, regulatorsIdSet]) => {
      regulatorsIdSet.forEach((regulatorId) => {
        this.liveModelServ.Regulations.removeRegulation(
          true,
          regulatorId,
          Number(targetId),
          false
        );
      });
    });

    let iteratorResult: IteratorResult<number, undefined>;

    do {
      iteratorResult = selectedVariables.next();
      const variableId = iteratorResult.value;

      if (variableId != undefined) {
        this.modelEditorServ.removeVariable(variableId);
      }
    } while (!iteratorResult.done);
  }
}

export default ModelEditorShortcuts;
