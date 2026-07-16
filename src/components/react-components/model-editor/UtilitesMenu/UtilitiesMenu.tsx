import HorizontalHidableContentReact from '../../lit-wrappers/HorizontalHidableContentReact';
import type { UtilitiesMenuProps } from './UtilitiesMenuProps';

import { useMemo } from 'react';

import type { ContentVisibleComponent, Variable } from '../../../../types';
import OneButtonSection from '../../global/OneButtonSection/OneButtonSection';
import ZoomSection from '../../global/ZoomSection/ZoomSection';
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

  const zoomStatus = modelEditorStatusStore(
    (state) => state.visualizationZoomStatus
  );

  return (
    <HorizontalHidableContentReact
      ref={(el) =>
        modelEditorStatusStore
          .getState()
          .setUtilitiesMenuRef(el as ContentVisibleComponent)
      }
      className="absolute top-[55px] right-[12px] z-1"
      compBgColor="var(--color-primary)"
      buttonHoverColor='var(--color-primary-buttons-hover)'
      buttonRight={true}
      compHeight="400px"
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

        <ZoomSection
          setZoomFunction={(zoomLevel: number) =>
            modelVisualization.setZoom(zoomLevel)
          }
          gapInsideSection={gapInsideSection}
          minValue={zoomStatus?.minZoom ?? 0}
          maxValue={zoomStatus?.maxZoom ?? 100}
          currentValue={zoomStatus?.currentZoom ?? 0}
        />

        <OneButtonSection
          gapInsideSection={gapInsideSection}
          headerText="Fit Into View"
          buttonText="Fit"
          headerTextColor='var(--color-primary-text)'
          buttonTextColor='var(--color-secondary-text)'
          buttonColor="var(--color-secondary-buttons)"
          buttonTooltipFunction={(e: MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e,
                pageStringProviderServ.Tooltips.fit(),
                true,
                -50
              )
          }
          hideTooltipFunction={() => helpHoverStore.getState().clear()}
          onClick={() => {
            modelVisualization.fit();
          }}
        />
      </div>
    </HorizontalHidableContentReact>
  );
};

export default UtilitiesMenu;
