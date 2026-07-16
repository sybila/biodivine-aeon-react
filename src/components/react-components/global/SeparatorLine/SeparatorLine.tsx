const SeparatorLine: React.FC<{ width?: string; color?: string }> = ({
  width = '94%',
  color = 'var(--color-primary-separator)',
}) => {
  return (
    <div
      className="h-[2px] mt-2 mb-2"
      style={{ width: width, backgroundColor: color }}
    />
  );
};

export default SeparatorLine;
