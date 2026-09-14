const BehaviorClassLegend: React.FC<{
  height?: string;
  width?: string;
  textColor?: string;
}> = ({
  height = '30px',
  width = '100%',
  textColor = 'var(--color-primary-text)',
}) => {
  return (
    <div
      className="flex flex-row justify-center items-center font-(--base-font-family) text-sm gap-2 select-none"
      style={{ color: textColor, height: height, width: width }}
    >
      <span className="font-[Symbols] mb-[-10px] text-inherit">D</span> disorder
      | <span className="font-[Symbols] mb-[-10px] text-inherit">O</span>{' '}
      oscillation |{' '}
      <span className="font-[Symbols] mb-[-10px] text-inherit">S</span>{' '}
      stability
    </div>
  );
};

export default BehaviorClassLegend;
