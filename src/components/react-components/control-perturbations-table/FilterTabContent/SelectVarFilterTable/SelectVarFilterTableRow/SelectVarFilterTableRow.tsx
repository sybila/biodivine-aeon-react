import { PertVariableFilterStatus } from '../../../../../../types';
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
        return 'var(--color-violet)';
      case PertVariableFilterStatus.IN_FILTER_POSITIVELY_PERTURBED:
        return 'var(--color-green)';
      case PertVariableFilterStatus.IN_FILTER_NEGATIVELY_PERTURBED:
        return 'var(--color-red)';
      default:
        return 'var(--color-grey)';
    }
  };

  return (
    <section
      className="h-[25px] w-full flex flex-row justify-between items-center font-[var(--base-font-family)] hover:bg-[var(--color-grey-blue-ultra-light)] cursor-pointer px-2 select-none"
      style={{
        backgroundColor: isSelected ? 'var(--color-grey-blue-light)' : '',
      }}
      onClick={() => toggleSelect(varName)}
    >
      <span className="h-full max-w-[70%] whitespace-nowrap overflow-x-auto ">
        {varName}
      </span>
      <div
        style={{ backgroundColor: getIndicatorColor() }}
        className={`h-[80%] aspect-square rounded-3xl`}
      />
    </section>
  );
};

export default SelectVarFilterTableRow;
