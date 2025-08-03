import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import type { AttractorResultsTableProps } from './AttractorResultsTableProps';
import AttractorResultsTableRow from './AttractorResultsTableRow/AttractorResultsTableRow';

const AttractorResultsTable: React.FC<AttractorResultsTableProps> = ({
  results,
}) => {
  return (
    <section className="flex flex-col h-fit w-[600px] items-start justify-center gap-1">
      <div className="flex flex-row justify-end h-fit w-full">
        <SimpleHeaderReact
          headerText="Attractor Results"
          compWidth="calc(100% - 24px)"
        />

        <section>
          {results?.data.map((result, index) => (
            <AttractorResultsTableRow
              key={index}
              interpretationCount={result.sat_count}
              behaviorClassList={result.phenotype}
            />
          ))}
        </section>
      </div>
    </section>
  );
};

export default AttractorResultsTable;
