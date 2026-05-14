import React, { useMemo } from 'react';
import DeleteIcon from '../../../../../../assets/icons/delete-24px.svg';
import SearchIcon from '../../../../../../assets/icons/search-24px.svg';
import DotHeaderReact from '../../../../lit-wrappers/DotHeaderReact';
import ExtendableContentReact from '../../../../lit-wrappers/ExtendableContentReact';
import IconButtonReact from '../../../../lit-wrappers/IconButtonReact';
import SimpleHeaderReact from '../../../../lit-wrappers/SimpleHeaderReact';
import ChangeUpdateFunctionInput from '../../../ChangeUpdateFunctionInput/ChangeUpdateFunctionInput';
import RegulationInfoList from '../../../RegulationInfoList/RegulationInfoList';
import VariableNameInput from '../../../VariableNameInput/VariableNameInput';
import type { VariableInfoProps } from './VariableInfoProps';

const VariableInfo: React.FC<VariableInfoProps> = ({
  id,
  name,
  hoverVariable,
  selectedVariable,
  hoverRegulation,
  selectedRegulatorIds,
  exposeSetExtend,

  modelEditorServ,
  stringProviderServ,

  regulationsStore,
  variablesStore,
  updateFunctionsStore,
  helpHoverStore,
}) => {
  const regulationsObj = regulationsStore((state) => state.regulations);

  const regulations = useMemo(
    () => Object.values(regulationsObj).filter((r) => r.target === id),
    [regulationsObj, id]
  );

  return (
    <ExtendableContentReact
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
        <VariableNameInput
          height="28px"
          width="200px"
          fontSize="16px"
          varId={id}
          varName={name}
          onUpdate={(id: number, newName: string) =>
            modelEditorServ.changeVariableName(id, newName)
          }
          stringProviderServ={stringProviderServ}
          helpHoverStore={helpHoverStore}

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
                stringProviderServ.ToolTips.ModelEditorTooltips.variableArity(
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
                stringProviderServ.ToolTips.ModelEditorTooltips.findVariableInVisualization(),
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
                stringProviderServ.ToolTips.ModelEditorTooltips.deleteVariable(),
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
          stringProviderServ={stringProviderServ}

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
        <ChangeUpdateFunctionInput
          varId={id}
          compHeight="fit-content"
          compWidth="100%"
          inputFontSize="16px"
          inputMinHeight="28px"
          inputMaxHeight="90px"
          inputWidth="100%"
          validationMinHeight="20px"
          validationMaxHeight="40px"
          modelEditorServ={modelEditorServ}
          stringProviderServ={stringProviderServ}
          variablesStore={variablesStore}
          updateFunctionsStore={updateFunctionsStore}
          helpHoverStore={helpHoverStore}

        />
      </section>
    </ExtendableContentReact>
  );
};

export default VariableInfo;
