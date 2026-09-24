import NoDataText from '../../../global/NoDataText/NoDataText';
import EdgeOverview from './EdgeOverview/EdgeOverview';
import NodeOverview from './NodeOverview/NodeOverview';
import type { OverviewTabContentProps } from './OverviewTabContentProp';

const OverviewTabContent: React.FC<OverviewTabContentProps> = ({
  generalStringsServ,

  trapSpaceSDStatusStore,
}) => {
  const selectedItem = trapSpaceSDStatusStore((state) => state.selectedItem);

  if (!selectedItem) {
    return <NoDataText text={generalStringsServ.noSelectedItem()} />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-2 pb-1">
      {selectedItem.type === 'node' ? (
        <NodeOverview
          selectedNode={selectedItem.data}
          generalStringsServ={generalStringsServ}
        />
      ) : selectedItem.type === 'edge' ? (
        <EdgeOverview
          selectedEdge={selectedItem.data}
          generalStringsServ={generalStringsServ}
        />
      ) : null}
    </div>
  );
};

export default OverviewTabContent;
