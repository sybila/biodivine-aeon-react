import { Fragment } from 'react';
import type { VariableStability } from '../../../../../../types/types';
import ExtendableContentReact from '../../../../lit-wrappers/ExtendableContentReact';
import SimpleHeaderReact from '../../../../lit-wrappers/SimpleHeaderReact';
import type { StabilityAnalysisTableRowProps } from './StabilityAnalysisTableRowProps';

const StabilityAnalysisTableRow: React.FC<StabilityAnalysisTableRowProps> = ({
  variable,
  computedBehavior,
  data,

  attractorBifurcationExplorerServ,
  pageStringProviderServ,

  bifurcationExplorerStatusStore,
  helpHoverStore,
}) => {
  const selectedNode = bifurcationExplorerStatusStore(
    (state) => state.selectedNode
  );

  const renderHeaders = () => {
    return (
      <div className="flex flex-row justify-start items-center w-full h-[50px] px-[1%]">
        <div className="flex flex-col justify-center items-center w-[34%] h-full">
          <SimpleHeaderReact
            headerText="Variable"
            textFontSize="17px"
            textColor="var(--color-primary-text)"
          />
          <SimpleHeaderReact
            headerText="Value"
            textFontSize="17px"
            textColor="var(--color-primary-text)"
          />
        </div>

        <div className="flex flex-col justify-center items-center ml-[2%] w-[32%] h-full">
          <SimpleHeaderReact
            headerText="Interpretation"
            textFontSize="17px"
            textColor="var(--color-primary-text)"
          />
          <SimpleHeaderReact
            headerText="Count"
            textFontSize="17px"
            textColor="var(--color-primary-text)"
          />
        </div>
      </div>
    );
  };

  const renderStabilityValues = (values: string[]) => {
    return (
      <div className="flex flex-row items-center justify-center h-full w-[34%] overflow-y-hidden overflow-x-auto gap-1">
        {values.map((item, idx) => {
          let color = 'var(--color-tertiary-text)';
          if (item === 'true') color = 'var(--color-positive)';
          else if (item === 'false') color = 'var(--color-negative)';

          return (
            <Fragment key={idx}>
              <SimpleHeaderReact
                headerText={item}
                textFontWeight="normal"
                textColor={color}
                compHeight="30px"
                lineHeight="30px"
                compWidth="fit-content"
                textFontSize="18px"
              />
              {idx < values.length - 1 ? (
                <SimpleHeaderReact
                  headerText="|"
                  textFontWeight="normal"
                  textColor="var(--color-tertiary-text)"
                  compHeight="30px"
                  lineHeight="30px"
                  compWidth="fit-content"
                  textFontSize="18px"
                />
              ) : null}
            </Fragment>
          );
        })}
      </div>
    );
  };

  const renderInterpretations = (
    numberOfInterpretations: number | undefined
  ) => {
    return (
      <div className="flex flex-row items-center justify-center h-full mx-[2%] w-[32%] overflow-x-auto">
        <SimpleHeaderReact
          compHeight="100%"
          compWidth="fit-content"
          lineHeight="30px"
          textFontSize="18px"
          textFontWeight="normal"
          textColor="var(--color-tertiary-text)"
          headerText={numberOfInterpretations?.toString() ?? 'unknown'}
        />
      </div>
    );
  };

  const renderButtons = (vector: Array<string>) => {
    const buttonsContent: Array<[string, () => void, () => string]> = [
      [
        'Witness',
        () =>
          attractorBifurcationExplorerServ.openStabilityWitness(
            selectedNode?.id ?? null,
            variable,
            computedBehavior,
            vector
          ),
        pageStringProviderServ.Tooltips.openStabilityAnalysisWitness,
      ],
      [
        'Attractor',
        () =>
          attractorBifurcationExplorerServ.openStabilityAttractor(
            selectedNode?.id ?? null,
            variable,
            computedBehavior,
            vector
          ),
        pageStringProviderServ.Tooltips.openStabilityAnalysisAttractor,
      ],
    ];

    return (
      <div className="flex flex-row h-full w-[28%] items-center justify-center gap-2">
        {buttonsContent.map(
          ([text, onClick, tooltipTextProviderFunction], index) => (
            <span
              key={index}
              className="decoration-solid underline cursor-pointer"
              style={{ color: 'var(--color-tertiary-text)' }}
              onClick={onClick}
              onMouseEnter={(e: React.MouseEvent) => {
                helpHoverStore
                  .getState()
                  .setHelpHoverAtMouse(
                    e.nativeEvent,
                    tooltipTextProviderFunction(),
                    true,
                    -50
                  );
                (e.currentTarget as HTMLSpanElement).style.color =
                  'var(--color-tertiary-buttons-hover-darker)';
              }}
              onMouseLeave={(e: React.MouseEvent) => {
                helpHoverStore.getState().clear();
                (e.currentTarget as HTMLSpanElement).style.color =
                  'var(--color-tertiary-text)';
              }}
            >
              {text}
            </span>
          )
        )}
      </div>
    );
  };

  return (
    <ExtendableContentReact
      contWidth="100%"
      topContentOverflowX="visible"
      topContentOverflowY="visible"
      contColor="var(--color-secondary-light)"
      contHoverColor='var(--color-secondary-light-highlight)'
      contBorder="2px var(--color-secondary-light) solid"
      contHoverBorder="2px var(--color-secondary-border) dashed"
      buttonColor="var(--color-tertiary-buttons)"
      buttonHoverColor="var(--color-tertiary-buttons-hover)"
    >
      <SimpleHeaderReact
        compHeight="20px"
        compWidth="100%"
        headerText={variable}
        textColor="var(--color-secondary-text)"
        slot="top-content"
      />
      <div
        className="flex flex-col items-start justify-start w-full max-h-[155px] overflow-auto gap-1"
        slot="extended-content"
      >
        {renderHeaders()}
        {data.map((stabilityData: VariableStability, index) => (
          <section
            key={index}
            className="flex flex-row items-center justify-start h-[30px] w-full bg-(--color-tertiary-light) px-[1%]"
          >
            {renderStabilityValues(stabilityData.vector ?? [])}
            {renderInterpretations(stabilityData.colors)}
            {renderButtons(stabilityData.vector)}
          </section>
        ))}{' '}
      </div>
    </ExtendableContentReact>
  );
};

export default StabilityAnalysisTableRow;
