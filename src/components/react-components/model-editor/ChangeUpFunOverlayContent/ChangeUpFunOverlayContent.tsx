import type React from 'react';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import ChangeUpdateFunctionInput from '../ChangeUpdateFunctionInput/ChangeUpdateFunctionInput';
import RegulationInfoList from '../RegulationInfoList/RegulationInfoList';
import type { ChangeUpFunOverlayContentProps } from './ChangeUpFunOverlayContentProps';

const ChangeUpFunOverlayContent: React.FC<ChangeUpFunOverlayContentProps> = ({
  varId,
  modelEditorServ,
  regulationsStore,
}) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center h-fit w-[450px]">
      <DotHeaderReact
        headerText="Regulators"
        compHeight="15px"
        compWidth="100%"
        justifyHeader="start"
        textFontSize="12px"
      />
      <div className="h-fit w-full">
        <RegulationInfoList
          varId={varId}
          height="77px"
          width="100%"
          hoverRegulation={undefined}
          selectedRegulation={undefined}
          modelEditorServ={modelEditorServ}
          regulationsStore={regulationsStore}
        />
      </div>

      <DotHeaderReact
        headerText="Update Function"
        compHeight="15px"
        compWidth="100%"
        justifyHeader="start"
        textFontSize="12px"
      />

      <div className="h-fit w-fit bg-gray-200 rounded-[15px] p-2">
        <ChangeUpdateFunctionInput
          varId={varId}
          compHeight="fit-content"
          compWidth="350px"
          inputFontSize="20px"
          inputHeight="30px"
          inputWidth="350px"
          validationMinHeight="40px"
          validationMaxHeight="50px"
          modelEditorServ={modelEditorServ}
        />
      </div>
    </div>
  );
};

export default ChangeUpFunOverlayContent;
