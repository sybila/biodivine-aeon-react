const SeparatorLine: React.FC<{ width?: string }> = ({ width }) => {
  return (
    <div className={`h-[2px] w-[${width ?? '94%'}] mt-2 mb-2 bg-gray-300`} />
  );
};

export default SeparatorLine;
