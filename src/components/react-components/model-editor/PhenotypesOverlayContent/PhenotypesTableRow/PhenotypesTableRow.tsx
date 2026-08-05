import { memo, useState } from 'react';
import InvisibleInputWithError from '../../../global/InvisibleInputWithError/InvisibleInputWithError';
import NonExtendableContentReact from '../../../lit-wrappers/NonExtebdableContentReact';
import type { PhenotypesTableRowProps } from './PhenotypesTableRowProps';

const PhenotypesTableRow: React.FC<PhenotypesTableRowProps> = memo(
  ({
    phenotypeId,
    phenotypeName,
    isSelected,
    changeActivePhenotype,
    handleChange = () => undefined,
    handleSubmit = () => undefined,

    helpHoverStore,
  }) => {
    const [nameError, setNameError] = useState(false);
    const [editedName, setEditedName] = useState(phenotypeName);

    const handleWrite = (
      fun: (newName: string) => string | undefined,
      newName: string
    ) => {
      const result = fun(newName);
      const isError = result === undefined;
      setNameError(isError);

      if (!isError) {
        setEditedName(phenotypeId === -1 ? phenotypeName : result);
      }
    };

    return (
      <NonExtendableContentReact
        className="cursor-pointer"
        compHeight="auto"
        compWidth="100%"
        contColor="var(--color-secondary-light)"
        contHoverColor="var(--color-secondary-light-highlight)"
        contActiveColor="var(--color-secondary-light-active)"
        contActiveBorder="2px var(--color-secondary-light-border) solid"
        contHoverBorder="2px var(--color-secondary-light-border) dashed"
        contBorder="2px var(--color-secondary-light) solid"
        contentOverflowX="visible"
        contentOverflowY="visible"
        active={isSelected}
        onClick={() => changeActivePhenotype(phenotypeId)}
      >
        <div className="h-full w-[40%] bg-(--color-tertiary-lighter) border border-dashed  border-(--color-tertiary-border) rounded-md">
          <InvisibleInputWithError
            height="100%"
            width="100%"
            checkError={() => nameError}
            textColor="var(--color-tertiary-text)"
            onChange={(newName) => {
              handleWrite(handleChange, newName);
            }}
            onSubmit={(newName) => {
              handleWrite(handleSubmit, newName);
            }}
            value={editedName}
            showTooltipFunction={(e: MouseEvent) =>
              helpHoverStore
                .getState()
                .setHelpHoverAtMouse(e, phenotypeName, true, -50, 50)
            }
            hideTooltipFunction={() => helpHoverStore.getState().clear()}
          />
        </div>
      </NonExtendableContentReact>
    );
  }
);

export default PhenotypesTableRow;
