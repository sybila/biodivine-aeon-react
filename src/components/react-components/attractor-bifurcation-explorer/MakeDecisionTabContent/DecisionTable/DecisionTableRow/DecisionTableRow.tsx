import type { DecisionBehaviorClass } from '../../../../../../types';
import BehaviorClassLegend from '../../../../global/BehaviorClassLegend/BehaviorClassLegend';
import SeparatorLine from '../../../../global/SeparatorLine/SeparatorLine';
import DotHeaderReact from '../../../../lit-wrappers/DotHeaderReact';
import ExtendableContentReact from '../../../../lit-wrappers/ExtendableContentReact';
import SimpleHeaderReact from '../../../../lit-wrappers/SimpleHeaderReact';
import StatEntryReact from '../../../../lit-wrappers/StatEntryReact';
import TextButtonReact from '../../../../lit-wrappers/TextButtonReact';
import type { DecisionTableRowProps } from './DecisionTableRowProps';

const DecisionTableRow: React.FC<DecisionTableRowProps> = ({
  decision,
  nodeId,
  nodeCardinality,

  attractorBifurcationExplorerServ,
  behaviorClassOperationsServ,
  pageStringProviderServ,

  helpHoverStore,
}) => {
  const renderTopSection = () => {
    return (
      <section
        className="flex flex-col justify-between items-center h-full w-full gap-[3px] overflow-auto"
        slot="top-content"
      >
        <div className="w-[97%] min-h-[25px] max-h-[50px] px-[1%] overflow-auto">
          <SimpleHeaderReact
            headerText={decision.name ?? 'unknown'}
            compHeight="fit-content"
            compWidth="100%"
            lineHeight="25px"
            textFontSize="20px"
            alignHeader="start"
            textColor="var(--color-secondary-text)"
          />
        </div>

        <div className="flex flex-col justify-between items-center h-[45px] w-[97%]">
          <StatEntryReact
            compWidth="100%"
            statName="Information Gain"
            statValue={`${decision.gain.toFixed(2)}`}
            contBgColor="var(--color-tertiary)"
            textColor="var(--color-tertiary-text)"
          />
          <StatEntryReact
            compWidth="100%"
            statName="Total Classes"
            contBgColor="var(--color-tertiary)"
            textColor="var(--color-tertiary-text)"
            statValue={`${decision.left.length + decision.right.length}`}
          />
        </div>

        <TextButtonReact
          className="mb-[7px]"
          text="Select Decision"
          compHeight="30px"
          compWidth="97%"
          textColor="var(--color-tertiary-text)"
          buttonColor="var(--color-tertiary-buttons)"
          buttonHoverColor="var(--color-tertiary-buttons-hover)"
          handleClick={() => {
            helpHoverStore.getState().clear();
            attractorBifurcationExplorerServ.makeDecision(nodeId, decision.id);
          }}
          onMouseEnter={(e: React.MouseEvent) =>
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e.nativeEvent,
                pageStringProviderServ.Tooltips.selectDecisionButton(),
                true,
                -50
              )
          }
          onMouseLeave={() => helpHoverStore.getState().clear()}
        />
      </section>
    );
  };

  const getInterpretationPercentage = (
    classSideCardinality: number | undefined,
    classSideArray: Array<DecisionBehaviorClass>
  ): number => {
    const classCardinalityFixed =
      classSideCardinality ??
      classSideArray.reduce((a, b) => a + b.cardinality, 0.0);

    return attractorBifurcationExplorerServ.mathPercent(
      classCardinalityFixed,
      nodeCardinality
    );
  };

  const renderClasses = (
    classes: Array<DecisionBehaviorClass>,
    sideTotal: number | undefined
  ) => {
    const fixedTotal =
      sideTotal ?? classes.reduce((a, b) => a + b.cardinality, 0.0);
    return (
      <section className="flex flex-col h-fit w-1/2 items-center gap-1">
        {classes.map((classItem, index) => (
          <div
            key={index}
            className="flex flex-row justify-between items-center h-[20px] w-[98%] px-2 bg-(--color-tertiary)  rounded-md select-none"
          >
            <span className="h-fit max-w-1/2 overflow-auto font-[Symbols] text-[16px] mb-[-8px] text-(--color-tertiary-text)">
              {behaviorClassOperationsServ.normalizeClasses(
                undefined,
                classItem.class
              ) ?? 'unknown'}
            </span>
            <span className="h-fit max-w-1/2 overflow-auto font-(family-name:--font-family-fira-mono) text-[15px] text-(--color-tertiary-text)">
              {`${attractorBifurcationExplorerServ.mathPercent(
                classItem.cardinality,
                fixedTotal
              )}%`}
            </span>
          </div>
        ))}
      </section>
    );
  };

  const renderBottomSection = () => {
    return (
      <section
        slot="extended-content"
        className="flex flex-col justify-start items-center h-full max-h-full w-full gap-2 overflow-auto"
      >
        <SeparatorLine width={'96%'} />
        <div className="h-[20%] w-full flex flex-col justify-between items-center">
          <DotHeaderReact
            headerText="Number of Classes"
            compHeight="20px"
            compWidth="100%"
            justifyHeader="start"
            lineHeight="19px"
            textFontSize="16px"
            textColor="var(--color-secondary-text)"
          />
          <StatEntryReact
            compHeight="20px"
            compWidth="95%"
            statName="Negative"
            statValue={`${decision.left.length ?? 'unknown'}`}
            contBgColor="var(--color-tertiary)"
            textColor="var(--color-tertiary-text)"
          />
          <StatEntryReact
            compHeight="20px"
            compWidth="95%"
            statName="Positive"
            statValue={`${decision.right.length ?? 'unknown'}`}
            contBgColor="var(--color-tertiary)"
            textColor="var(--color-tertiary-text)"
          />
        </div>

        <div className="h-[20%] w-full flex flex-col justify-between items-center gap-0.5">
          <DotHeaderReact
            headerText="Percentage of Node Interpretations"
            compHeight="20px"
            compWidth="100%"
            justifyHeader="start"
            lineHeight="19px"
            textFontSize="16px"
            textColor="var(--color-secondary-text)"
          />
          <StatEntryReact
            compHeight="20px"
            compWidth="95%"
            statName="Negative"
            statValue={`${getInterpretationPercentage(
              decision.leftTotal,
              decision.left
            )}%`}
            contBgColor="var(--color-tertiary)"
            textColor="var(--color-tertiary-text)"
          />
          <StatEntryReact
            compHeight="20px"
            compWidth="95%"
            statName="Positive"
            statValue={`${getInterpretationPercentage(
              decision.rightTotal,
              decision.right
            )}%`}
            contBgColor="var(--color-tertiary)"
            textColor="var(--color-tertiary-text)"
          />
        </div>

        <div className="flex flex-row justify-center items-center h-fit w-full px-[1%]">
          <SimpleHeaderReact
            compHeight="100%"
            compWidth="50%"
            textFontSize="18px"
            lineHeight="21px"
            headerText="Negative"
            textColor="var(--color-secondary-text)"
          />
          <SimpleHeaderReact
            compHeight="100%"
            compWidth="50%"
            textFontSize="18px"
            lineHeight="21px"
            headerText="Positive"
            textColor="var(--color-secondary-text)"
          />
        </div>

        <div className="flex flex-row w-full h-[29%] overflow-auto">
          {renderClasses(decision.left, decision.leftTotal)}
          {renderClasses(decision.right, decision.rightTotal)}
        </div>
        <BehaviorClassLegend height="5%" textColor='var(--color-tertiary-text)' />
      </section>
    );
  };

  return (
    <ExtendableContentReact
      contWidth="100%"
      topHeight="140px"
      topContentHeight="140px"
      topBottomGap="5px"
      extendContentHeight="350px"
      contColor="var(--color-secondary-light)"
      contHoverColor='var(--color-secondary-light-highlight)'
      contBorder="2px var(--color-secondary-light) solid"
      contHoverBorder="2px var(--color-secondary-border) dashed"
      buttonColor="var(--color-tertiary-buttons)"
      buttonHoverColor="var(--color-tertiary-buttons-hover)"
    >
      {renderTopSection()}
      {renderBottomSection()}
    </ExtendableContentReact>
  );
};

export default DecisionTableRow;
