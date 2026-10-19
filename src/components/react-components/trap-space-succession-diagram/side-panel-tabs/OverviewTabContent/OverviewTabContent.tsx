import NoDataText from '../../../global/NoDataText/NoDataText';
import StableMotifOverview from './StableMotifOverview/StableMotifOverview';
import TrapSpaceOverview from './TrapSpaceOverview/TrapSpaceOverview';
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
      {selectedItem.type === 'trap-space-decision' ||
      selectedItem.type === 'leaf' ? (
        <TrapSpaceOverview
          trapSpace={selectedItem.nodeInfo}
          generalStringsServ={generalStringsServ}
        />
      ) : selectedItem.type === 'stable-motif' ? (
        <StableMotifOverview
          stableMotif={selectedItem.nodeInfo}
          generalStringsServ={generalStringsServ}
        />
      ) : null}
    </div>
  );
};

export default OverviewTabContent;
