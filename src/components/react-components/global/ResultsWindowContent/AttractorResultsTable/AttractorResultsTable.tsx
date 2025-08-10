import DotHeaderReact from '../../../lit-wrappers/DotHeaderReact';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import StatEntryReact from '../../../lit-wrappers/StatEntryReact';
import TextIconButtonReact from '../../../lit-wrappers/TextIconButtonReact';
import type { AttractorResultsTableProps } from './AttractorResultsTableProps';
import AttractorResultsTableRow from './AttractorResultsTableRow/AttractorResultsTableRow';

import SplitIcon from '../../../../../assets/icons/split_icon.svg';
import { useNavigate } from '@tanstack/react-router';
import useTabsStore from '../../../../../stores/Navigation/useTabsStore';

const AttractorResultsTable: React.FC<AttractorResultsTableProps> = ({
  results,
}) => {
  const navigate = useNavigate();
  const openAttractorBifurcationExplorer = () => {
    navigate({
      to: '/attractor-bifurcation-explorer',
    });

    useTabsStore
      .getState()
      .addTab(
        'attractor-bifurcation-explorer',
        'Attractor Bifurcation Explorer'
      );
  };

  const renderStats = () => {
    return (
      <section className="flex flex-col justify-end items-center h-fit w-full gap-3">
        <DotHeaderReact
          className="bg-[var(--color-secondary)] rounded-md"
          compHeight="30px"
          compWidth="100%"
          justifyHeader="start"
          headerText="Statistics"
        />
        <div className="flex flex-col justify-between items-center w-[95%] h-[45px]">
          <StatEntryReact
            compWidth="100%"
            statName="Elapsed"
            statValue={`${results?.elapsed}s`}
          />
          <StatEntryReact
            compWidth="100%"
            statName="Number of Classes"
            statValue={results?.data.length.toString()}
          />
        </div>
      </section>
    );
  };

  const renderTable = () => {
    return (
      <section className="flex flex-col w-full h-fit items-center justify-center gap-2">
        <div className="flex flex-row justify-start items-center w-full h-[50px]">
          <div className="flex flex-col justify-center items-center w-[30%] h-full">
            <SimpleHeaderReact headerText="Behavior" />
            <SimpleHeaderReact headerText="Class" />
          </div>

          <div className="flex flex-col justify-center items-center ml-[5%] w-[30%] h-full">
            <SimpleHeaderReact headerText="Interpretation" />
            <SimpleHeaderReact headerText="Count" />
          </div>
        </div>

        <section className="flex flex-col w-full h-fit max-h-[100px] 2xl:max-h-[250px] items-center justify-center gap-2 overflow-auto">
          {results?.data.map((result, index) => (
            <AttractorResultsTableRow
              key={index}
              interpretationCount={result.sat_count}
              behaviorClassList={result.phenotype}
            />
          ))}
        </section>
      </section>
    );
  };

  return (
    <section className="flex flex-col h-fit w-[600px] items-center justify-start gap-2">
      <div className="flex flex-row justify-end h-fit w-full">
        <SimpleHeaderReact
          headerText="Attractor Results"
          compWidth="calc(100% - 24px)"
          textFontSize="25px"
          textFontFamily="var(--font-family-fira-mono)"
        />
      </div>

      <div className="h-[2px] w-[94%] mt-2 mb-2 bg-gray-300" />

      <div className="flex flex-col items-center justify-start w-[95%] h-fit gap-3">
        {renderStats()}

        <div className="h-[2px] w-[95%] mt-2 mb-2 bg-gray-300" />

        {renderTable()}

        <div className="flex flex-row justify-center items-center w-full h-[30px] font-[var(--base-font-family] text-sm gap-2">
          <span className="font-[Symbols] mb-[-10px]">D</span> disorder |{' '}
          <span className="font-[Symbols] mb-[-10px]">O</span> oscillation |{' '}
          <span className="font-[Symbols] mb-[-10px]">S</span> stability
        </div>

        <TextIconButtonReact
          className="mb-2"
          compWidth="100%"
          buttonJustifyContent="center"
          textContainerWidth="65%"
          text="Explore Bifurcation Function"
          iconAlt="Bifurcation"
          iconSrc={SplitIcon}
          handleClick={openAttractorBifurcationExplorer}
        />
      </div>
    </section>
  );
};

export default AttractorResultsTable;
