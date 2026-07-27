import { memo } from 'react';
import NonExtendableContentReact from '../../../lit-wrappers/NonExtebdableContentReact';
import type { PhenotypesTableRowProps } from './PhenotypesTableRowProps';

const PhenotypesTableRow: React.FC<PhenotypesTableRowProps> = memo(
  ({
    phenotypeId,
    phenotypeName,
    isSelected,
    changeActivePhenotype,

    helpHoverStore,
  }) => {
    return (
      <NonExtendableContentReact
        className="cursor-pointer"
        compHeight="auto"
        compWidth="100%"
        contColor="var(--color-tertiary-lighter)"
        contHoverColor="var(--color-tertiary-lighter-highlight)"
        contActiveColor="var(--color-tertiary-active)"
        contActiveBorder="2px var(--color-tertiary-border) solid"
        contHoverBorder="2px var(--color-tertiary-border) dashed"
        contBorder="2px var(--color-tertiary-lighter) solid"
        contentOverflowX="visible"
        contentOverflowY="visible"
        active={isSelected}
        onClick={() => changeActivePhenotype(phenotypeId)}
      >
        <span
          className="h-full w-[55%] select-none overflow-x-auto overflow-y-hidden text-(--color-secondary-text) text-[100%] font-(family-name:--font-family-fira-mono)"
          onMouseEnter={(e: React.MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(e.nativeEvent, phenotypeName, true, -50, 50)
          }
          onMouseLeave={() => helpHoverStore.getState().clear()}
        >
          {phenotypeName}
        </span>
      </NonExtendableContentReact>
    );
  }
);

export default PhenotypesTableRow;
