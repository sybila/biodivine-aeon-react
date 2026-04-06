import type { NodeDataTSSD } from '../../../../types';
import NoDataText from '../../global/NoDataText/NoDataText';
import type { OverviewTabContentProps } from './OverviewTabContentProp';

const OverviewTabContent: React.FC<OverviewTabContentProps> = ({
  trapSpaceSDStatusStore,
}) => {
  const selectedNode: NodeDataTSSD | null = trapSpaceSDStatusStore(
    (state) => state.selectedNode
  );

  console.log('Rendering OverviewTabContent. Selected node: ', selectedNode);
  console.log('Selected node data: ', selectedNode?.variableValues );

  if (!selectedNode) {
    return <NoDataText text="No selected node" />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-2">
      <span className="flex flex-row justify-center h-[30px] w-full text-[30px] font-normal font-[Symbols] overflow-hidden mb-[-10px]">
        {Object.entries(selectedNode.variableValues).map(([key, value]) => (
          <span key={key} className="mx-1">
            {key}: {value ?? '*'}
          </span>
        ))}
      </span>
    </div>
  );
};

export default OverviewTabContent;
