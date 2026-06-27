import HorizontalHidableContentReact from '../../lit-wrappers/HorizontalHidableContentReact';
import type { UtilitiesMenuProps } from './UtilitiesMenuProps';

import { useMemo } from 'react';

import type { ContentVisibleComponent, Variable } from '../../../../types';
import UndoRedoSection from './UndoRedoSection/UndoRedoSection';
import VariableSearchSection from './VariableSearchSection/VariableSearchSection';

const UtilitiesMenu: React.FC<UtilitiesMenuProps> = ({
  modelVisualization,
  searchAndFilterHelpersServ,
  pageStringProviderServ,

  variablesStore,
  helpHoverStore,
  modelUndoRedoStore,
  modelEditorStatusStore,
}) => {
  const gapInsideSection: string = '15px';

  const variables = variablesStore((state) => state.variables);

  const variableNames = useMemo(() => {
    return Object.values(variables).map((variable: Variable) => variable.name);
  }, [variables]);

  const renderVariableSearch = () => {};

  const renderUndoRedo = () => {};

  return (
    <HorizontalHidableContentReact
      ref={(el) =>
        modelEditorStatusStore
          .getState()
          .setUtilitiesMenuRef(el as ContentVisibleComponent)
      }
      className="absolute top-[55px] right-[12px] z-1"
      buttonRight={true}
      compHeight="180px"
      buttonWidth="25px"
      contentWidth="350px"
      buttonOnMouseEnter={(e) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e,
            pageStringProviderServ.Tooltips.utilitiesMenu(),
            true,
            50,
            -110
          )
      }
      buttonOnMouseLeave={() => helpHoverStore.getState().clear()}
    >
      <div
        slot="content"
        className="flex flex-col h-full w-full justify-between p-[7px]"
      >
        <VariableSearchSection
          submitFunction={(inputedText: string) =>
            modelVisualization.fit(
              searchAndFilterHelpersServ.filterVariablesBySearchTerms(
                variablesStore.getState().getAllVariables(),
                inputedText
              )
            )
          }
          setSearchBarRef={(el) =>
            modelEditorStatusStore.getState().setGlobalSearchRef(el)
          }
          textInputTooltipFunction={(e) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e,
                pageStringProviderServ.Tooltips.variableSearch(),
                true,
                50,
                -115
              )
          }
          clearTooltipFunction={() => helpHoverStore.getState().clear()}
          gapInsideSection={gapInsideSection}
          suggestionstrings={variableNames}
        />

        <UndoRedoSection
          undoFunction={() => modelUndoRedoStore.getState().undo()}
          redoFunction={() => modelUndoRedoStore.getState().redo()}
          undoTooltipFunction={(e: MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e,
                pageStringProviderServ.Tooltips.undoButton(),
                true,
                50,
                -90
              )
          }
          redoTooltipFunction={(e: MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e,
                pageStringProviderServ.Tooltips.redoButton(),
                true,
                50,
                -115
              )
          }
          clearTooltipFunction={() => helpHoverStore.getState().clear()}
          gapInsideSection={gapInsideSection}
        />
      </div>
    </HorizontalHidableContentReact>
  );
};

export default UtilitiesMenu;
