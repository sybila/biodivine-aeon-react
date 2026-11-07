import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import type { StabilityAnalysisTableProps } from './StabilityAnalysisTableProps';
import StabilityAnalysisTableRow from './StabilityAnalysisTableRow/StabilityAnalysisTableRow';

const StabilityAnalysisTable: React.FC<StabilityAnalysisTableProps> = ({
  maxTableHeight,
  minTableHeight,
  tableWidth,

  attractorBifurcationExplorerServ,
  messageServ,
  pageStringProviderServ,

  bifurcationExplorerStatusStore,
  helpHoverStore,
}) => {
  const stabilityResults = bifurcationExplorerStatusStore(
    (state) => state.stabilityData
  );

  const renderNoResults = () => {
    return (
      <div className="h-[100px] w-full flex justify-center items-center">
        <SimpleHeaderReact
          headerText="No Computed Data"
          textColor="var(--color-primary-text)"
          textFontWeight="normal"
        />
      </div>
    );
  };

  const renderTable = () => {
    return (
      <section
        className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden p-1.5"
        style={{
          maxHeight: maxTableHeight,
          height: 'auto',
          minHeight: minTableHeight,
          width: tableWidth,
        }}
      >
        {stabilityResults?.stabilityAnalysis.map(
          (variableStabilityData, index) => (
            <StabilityAnalysisTableRow
              key={index}
              {...variableStabilityData}
              computedBehavior={stabilityResults.computedBehavior}
              attractorBifurcationExplorerServ={
                attractorBifurcationExplorerServ
              }
              messageServ={messageServ}
              pageStringProviderServ={pageStringProviderServ}
              bifurcationExplorerStatusStore={bifurcationExplorerStatusStore}
              helpHoverStore={helpHoverStore}
            />
          )
        )}
      </section>
    );
  };

  return (
    <div className="h-fit w-full flex flex-col justify-center items-start gap-1">
      <DotHeaderReact
        headerText="Stability Analysis Results"
        textColor="var(--color-primary-text)"
        compHeight="30px"
        compWidth="100%"
        justifyHeader="start"
      />
      {!stabilityResults ? renderNoResults() : renderTable()}
    </div>
  );
};

export default StabilityAnalysisTable;
