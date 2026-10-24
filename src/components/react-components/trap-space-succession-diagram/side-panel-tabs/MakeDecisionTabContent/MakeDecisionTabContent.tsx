import NoDataText from '../../../global/NoDataText/NoDataText';
import type { MakeDecisionTabContentProps } from './MakeDecisionTabContentProps';
import StableMotifsTable from './StableMotifsTable/StableMotifsTable';
import TrapSpaceTable from './TrapSpaceTable/TrapSpaceTable';

const MakeDecisionTabContent: React.FC<MakeDecisionTabContentProps> = ({
  variableNames,

  trapSpaceSDServ,
  generalStringsServ,
  tooltipStringsServ,
  searchAndFilterHelpersServ,

  trapSpaceSDStatusStore,
  helpHoverStore,
}) => {
  const selectedNode = trapSpaceSDStatusStore((state) => state.selectedItem);

  if (!selectedNode) {
    return <NoDataText text={generalStringsServ.noSelectedNode()} />;
  }

  if (selectedNode.type == 'leaf') {
    return (
      <NoDataText text={generalStringsServ.cannotMakeDecisionOnLeafNode()} />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-2">
      <section className="flex flex-col justify-end items-center h-fit w-full gap-2">
        {selectedNode.type == 'stable-motif' ? (
          <TrapSpaceTable
            selectedNodeId={selectedNode.nodeInfo.id}
            variableNames={variableNames}
            trapSpaceSDServ={trapSpaceSDServ}
            generalStringsServ={generalStringsServ}
            tooltipStringsServ={tooltipStringsServ}
            searchAndFilterHelpersServ={searchAndFilterHelpersServ}
            trapSpaceSDStatusStore={trapSpaceSDStatusStore}
            helpHoverStore={helpHoverStore}
          />
        ) : (
          <StableMotifsTable
            selectedNodeId={selectedNode.nodeInfo.id}
            trapSpaceSDServ={trapSpaceSDServ}
            generalStringsServ={generalStringsServ}
            tooltipStringsServ={tooltipStringsServ}
            trapSpaceSDStatusStore={trapSpaceSDStatusStore}
            helpHoverStore={helpHoverStore}
          />
        )}
      </section>
    </div>
  );
};

export default MakeDecisionTabContent;
