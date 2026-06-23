import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import ChangeUpdateFunctionInput from '../ChangeUpdateFunctionInput/ChangeUpdateFunctionInput';
import RegulationInfoList from '../RegulationInfoList/RegulationInfoList';
import type { ChangeUpFunOverlayContentProps } from './ChangeUpFunOverlayContentProps';

const ChangeUpFunOverlayContent: React.FC<ChangeUpFunOverlayContentProps> = ({
  varId,

  modelEditorServ,
  pageStringProviderServ,

  regulationsStore,
  variablesStore,
  updateFunctionsStore,
  helpHoverStore,
}) => {
  const [inputReference, setInputReference] = useState<HTMLElement | null>(
    null
  );

  const regulationsObj = regulationsStore((state) => state.regulations);

  const regulations = useMemo(
    () => Object.values(regulationsObj).filter((r) => r.target === varId),
    [regulationsObj, varId]
  );

  useEffect(() => {
    inputReference?.focus();
  }, [inputReference]);

  return (
    <div className="flex flex-col gap-1 justify-center items-center max-h-[40vh] w-[50vw]">
      <DotHeaderReact
        headerText="Regulators"
        compHeight="15px"
        compWidth="100%"
        justifyHeader="start"
        textFontSize="12px"
      />

      <RegulationInfoList
        height="77px"
        width="100%"
        variableRegulations={regulations}
        hoverRegulation={undefined}
        selectedRegulatorIds={undefined}
        modelEditorServ={modelEditorServ}
        pageStringProviderServ={pageStringProviderServ}
        variablesStore={variablesStore}
        helpHoverStore={helpHoverStore}
      />

      <DotHeaderReact
        headerText="Update Function"
        compHeight="15px"
        compWidth="100%"
        justifyHeader="start"
        textFontSize="12px"
      />

      <div className="h-fit w-full bg-gray-200 rounded-[15px] p-2">
        <ChangeUpdateFunctionInput
          varId={varId}
          compHeight="fit-content"
          compWidth="95%"
          inputFontSize="20px"
          inputHeight="100px"
          inputWidth="100%"
          validationMinHeight="40px"
          validationMaxHeight="50px"
          exposeInputRef={(ref) => setInputReference(ref)}
          modelEditorServ={modelEditorServ}
          pageStringProviderServ={pageStringProviderServ}
          variablesStore={variablesStore}
          updateFunctionsStore={updateFunctionsStore}
          helpHoverStore={helpHoverStore}
        />
      </div>
    </div>
  );
};

export default ChangeUpFunOverlayContent;
