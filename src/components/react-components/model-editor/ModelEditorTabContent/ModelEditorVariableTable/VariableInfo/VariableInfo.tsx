import DeleteIcon from '../../../../../../assets/icons/delete-24px.svg';
import SearchIcon from '../../../../../../assets/icons/search-24px.svg';
import DotHeaderReact from '../../../../lit-wrappers/DotHeaderReact';
import ExtendableContentReact from '../../../../lit-wrappers/ExtendableContentReact';
import IconButtonReact from '../../../../lit-wrappers/IconButtonReact';
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
  selectedRegulation,
  modelEditorServ,
  regulationsStore,
  variablesStore,
  updateFunctionsStore,
}) => {
  return (
    <ExtendableContentReact
      contWidth="100%"
      topContentOverflowX="visible"
      topContentOverflowY="visible"
      hover={hoverVariable}
      active={selectedVariable}
      handleMouseEnter={() => modelEditorServ.hoverVariableCytoscape(id, true)}
      handleMouseLeave={() => modelEditorServ.hoverVariableCytoscape(id, false)}
    >
      <section slot="top-content" className="h-full w-[60%]">
        <VariableNameInput
          height="28px"
          width="250px"
          fontSize="16px"
          varId={id}
          varName={name}
          onUpdate={(id: number, newName: string) =>
            modelEditorServ.changeVariableName(id, newName)
          }
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
        ></IconButtonReact>

        <IconButtonReact
          compHeight="100%"
          buttonBorderRadius="8px"
          iconSize="90%"
          iconSrc={DeleteIcon}
          iconAlt="delete"
          handleClick={async () => await modelEditorServ.removeVariable(id)}
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
          varId={id}
          height="77px"
          width="100%"
          hoverRegulation={hoverRegulation}
          selectedRegulation={selectedRegulation}
          modelEditorServ={modelEditorServ}
          regulationsStore={regulationsStore}
          variablesStore={variablesStore}
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
          inputHeight="28px"
          inputWidth="100%"
          validationMinHeight="20px"
          validationMaxHeight="40px"
          modelEditorServ={modelEditorServ}
          variablesStore={variablesStore}
          updateFunctionsStore={updateFunctionsStore}
        />
      </section>
    </ExtendableContentReact>
  );
};

export default VariableInfo;
