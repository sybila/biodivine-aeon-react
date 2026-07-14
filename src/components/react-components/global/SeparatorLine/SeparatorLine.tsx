const SeparatorLine: React.FC<{ width?: string; color?: string }> = ({
  width,
  color = 'var(--color-primary-separator)',
}) => {
  return (
    <div className={`h-[2px] w-[${width ?? '94%'}] mt-2 mb-2 bg-[${color}]`} />
  );
};

export default SeparatorLine;
