import AttractorBifurcationExplorer from '../../../../../services/attractor-bifurcation-explorer/AttractorBifurcationExplorer./AttractorBifurcationExplorer';
import type { DecisionMixedNode, LeafNode } from '../../../../../types';
import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import StatEntryReact from '../../../lit-wrappers/StatEntryReact';

const NodeStatTable: React.FC<LeafNode | DecisionMixedNode> = (nodeData) => {
  const totalCardinality = AttractorBifurcationExplorer.getTotalCardinality();

  return (
    <section className="flex flex-col justify-end items-center h-fit w-full gap-1">
      <DotHeaderReact
        compHeight="30px"
        compWidth="100%"
        justifyHeader="start"
        headerText="Statistics"
      />
      <div className="flex flex-col justify-between items-center w-[95%] min-h-[22px] max-h-[90px] gap-1">
        <StatEntryReact
          compWidth="100%"
          statName="Node Type"
          statValue={
            nodeData.type === 'unprocessed'
              ? 'mixed'
              : nodeData.type === 'leaf'
              ? 'phenotype'
              : nodeData.type ?? 'unknown'
          }
        />
        {nodeData.classes ? (
          <StatEntryReact
            compWidth="100%"
            statName="Number of Classes"
            statValue={nodeData.classes.length.toString() ?? 'unknown'}
          />
        ) : null}

        {nodeData.type === 'leaf' ? (
          <>
            <StatEntryReact
              compWidth="100%"
              statName="Number of Interpretations"
              nameWidth="fit-content"
              nameMaxWidth="fit-content"
              nameJustify="start"
              valueWidth="fit-content"
              valueMaxWidth="40%"
              valueJustify="end"
              valNameGap="2%"
              statValue={nodeData.cardinality.toString() ?? 'unknown'}
            />

            <StatEntryReact
              compWidth="100%"
              statName="Distribution"
              statValue={
                !totalCardinality || !nodeData.cardinality
                  ? 'unknown'
                  : `${AttractorBifurcationExplorer.mathPercent(
                      nodeData.cardinality,
                      totalCardinality
                    ).toString()}% / ${AttractorBifurcationExplorer.mathDimPercent(
                      nodeData.cardinality,
                      totalCardinality
                    ).toString()}%`
              }
            />
          </>
        ) : null}
      </div>
    </section>
  );
};

export default NodeStatTable;
