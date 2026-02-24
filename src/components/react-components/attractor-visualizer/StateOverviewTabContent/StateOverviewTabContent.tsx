import { Message } from '../../../lit-components/message-wrapper';
import NoDataText from '../../global/NoDataText/NoDataText';
import SimpleHeaderReact from '../../lit-wrappers/SimpleHeaderReact';
import type { StateOverviewTabContentProps } from './StateOverviewTabContentPropts';

const StateOverviewTabContent: React.FC<StateOverviewTabContentProps> = ({
  attractorVisualizerServ,
  attractorVisualizerStatusStore,
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
              ? 'var(--color-red)'
              : 'var(--color-green)'
            : 'var(--color-grey)'
        }
        textFontWeight={isDynamic ? 'bold' : 'normal'}
      />
    );
  };

  const insertState = () => {
    if (!selectedState) {
      Message.showError(
        'Cannot show state overview: Internal Error (No selected state)'
      );
      return;
    }

    const variableNames: string[] | undefined =
      attractorVisualizerServ.getStateVariables();

    if (!variableNames) {
      Message.showError(
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
