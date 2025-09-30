import ExtendableContentReact from '../../../../lit-wrappers/ExtendableContentReact';
import IconButtonReact from '../../../../lit-wrappers/IconButtonReact';

import ModelEditor from '../../../../../../services/model-editor/ModelEditor/ModelEditor';

import SearchIcon from '../../../../../../assets/icons/search-24px.svg';
import DeleteIcon from '../../../../../../assets/icons/delete-24px.svg';
import type { VariableInfoProps } from './VariableInfoProps';
import DotHeaderReact from '../../../../lit-wrappers/DotHeaderReact';
import VariableNameInput from '../../../VariableNameInput/VariableNameInput';
import ChangeUpdateFunctionInput from '../../../ChangeUpdateFunctionInput/ChangeUpdateFunctionInput';
import RegulationInfoList from '../../../RegulationInfoList/RegulationInfoList';

const VariableInfo: React.FC<VariableInfoProps> = ({
  id,
  name,
  hoverVariable,
  selectedVariable,
  hoverRegulation,
  selectedRegulation,
}) => {
  return (
    <ExtendableContentReact
      compWidth="100%"
      topOverflowX="visible"
      topOverflowY="visible"
      topContentOverflowX="visible"
      topContentOverflowY="visible"
      hover={hoverVariable}
      active={selectedVariable}
      handleMouseEnter={() => ModelEditor.hoverVariableCytoscape(id, true)}
      handleMouseLeave={() => ModelEditor.hoverVariableCytoscape(id, false)}
    >
      <section slot="top-content" className="h-full w-[60%]">
        <VariableNameInput
          height="100%"
          width="100%"
          singleFontSize="16px"
          varId={id}
          varName={name}
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
          handleClick={() => ModelEditor.zoomOnVariable(id)}
        ></IconButtonReact>

        <IconButtonReact
          compHeight="100%"
          buttonBorderRadius="8px"
          iconSize="90%"
          iconSrc={DeleteIcon}
          iconAlt="delete"
          handleClick={async () => await ModelEditor.removeVariable(id)}
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
        />
      </section>
    </ExtendableContentReact>
  );
};

export default VariableInfo;
