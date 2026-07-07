import { useEffect, useState } from 'react';
import TextButtonReact from '../../lit-wrappers/TextButtonReact';
import VariableNameInput from '../VariableNameInput/VariableNameInput';
import type { ChangeVariableNameOverlayContentProps } from './ChangeVariableNameOverlayContentProps';

const ChangeVarNameOverlayContent: React.FC<
  ChangeVariableNameOverlayContentProps
> = ({
  varId,
  originalName,
  closeFunction,
  modelEditorServ,
  pageStringProviderServ,
  helpHoverStore,
}) => {
  const [inputReference, setInputReference] = useState<HTMLElement | null>(
    null
  );

  const [currentName, setCurrentName] = useState(originalName);

  const [nameError, setNameError] = useState<boolean>(
    !currentName || currentName === ''
  );

  const revertFunction = () => {
    modelEditorServ.changeVariableName(varId, originalName, true);
    closeFunction();
  };

  const applyFunction = () => {
    if (currentName === originalName) {
      closeFunction();
      return;
    }

    const result: boolean = modelEditorServ.changeVariableName(
      varId,
      currentName,
      false
    );

    if (result) {
      closeFunction();
    } else {
      setNameError(true);
    }
  };

  useEffect(() => {
    inputReference?.focus();
  }, [inputReference]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        revertFunction();
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        applyFunction();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentName]);

  useEffect(() => {
    return () => helpHoverStore.getState().clear();
  });

  return (
    <div className="flex flex-col justify-around items-center h-[20vh] w-[50vw] gap-2">
      <VariableNameInput
        height="80%"
        width="99%"
        fontSize="25px"
        varName={currentName}
        nameError={nameError}
        exposeInputRef={(ref) => setInputReference(ref)}
        onKeyUp={(newName: string) => setCurrentName(newName)}
      />

      <section className="flex flex-row justify-around items-center w-full h-[12%]">
        <TextButtonReact
          compHeight="90%"
          compWidth="40%"
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
          compWidth="40%"
          text="Apply"
          onMouseEnter={(e: React.MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e.nativeEvent,
                pageStringProviderServ.Tooltips.ApplyNewName(),
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

export default ChangeVarNameOverlayContent;
