import useBifurcationExplorerStatus from '../../../../../stores/AttractorBifurcationExplorer/useBifurcationExplorerStatus';
import TextIconButtonReact from '../../../lit-wrappers/TextIconButtonReact';

import PlusIcon from '../../../../../assets/icons/add_box.svg';

const DecisionTable = () => {
  const decisions = useBifurcationExplorerStatus(
    (state) => state.availableDecisions
  );

  if (!decisions) {
    return (
      <TextIconButtonReact
        className='mb-2'
        compWidth='95%'
        text="Get Decisions"
        iconAlt="Plus Icon"
        iconSrc={PlusIcon}
      />
    );
  }

  const renderTable = () => {
    return (
      <>
        {decisions?.map((decision, index) => (
          <div> Todo </div>
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

export default DecisionTable;
