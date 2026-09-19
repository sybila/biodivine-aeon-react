import type { NodeDataTSSD } from '../../../../types/types';
import NoDataText from '../../global/NoDataText/NoDataText';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import type { MakeDecisionTabContentProps } from './MakeDecisionTabContentProps';
import StableMotifsTable from './StableMotifsTable/StableMotifsTable';

const MakeDecisionTabContent: React.FC<MakeDecisionTabContentProps> = ({
  trapSpaceSDServ,
  generalStringsServ,
  tooltipStringsServ,

  trapSpaceSDStatusStore,
  helpHoverStore,
}) => {
  const selectedNode: NodeDataTSSD | null = trapSpaceSDStatusStore(
    (state) => state.selectedNode
  );

  if (!selectedNode) {
    return <NoDataText text={generalStringsServ.noSelectedNode()} />;
  }

  if (selectedNode.type != 'decision') {
    return (
      <NoDataText
        text={generalStringsServ.cannotMakeDecisionOnLeafNode()}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-2">
      <section className="flex flex-col justify-end items-center h-fit w-full gap-2">
        <DotHeaderReact
          compHeight="30px"
          compWidth="100%"
          justifyHeader="start"
          headerText="Decisions"
          textColor="var(--color-primary-text)"
        />

        <StableMotifsTable
          selectedNodeId={selectedNode.id}
          trapSpaceSDServ={trapSpaceSDServ}
          generalStringsServ={generalStringsServ}
          tooltipStringsServ={tooltipStringsServ}
          trapSpaceSDStatusStore={trapSpaceSDStatusStore}
          helpHoverStore={helpHoverStore}
        />
      </section>
    </div>
  );

  return;
};

export default MakeDecisionTabContent;
