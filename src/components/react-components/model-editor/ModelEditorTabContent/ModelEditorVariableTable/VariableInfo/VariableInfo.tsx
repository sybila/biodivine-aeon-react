import React, { useMemo } from 'react';
import DeleteIcon from '../../../../../../assets/icons/delete-24px.svg';
import SearchIcon from '../../../../../../assets/icons/search-24px.svg';
import type { UpdateFunctionStatus } from '../../../../../../types';
import DotHeaderReact from '../../../../lit-wrappers/DotHeaderReact';
import ExtendableContentReact from '../../../../lit-wrappers/ExtendableContentReact';
import IconButtonReact from '../../../../lit-wrappers/IconButtonReact';
import MultilineTextReact from '../../../../lit-wrappers/MultilineTextReact';
import NonScrollableTextReact from '../../../../lit-wrappers/NonScrollableTextReact';
import SimpleHeaderReact from '../../../../lit-wrappers/SimpleHeaderReact';
import RegulationInfoList from '../../../RegulationInfoList/RegulationInfoList';
import UpdateFunctionValidation from '../../../UpdateFunctionValidation/UpdateFunctionValidation';
import type { VariableInfoProps } from './VariableInfoProps';

const VariableInfo: React.FC<VariableInfoProps> = ({
  id,
  name,
  hoverVariable,
  selectedVariable,
  hoverRegulation,
  selectedRegulatorIds,
  exposeSetExtend,
  setVariableInfoRef,

  modelEditorServ,
  pageStringProviderServ,

  regulationsStore,
  variablesStore,
  updateFunctionsStore,
  helpHoverStore,
}) => {
  const regulationsObj = regulationsStore((state) => state.regulations);
  const updateFunction: string | undefined = updateFunctionsStore(
    (state) => state.updateFunctions[id]?.functionString ?? undefined
  );
  const updateFunctionStatus: UpdateFunctionStatus = updateFunctionsStore(
    (state) => state.updateFunctionStatus[id] ?? { status: '', isError: false }
  );

  const regulations = useMemo(
    () => Object.values(regulationsObj).filter((r) => r.target === id),
    [regulationsObj, id]
  );

  return (
    <ExtendableContentReact
      ref={(el) => setVariableInfoRef(id, el)}
      contWidth="100%"
      topContentOverflowX="visible"
      topContentOverflowY="visible"
      hover={hoverVariable}
      active={selectedVariable}
      handleMouseEnter={() => modelEditorServ.hoverVariableCytoscape(id, true)}
      handleMouseLeave={() => modelEditorServ.hoverVariableCytoscape(id, false)}
      exposeSetExtend={(func: (extend: boolean) => void) =>
        exposeSetExtend(func)
      }
    >
      <section
        slot="top-content"
        className="h-full w-[80%] flex flex-row justify-between items-center  shrink-0"
      >
        <NonScrollableTextReact
          compHeight="28px"
          compWidth="200px"
          textFontSize="16px"
          textFontFamily="var(--font-family-fira-mono)"
          textAlign="start"
          textJustify="center"
          text={name ? name : ''}
          className="cursor-pointer"
          onClick={() => modelEditorServ.openChangeVarNameWindow(id)}
          onMouseEnter={(e: React.MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e.nativeEvent,
                name.length > 0
                  ? name
                  : pageStringProviderServ.Tooltips.changeVariableName(),
                true,
                -50
              )
          }
          onMouseLeave={helpHoverStore.getState().clear}
        />

        <SimpleHeaderReact
          compHeight="28px"
          compWidth="100px"
          textFontSize="16px"
          lineHeight="28px"
          textFontWeight="normal"
          textFontFamily="var(--font-family-fira-mono)"
          headerText={`#↓ ${regulations.length}`}
          onMouseEnter={(e: React.MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e.nativeEvent,
                pageStringProviderServ.Tooltips.variableArity(
                  regulations.length
                ),
                true,
                -50
              )
          }
          onMouseLeave={() => helpHoverStore.getState().clear()}
        />
      </section>

      <section
        slot="top-content"
        className="flex justify-around items-center h-full w-[15%]"
      >
        <IconButtonReact
          compHeight="100%"
          buttonBorderRadius="8px"
          iconSize="90%"
          iconSrc={SearchIcon}
          iconAlt="find"
          handleClick={() => modelEditorServ.zoomOnVariable(id)}
          onMouseEnter={(e: React.MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e.nativeEvent,
                pageStringProviderServ.Tooltips.findVariableInVisualization(),
                true,
                -50
              )
          }
          onMouseLeave={() => helpHoverStore.getState().clear()}
        ></IconButtonReact>

        <IconButtonReact
          compHeight="100%"
          buttonBorderRadius="8px"
          iconSize="90%"
          iconSrc={DeleteIcon}
          iconAlt="delete"
          handleClick={async () => await modelEditorServ.removeVariable(id)}
          onMouseEnter={(e: React.MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e.nativeEvent,
                pageStringProviderServ.Tooltips.deleteVariable(),
                true,
                -50
              )
          }
          onMouseLeave={() => helpHoverStore.getState().clear()}
        ></IconButtonReact>
      </section>

      <DotHeaderReact
        slot="extended-content"
        headerText="Regulators"
        compWidth="100%"
        justifyHeader="start"
        textFontSize="12px"
      ></DotHeaderReact>

      <section slot="extended-content" className="h-fit w-full">
        <RegulationInfoList
          height="77px"
          width="100%"
          variableRegulations={regulations}
          hoverRegulation={hoverRegulation}
          selectedRegulatorIds={selectedRegulatorIds}
          modelEditorServ={modelEditorServ}
          pageStringProviderServ={pageStringProviderServ}
          variablesStore={variablesStore}
          helpHoverStore={helpHoverStore}
        />
      </section>

      <DotHeaderReact
        slot="extended-content"
        headerText="Update Function"
        compWidth="100%"
        justifyHeader="start"
        textFontSize="12px"
      ></DotHeaderReact>

      <section slot="extended-content" className="h-fit w-full">
        <MultilineTextReact
          compHeight="70px"
          compWidth="100%"
          textFontSize="18px"
          textAlign="center"
          overflowY="auto"
          textFontFamily="var(--font-family-fira-mono)"
          text={updateFunction}
          placeholder={pageStringProviderServ.OtherStrings.updateFunctionInputPlaceholder(
            name ?? undefined
          )}
          handleClick={() => modelEditorServ.openChangeUpdateFunctionWindow(id)}
          cursor="pointer"
          onMouseEnter={(e: React.MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e.nativeEvent,
                pageStringProviderServ.Tooltips.changeVariableUpdateFunction(),
                true,
                -80
              )
          }
          onMouseLeave={() => helpHoverStore.getState().clear()}
        />

        <UpdateFunctionValidation
          compMinHeight={'20px'}
          compMaxHeight={'50px'}
          compWidth={'90%'}
          updateFunctionStatus={updateFunctionStatus}
        />
      </section>
    </ExtendableContentReact>
  );
};

export default VariableInfo;
