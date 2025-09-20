const BehaviorClassLegend: React.FC<{ height?: string; width?: string }> = ({
  height,
  width,
}) => {
  return (
    <div
      className={`flex flex-row justify-center items-center w-[${
        width ?? '100%'
      }] h-[${
        height ?? '30px'
      }] font-[var(--base-font-family] text-sm gap-2 select-none`}
    >
      <span className="font-[Symbols] mb-[-10px]">D</span> disorder |{' '}
      <span className="font-[Symbols] mb-[-10px]">O</span> oscillation |{' '}
      <span className="font-[Symbols] mb-[-10px]">S</span> stability
    </div>
  );
};

export default BehaviorClassLegend;
