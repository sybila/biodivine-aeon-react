import { PertVariableFilterStatus } from '../../../../../../types/types';
import type { SelectVarFilterTableRowProp } from './SelectVarFilterTableRowProp';

const SelectVarFilterTableRow: React.FC<SelectVarFilterTableRowProp> = ({
  varName,
  isSelected,
  toggleSelect,
  pertStatus,
}) => {
  const getIndicatorColor = (): string => {
    switch (pertStatus) {
      case PertVariableFilterStatus.IN_FILTER_PERTURBED:
        return 'var(--color-present-in-perturbation)';
      case PertVariableFilterStatus.IN_FILTER_POSITIVELY_PERTURBED:
        return 'var(--color-in-phenotype-true)';
      case PertVariableFilterStatus.IN_FILTER_NEGATIVELY_PERTURBED:
        return 'var(--color-in-phenotype-false)';
      default:
        return 'var(--color-not-in-phenotype)';
    }
  };

  return (
    <section
      className="min-h-[25px] max-h-[37px] w-full flex flex-row justify-between items-center font-(--base-font-family) cursor-pointer px-2 select-none"
      style={{
        backgroundColor: isSelected
          ? 'var(--color-secondary-medium-highlight)'
          : 'transparent',
      }}
      onClick={() => toggleSelect(varName)}
      onMouseEnter={(e: React.MouseEvent) =>
        ((e.currentTarget as HTMLElement).style.backgroundColor =
          'var(--color-secondary-light-highlight)')
      }
      onMouseLeave={(e: React.MouseEvent) =>
        ((e.currentTarget as HTMLElement).style.backgroundColor = isSelected
          ? 'var(--color-secondary-medium-highlight)'
          : 'transparent')
      }
    >
      <span className="h-auto max-h-full max-w-[70%] whitespace-nowrap overflow-x-auto overflow-y-hidden text-(--color-secondary-text)">
        {varName}
      </span>
      <div
        style={{ backgroundColor: getIndicatorColor() }}
        className={`h-[19px] aspect-square rounded-3xl`}
      />
    </section>
  );
};

export default SelectVarFilterTableRow;
