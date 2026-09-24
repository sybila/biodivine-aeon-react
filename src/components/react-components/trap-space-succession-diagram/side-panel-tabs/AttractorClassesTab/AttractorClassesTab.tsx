import NoDataText from '../../../global/NoDataText/NoDataText';
import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import AttractorClassesTable from './AttractorClassesTable/AttractorClassesTable';
import type { AttractorClassesTabProps } from './AttractorClassesTabProps';

const AttractorClassesTab: React.FC<AttractorClassesTabProps> = ({
  trapSpaceSDServ,
  generalStringsServ,
  tooltipStringsServ,
  helpHoverStore,
  trapSpaceSDStatusStore,
}) => {
  const selectedItem = trapSpaceSDStatusStore((state) => state.selectedItem);

  if (!selectedItem) {
    return <NoDataText text={generalStringsServ.noSelectedItem()} />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit gap-2">
      <section className="flex flex-col justify-end items-center h-fit w-full gap-2">
        <DotHeaderReact
          compHeight="30px"
          compWidth="100%"
          justifyHeader="start"
          headerText={generalStringsServ.attractorClassesHeader()}
          textColor="var(--color-primary-text)"
        />
      </section>

      <AttractorClassesTable
        selectedItemId={selectedItem.data.id}
        selectedItemType={selectedItem.type}
        trapSpaceSDServ={trapSpaceSDServ}
        generalStringsServ={generalStringsServ}
        tooltipStringsServ={tooltipStringsServ}
        helpHoverStore={helpHoverStore}
        trapSpaceSDStatusStore={trapSpaceSDStatusStore}
      />
    </div>
  );
};

export default AttractorClassesTab;
