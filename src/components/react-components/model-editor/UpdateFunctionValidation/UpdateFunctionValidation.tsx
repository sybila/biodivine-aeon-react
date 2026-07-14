import type { UpdateFunctionValidationProps } from './UpdateFunctionValidationProps';

const UpdateFunctionValidation: React.FC<UpdateFunctionValidationProps> = ({
  compMinHeight,
  compMaxHeight,
  compWidth,
  textColor,
  updateFunctionStatus,
}) => {
  return (
    <span
      className="block box-border p-{3px} overflow-x-auto overflow-y-auto font-(family-name:--font-family-fira-mono) select-none leading-[18px] text-[15px] whitespace-pre-line"
      style={{
        color: updateFunctionStatus.isError ? 'var(--color-negative)' : textColor,
        minHeight: compMinHeight,
        maxHeight: compMaxHeight,
        width: compWidth,
      }}
    >
      {updateFunctionStatus.status}
    </span>
  );
};

export default UpdateFunctionValidation;
