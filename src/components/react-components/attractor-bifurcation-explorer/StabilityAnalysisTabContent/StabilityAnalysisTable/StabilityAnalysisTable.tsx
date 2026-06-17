import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import type { StabilityAnalysisTableProps } from './StabilityAnalysisTableProps';
import StabilityAnalysisTableRow from './StabilityAnalysisTableRow/StabilityAnalysisTableRow';

const StabilityAnalysisTable: React.FC<StabilityAnalysisTableProps> = ({
  attractorBifurcationExplorerServ,
  pageStringProviderServ,

  bifurcationExplorerStatusStore,
  helpHoverStore,
}) => {
  const stabilityResults = bifurcationExplorerStatusStore(
    (state) => state.stabilityData
  );

  const renderNoResults = () => {
    return (
      <div className="max-h-[100px] h-[100px] md:max-h-[150px] md:h-[150px] w-full flex justify-center items-center">
        <SimpleHeaderReact
          headerText="No Computed Data"
          textFontWeight="normal"
        />
      </div>
    );
  };

  const renderTable = () => {
    return (
      <section className="flex flex-col w-full max-h-[100px] md:max-h-[200px] xl:max-h-[300px] 2xl:max-h-[400px] gap-2 overflow-y-auto">
        {stabilityResults?.stabilityAnalysis.map(
          (variableStabilityData, index) => (
            <StabilityAnalysisTableRow
              key={index}
              {...variableStabilityData}
              computedBehavior={stabilityResults.computedBehavior}
              attractorBifurcationExplorerServ={
                attractorBifurcationExplorerServ
              }
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
        compHeight="30px"
        compWidth="100%"
        justifyHeader="start"
      />
      {!stabilityResults ? renderNoResults() : renderTable()}
    </div>
  );
};

export default StabilityAnalysisTable;
