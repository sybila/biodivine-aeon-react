import NoDataText from '../../global/NoDataText/NoDataText';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import type { StateOverviewTabContentProps } from './StateOverviewTabContentProps';

const StateOverviewTabContent: React.FC<StateOverviewTabContentProps> = ({
  attractorVisualizerServ,
  attractorVisualizerStatusStore,
  messageServ,
}) => {
  const selectedState = attractorVisualizerStatusStore(
    (state) => state.selectedNodeState
  );

  if (!selectedState) {
    return <NoDataText text="No selected state" />;
  }

  const createVariableState = (
    variableState: string,
    variableName: string,
    index: number
  ) => {
    const isFalse = variableState === '0' || variableState === '⊥';
    const isDynamic = variableState === '0' || variableState === '1';

    return (
      <SimpleHeaderReact
        key={index}
        headerText={`${isFalse ? '!' : ''}${variableName}`}
        textColor={
          isDynamic
            ? isFalse
              ? 'var(--color-negative)'
              : 'var(--color-positive)'
            : 'var(--color-neutral)'
        }
        textFontWeight={isDynamic ? 'bold' : 'normal'}
      />
    );
  };

  const insertState = () => {
    if (!selectedState) {
      messageServ.showError(
        'Cannot show state overview: Internal Error (No selected state)'
      );
      return;
    }

    const variableNames: string[] | undefined =
      attractorVisualizerServ.getStateVariables();

    if (!variableNames) {
      messageServ.showError(
        'Cannot show state overview: Internal Error (No available variable names)'
      );
      return;
    }

    return (
      <section className="flex flex-wrap items-start justify-center w-[98%] min-h-[35px] max-h-[400px] mt-[10px] gap-2 overflow-y-auto">
        {selectedState
          .split('')
          .map((variableState, index) =>
            createVariableState(
              variableState,
              variableNames[index] ?? 'Unknown Variable',
              index
            )
          )}
      </section>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-3">
      {insertState()}
    </div>
  );
};

export default StateOverviewTabContent;
