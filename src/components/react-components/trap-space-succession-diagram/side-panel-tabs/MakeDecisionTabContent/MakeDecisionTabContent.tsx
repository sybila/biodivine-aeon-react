import type { NodeDataTSSD, StableMotifInfo } from '../../../../../types/types';
import NoDataText from '../../../global/NoDataText/NoDataText';
import DecisionTable from './DecisionTable/DecisionTable';
import type { MakeDecisionTabContentProps } from './MakeDecisionTabContentProps';
import StableMotifRow from './StableMotifRow/StableMotifRow';
import TrapSpaceRow from './TrapSpaceRow/TrapSpaceRow';

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
        {selectedNode.type != 'stable-motif' ? (
          <DecisionTable<StableMotifInfo>
            selectedNodeId={selectedNode.nodeInfo.id}
            variableNames={variableNames}
            parentType={selectedNode.type}
            trapSpaceSDServ={trapSpaceSDServ}
            generalStringsServ={generalStringsServ}
            tooltipStringsServ={tooltipStringsServ}
            searchAndFilterHelpersServ={searchAndFilterHelpersServ}
            trapSpaceSDStatusStore={trapSpaceSDStatusStore}
            helpHoverStore={helpHoverStore}
            renderRow={(stableMotif: StableMotifInfo, key: number) => (
              <StableMotifRow
                key={key}
                nodeId={selectedNode.nodeInfo.id}
                stableMotifData={stableMotif}
                trapSpaceSDServ={trapSpaceSDServ}
                generalStringsServ={generalStringsServ}
                tooltipStringsServ={tooltipStringsServ}
                helpHoverStore={helpHoverStore}
              />
            )}
          />
        ) : (
          <DecisionTable<NodeDataTSSD>
            selectedNodeId={selectedNode.nodeInfo.id}
            variableNames={variableNames}
            parentType={selectedNode.type}
            trapSpaceSDServ={trapSpaceSDServ}
            generalStringsServ={generalStringsServ}
            tooltipStringsServ={tooltipStringsServ}
            searchAndFilterHelpersServ={searchAndFilterHelpersServ}
            trapSpaceSDStatusStore={trapSpaceSDStatusStore}
            helpHoverStore={helpHoverStore}
            renderRow={(trapSpace: NodeDataTSSD, key: number) => (
              <TrapSpaceRow
                key={key}
                nodeId={selectedNode.nodeInfo.id}
                trapSpaceData={trapSpace}
                trapSpaceSDServ={trapSpaceSDServ}
                generalStringsServ={generalStringsServ}
                tooltipStringsServ={tooltipStringsServ}
                helpHoverStore={helpHoverStore}
              />
            )}
          />
        )}
      </section>
    </div>
  );
};

export default MakeDecisionTabContent;
