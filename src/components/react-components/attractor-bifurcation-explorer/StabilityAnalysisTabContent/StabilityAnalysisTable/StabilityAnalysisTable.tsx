import useBifurcationExplorerStatus from '../../../../../stores/AttractorBifurcationExplorer/useBifurcationExplorerStatus';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import StabilityAnalysisTableRow from './StabilityAnalysisTableRow/StabilityAnalysisTableRow';

const StabilityAnalysisTable = () => {
  const stabilityResults = useBifurcationExplorerStatus(
    (state) => state.stabilityData
  );

  if (!stabilityResults) {
    return (
      <div className="h-[200px] w-full flex justify-center items-center">
        <SimpleHeaderReact
          headerText="No Computed Data"
          textFontWeight="normal"
        />
      </div>
    );
  }
  const renderTable = () => {
    return (
      <section className="flex flex-col w-full h-fit items-center justify-center gap-2">
        <div className="flex flex-row justify-start items-center w-full h-[50px]">
          <div className="flex flex-col justify-center items-center w-[30%] h-full">
            <SimpleHeaderReact headerText="Variable" />
            <SimpleHeaderReact headerText="Value" />
          </div>

          <div className="flex flex-col justify-center items-center ml-[5%] w-[30%] h-full">
            <SimpleHeaderReact headerText="Interpretation" />
            <SimpleHeaderReact headerText="Count" />
          </div>
        </div>

        <section className="flex flex-col w-full h-fit max-h-[100px] md:max-h-[200px] xl:max-h-[300px] 2xl:max-h-[400px] items-center justify-center gap-2 overflow-auto">
          {stabilityResults.map((variableStabilityData, index) => (
            <StabilityAnalysisTableRow key={index} {...variableStabilityData} />
          ))}
        </section>
      </section>
    );
  };

  return (
    <div>
      <h2>Stability Analysis Results</h2>
      {renderTable()}
    </div>
  );
};

export default StabilityAnalysisTable;
