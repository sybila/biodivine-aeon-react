import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import ChangeUpdateFunctionInput from '../ChangeUpdateFunctionInput/ChangeUpdateFunctionInput';
import RegulationInfoList from '../RegulationInfoList/RegulationInfoList';
import type { ChangeUpFunOverlayContentProps } from './ChangeUpFunOverlayContentProps';

const ChangeUpFunOverlayContent: React.FC<ChangeUpFunOverlayContentProps> = ({
  varId,
  varName,
  originalUpdateFunction,
  originalUpdateFunctionStatus,
  validateUpdateFunctionFun,
  closeFunction,

  modelEditorServ,
  pageStringProviderServ,

  regulationsStore,
  variablesStore,
  helpHoverStore,
}) => {
  const [inputReference, setInputReference] = useState<HTMLElement | null>(
    null
  );

  const [updateFunction, setUpdateFunction] = useState(originalUpdateFunction);
  const [updateFunctionStatus, setUpdateFunctionStatus] = useState(
    originalUpdateFunctionStatus
  );

  const regulationsObj = regulationsStore((state) => state.regulations);

  const regulations = useMemo(
    () => Object.values(regulationsObj).filter((r) => r.target === varId),
    [regulationsObj, varId]
  );

  const revertFunction = () => {
    closeFunction();
  };

  const validateFunction = () =>
    validateUpdateFunctionFun(setUpdateFunctionStatus, updateFunction);

  const applyFunction = () => {
    if (originalUpdateFunction != updateFunction) {
      modelEditorServ.setUpdateFunction(varId, updateFunction);
    }

    closeFunction();
  };

  useEffect(() => {
    inputReference?.focus();
  }, [inputReference]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        revertFunction();
        return;
      }

      if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault();
        validateFunction();
        return;
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        applyFunction();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [updateFunction]);

  useEffect(() => {
    return () => helpHoverStore.getState().clear();
  });

  return (
    <div className="flex flex-col gap-4 p-2 justify-center items-center max-h-[40vh] w-[50vw]">
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
          varName={varName}
          updateFunction={updateFunction}
          updateFunctionStatus={updateFunctionStatus}
          compHeight="fit-content"
          compWidth="95%"
          inputFontSize="20px"
          inputHeight="100px"
          inputWidth="100%"
          validationMinHeight="40px"
          validationMaxHeight="50px"
          setUpdateFunction={(fun: string) => setUpdateFunction(fun)}
          exposeInputRef={(ref) => setInputReference(ref)}
          modelEditorServ={modelEditorServ}
          pageStringProviderServ={pageStringProviderServ}
          helpHoverStore={helpHoverStore}
        />
      </div>

      <section className="flex flex-row justify-around items-center w-full h-[12%]">
        <TextButtonReact
          compHeight="90%"
          compWidth="20%"
          text="Revert"
          onMouseEnter={(e: React.MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e.nativeEvent,
                pageStringProviderServ.Tooltips.RevertToOldName(),
                true,
                -50
              )
          }
          onMouseLeave={() => helpHoverStore.getState().clear()}
          onClick={() => {
            revertFunction();
          }}
        />
        <TextButtonReact
          compHeight="90%"
          compWidth="20%"
          text="Validate"
          onMouseEnter={(event: React.MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                event.nativeEvent,
                pageStringProviderServ.Tooltips.ValidateUpdateFunction(),
                true,
                -50
              )
          }
          onClick={() => validateFunction()}
        />
        <TextButtonReact
          compHeight="90%"
          compWidth="20%"
          text="Apply"
          onMouseEnter={(e: React.MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e.nativeEvent,
                pageStringProviderServ.Tooltips.ApplyUpdateFunction(),
                true,
                -50
              )
          }
          onMouseLeave={() => helpHoverStore.getState().clear()}
          onClick={() => applyFunction()}
        />
      </section>
    </div>
  );
};

export default ChangeUpFunOverlayContent;
