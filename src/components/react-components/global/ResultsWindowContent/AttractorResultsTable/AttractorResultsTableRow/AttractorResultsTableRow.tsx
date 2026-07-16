import SimpleHeaderReact from '../../../../lit-wrappers/SimpleHeaderReact';
import type { AttractorResultsTableRowProps } from './AttractorResultsTableRowProps';

const AttractorResultsTableRow: React.FC<AttractorResultsTableRowProps> = ({
  interpretationCount,
  behaviorClassList,
  textColor = 'var(--color-primary-text)',
  textHoverColor = 'var(--color-primary-interactive-text)',

  computationManagerServ,
  attractorVisualizerServ,
  pageStringProviderServ,

  helpHoverStore,
}) => {
  const behaviourString: string | undefined = !behaviorClassList
    ? undefined
    : behaviorClassList
        .map((x) => x[0])
        .sort()
        .join('');

  const openAttractor = () => {
    if (behaviourString && behaviourString.length > 0) {
      attractorVisualizerServ.openVisualizer({ behavior: behaviourString });
    }
  };

  const openWitness = () => {
    computationManagerServ.openWitnessAttractorAnalysis(
      behaviourString ? behaviourString : ''
    );
  };

  const buttonsContent: Array<[string, () => void, () => string]> = [
    [
      'Witness',
      () => openWitness(),
      pageStringProviderServ.Tooltips.OverlayWindowTooltips.ResultsTooltips
        .AttractorAnalysisResults.openWitness,
    ],
    [
      'Attractor',
      () => openAttractor(),
      pageStringProviderServ.Tooltips.OverlayWindowTooltips.ResultsTooltips
        .AttractorAnalysisResults.openAttractorVisualization,
    ],
  ];

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
            !behaviourString || behaviourString.length === 0
              ? 'unclassified'
              : behaviourString
          }
          textFontFamily="Symbols"
        />
      </div>

      <span className="flex flex-row items-center justify-center-safe h-full mx-[5%] w-[30%] overflow-x-auto overflow-y-hidden font-(--base-font-family) text-(--color-primary-text) text-[18px] select-none">
        {!interpretationCount ? 'unknown' : interpretationCount.toString()}
      </span>

      <div className="flex flex-row h-full w-[30%] items-center justify-end gap-2">
        {buttonsContent.map(([text, onClick, tooltipTextFunction], index) => (
          <span
            key={index}
            className="decoration-solid underline cursor-pointer"
            style={{ color: textColor }}
            onClick={onClick}
            onMouseEnter={(e: React.MouseEvent) => {
              {
                helpHoverStore
                  .getState()
                  .setHelpHoverAtMouse(
                    e.nativeEvent,
                    tooltipTextFunction(),
                    true,
                    -50
                  );
                (e.currentTarget as HTMLSpanElement).style.color =
                  textHoverColor;
              }
            }}
            onMouseLeave={(e: React.MouseEvent) => {
              helpHoverStore.getState().clear();
              (e.currentTarget as HTMLSpanElement).style.color = textColor;
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </section>
  );
};

export default AttractorResultsTableRow;
