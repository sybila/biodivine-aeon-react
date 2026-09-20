import NoDataText from '../../global/NoDataText/NoDataText';
import NodeOverview from './NodeOverview/NodeOverview';
import type { OverviewTabContentProps } from './OverviewTabContentProp';

const OverviewTabContent: React.FC<OverviewTabContentProps> = ({
  trapSpaceSDStatusStore,
}) => {
  const selectedItem = trapSpaceSDStatusStore((state) => state.selectedItem);

  if (!selectedItem) {
    return <NoDataText text="No selected item." />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-2 pb-1">
      {selectedItem.type === 'node' ? (
        <NodeOverview selectedNode={selectedItem.data} />
      ) : null}
    </div>
  );
};

export default OverviewTabContent;
