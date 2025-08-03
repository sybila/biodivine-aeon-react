import SimpleHeaderReact from '../../../../lit-wrappers/SimpleHeaderReact';
import TextButtonReact from '../../../../lit-wrappers/TextButtonReact';
import type { AttractorResultsTableRowProps } from './AttractorResultsTableRowProps';

const AttractorResultsTableRow: React.FC<AttractorResultsTableRowProps> = ({
  interpretationCount,
  behaviorClassList,
}) => {
  return (
    <section className="flex flex-row">
      <SimpleHeaderReact
        headerText={
          !behaviorClassList || behaviorClassList.length === 0
            ? 'unclassified'
            : behaviorClassList.join(', ')
        }
      />
      <SimpleHeaderReact
        headerText={
          !interpretationCount ? 'unknown' : interpretationCount.toString()
        }
      />

      <TextButtonReact text="Possible Interpretation" />
      <TextButtonReact text="Attractor" />
    </section>
  );
};

export default AttractorResultsTableRow;
