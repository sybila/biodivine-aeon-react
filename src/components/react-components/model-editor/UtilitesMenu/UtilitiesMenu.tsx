import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import HorizontalHidableContentReact from '../../lit-wrappers/HorizontalHidableContentReact';
import TextInputReact from '../../lit-wrappers/TextInputReact';
import type { UtilitiesMenuProps } from './UtilitiesMenuProps';

import RedoIcon from '../../../../assets/icons/redo.svg';
import UndoIcon from '../../../../assets/icons/undo.svg';
import type { ContentVisibleComponent } from '../../../../types';
import TextIconButtonReact from '../../lit-wrappers/TextIconButtonReact';

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

  const renderVariableSearch = () => {
    return (
      <section
        className="flex flex-col h-fit w-full"
        style={{ gap: `${gapInsideSection}` }}
      >
        <DotHeaderReact headerText="Variable Search" compHeight="20px" />

        <TextInputReact
          placeholder="Search variables... (press enter to submit)"
          compHeight="30px"
          compWidth="100%"
          onSubmit={(value) =>
            modelVisualization.fit(
              searchAndFilterHelpersServ.filterVariablesBySearchTerms(
                variablesStore.getState().getAllVariables(),
                value
              )
            )
          }
          onMouseEnter={(e) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e.nativeEvent,
                pageStringProviderServ.Tooltips.variableSearch(),
                true,
                50,
                -115
              )
          }
          onMouseLeave={() => helpHoverStore.getState().clear()}
        />
      </section>
    );
  };

  const renderUndoRedo = () => {
    return (
      <section
        className="flex flex-col h-fit w-full"
        style={{ gap: `${gapInsideSection}` }}
      >
        <DotHeaderReact headerText="Undo/Redo" compHeight="20px" />

        <div className="flex flex-row justify-around h-[30px] w-full">
          <TextIconButtonReact
            compHeight="100%"
            compWidth="49%"
            text="Undo"
            onClick={() => modelUndoRedoStore.getState().undo()}
            iconSrc={UndoIcon}
            iconAlt="U"
            onMouseEnter={(e: React.MouseEvent) =>
              helpHoverStore
                .getState()
                .setHelpHoverAtMouse(
                  e.nativeEvent,
                  pageStringProviderServ.Tooltips.undoButton(),
                  true,
                  50,
                  -90
                )
            }
            onMouseLeave={() => helpHoverStore.getState().clear()}
          />
          <TextIconButtonReact
            compHeight="100%"
            compWidth="49%"
            onClick={() => modelUndoRedoStore.getState().redo()}
            iconSrc={RedoIcon}
            iconAlt="R"
            text="Redo"
            onMouseEnter={(e) =>
              helpHoverStore
                .getState()
                .setHelpHoverAtMouse(
                  e.nativeEvent,
                  pageStringProviderServ.Tooltips.redoButton(),
                  true,
                  50,
                  -115
                )
            }
            onMouseLeave={() => helpHoverStore.getState().clear()}
          />
        </div>
      </section>
    );
  };

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
        {renderVariableSearch()}
        {renderUndoRedo()}
      </div>
    </HorizontalHidableContentReact>
  );
};

export default UtilitiesMenu;
