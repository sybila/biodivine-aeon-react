import { useState } from 'react';
import TextIconButtonReact from '../../../../lit-wrappers/TextIconButtonReact';
import type { StableMotifsTableProps } from './StableMotifsTableProps';

import PlusIcon from '../../../../../../assets/icons/add_box.svg';
import StableMotifRow from './StableMotifRow/StableMotifRow';

const StableMotifsTable: React.FC<StableMotifsTableProps> = ({
  selectedNodeId,

  trapSpaceSDServ,
  generalStringsServ,
  tooltipStringsServ,

  trapSpaceSDStatusStore,
  helpHoverStore,
}) => {
  const [motifsOpened, setMotifsOpened] = useState(false);
  const stableMotifs = trapSpaceSDStatusStore(
    (state) => state.availableDecisions
  );

  if (!motifsOpened || !stableMotifs) {
    return (
      <TextIconButtonReact
        className="mb-2"
        compWidth="95%"
        text={generalStringsServ.getDecisionsButton()}
        textColor="var(--color-secondary-text)"
        buttonColor="var(--color-secondary-buttons)"
        buttonHoverColor="var(--color-secondary-buttons-hover)"
        iconAlt="Plus Icon"
        iconSrc={PlusIcon}
        handleClick={() => {
          if (!stableMotifs) {
            trapSpaceSDServ.getDecisions(selectedNodeId);
          }
          setMotifsOpened(true);
          helpHoverStore.getState().clear();
        }}
        onMouseEnter={(e: React.MouseEvent) =>
          helpHoverStore
            .getState()
            .setHelpHoverAtMouse(
              e.nativeEvent,
              tooltipStringsServ.getDecisionsButton(),
              true,
              -50
            )
        }
        onMouseLeave={() => helpHoverStore.getState().clear()}
      />
    );
  }

  const renderTable = () => {
    return (
      <>
        {stableMotifs?.map((stableMotif, index) => (
          <StableMotifRow
            key={index}
            nodeId={selectedNodeId}
            stableMotifData={stableMotif}
            trapSpaceSDServ={trapSpaceSDServ}
            generalStringsServ={generalStringsServ}
            tooltipStringsServ={tooltipStringsServ}
            helpHoverStore={helpHoverStore}
          />
        ))}
      </>
    );
  };

  return (
    <section className="flex flex-col w-full max-h-[100px] md:max-h-[200px] xl:max-h-[300px] 2xl:max-h-[400px] gap-2 overflow-y-auto">
      {renderTable()}
    </section>
  );
};

export default StableMotifsTable;
