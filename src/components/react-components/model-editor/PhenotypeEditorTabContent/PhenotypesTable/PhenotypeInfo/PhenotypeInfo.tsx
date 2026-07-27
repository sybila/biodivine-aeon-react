import NonExtendableContentReact from '../../../../lit-wrappers/NonExtebdableContentReact';
import type { PhenotypeInfoProps } from './PhenotypeInfoProps';

const PhenotypeInfo: React.FC<PhenotypeInfoProps> = ({
  id,
  name,
  selected,
  toggleSelect,

  helpHoverStore,
}) => {
  return (
    <NonExtendableContentReact
      className="cursor-pointer"
      compHeight="auto"
      compWidth="100%"
      contColor="var(--color-secondary-light)"
      contHoverColor="var(--color-secondary-light-highlight)"
      contActiveColor="var(--color-secondary-active)"
      contActiveBorder="2px var(--color-secondary-border) solid"
      contHoverBorder="2px var(--color-secondary-border) dashed"
      contBorder="2px var(--color-secondary-light) solid"
      contentOverflowX="visible"
      contentOverflowY="visible"
      active={selected}
      onClick={() => toggleSelect(id)}
    >
      <span
        className="h-full w-[55%] select-none overflow-x-auto overflow-y-hidden text-(--color-secondary-text) text-[100%] font-(family-name:--font-family-fira-mono)"
        onMouseEnter={(e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(e.nativeEvent, name, true, -50, 50)
        }
        onMouseLeave={() => helpHoverStore.getState().clear()}
      >
        {name}
      </span>
    </NonExtendableContentReact>
  );
};

export default PhenotypeInfo;
