import SimpleHeaderReact from '../../../../lit-wrappers/SimpleHeaderReact';
import type { BehaviorClassTableRowProps } from './BehaviorClassTableRowProps';

const BehaviorClassTableRow: React.FC<BehaviorClassTableRowProps> = ({
  distribution,
  interpretationCount,
  behaviorClassJSON,
  behaviorClassOperationsServ,
  textColor = 'var(--color-primary-text)',
}) => {
  const behaviorClass =
    behaviorClassOperationsServ.normalizeClasses(
      undefined,
      behaviorClassJSON
    ) ?? 'unclassified';

  const createDistributionString = () => {
    if (distribution[0] < 0 || distribution[1] < 0) return 'unknown';

    return `${distribution[0]}% / ${distribution[1]}%`;
  };

  return (
    <section className="flex flex-row items-center justify-start h-[30px] w-full">
      <div className="flex flex-row items-center justify-center h-full w-[30%] max-w-[30%] overflow-y-hidden overflow-x-auto">
        <SimpleHeaderReact
          className="mb-[-12px]"
          compHeight="100%"
          compWidth="fit-content"
          lineHeight="30px"
          textFontSize="18px"
          textColor={textColor}
          headerText={
            !behaviorClass || behaviorClass.length === 0
              ? 'unclassified'
              : behaviorClass
          }
          textFontFamily={
            !behaviorClass || behaviorClass.length === 0
              ? 'var(--base-font-family)'
              : 'Symbols'
          }
        />
      </div>

      <span
        className="flex flex-row items-center justify-center-safe h-full overflow-x-auto overflow-y-hidden mx-[5%] w-[30%] font-(--base-font-family) text-[18px] select-none"
        style={{ color: textColor }}
      >
        {!interpretationCount ? 'unknown' : interpretationCount.toString()}
      </span>

      <div className="flex flex-row h-full w-[30%] items-center justify-center gap-2">
        <SimpleHeaderReact
          compHeight="100%"
          compWidth="fit-content"
          textColor={textColor}
          lineHeight="30px"
          textFontSize="18px"
          textFontWeight="normal"
          headerText={createDistributionString()}
        />
      </div>
    </section>
  );
};

export default BehaviorClassTableRow;
