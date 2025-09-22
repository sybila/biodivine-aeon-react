import { useMemo, useState } from 'react';
import useResultsStatus from '../../../../stores/ComputationManager/useResultsStatus';
import type { ControlResults } from '../../../../types';
import PerturbationTableRow from './PerturbationTableRow/PerturbationTableRow';

const PerturbationTable: React.FC = () => {
  const [perturbationsAsText, setPerturbationsAsText] = useState(false);

  const perturbations = useResultsStatus((state) =>
    state.type === 'Control' && state.results
      ? (state.results as ControlResults).perturbations
      : []
  );

  /** Table headers for the perturbation table.
   *  [header name, onClick function]
   */
  const tableHeaders: Array<[string, () => void]> = [
    ['Id', () => null],
    ['Perturbation', () => setPerturbationsAsText((prev) => !prev)],
    ['Perturbation Size', () => null],
    ['Number of Interpretations', () => null],
    ['Robustness', () => null],
  ];

  const cellSizes: [string, string, string, string, string] = [
    '5%',
    '50%',
    '15%',
    '15%',
    '15%',
  ];

  const processedPerts = useMemo(
    () =>
      perturbations.map((p, index) => ({
        perturbationId: index + 1,
        numberOfInterpretations: p.color_count,
        robustness: p.robustness,
        perturbationArray: Object.entries(p.perturbation),
      })),
    [perturbations]
  );

  return (
    <section className="flex flex-col justify-center w-[99%] h-fit gap-1 pt-2 pb-2 font-[var(--base-font-family)]">
      <section className="flex flex-row w-full h-[32px] items-center rounded-md bg-gray-100 shadow-sm border-b border-gray-300">
        {tableHeaders.map(([header, handleClick], index) => (
          <div
            key={index}
            onClick={handleClick}
            style={{ width: cellSizes[index] }}
            className={`flex h-fit justify-center-safe px-2 py-1 select-none text-sm font-bold text-gray-800 whitespace-nowrap
              ${
                index === 1
                  ? 'cursor-pointer hover:bg-[var(--color-grey-blue-light)]'
                  : ''
              }`}
          >
            {header}
            {index === 1 && (
              <span className="ml-1 text-blue-600">&#x25BC;</span>
            )}
          </div>
        ))}
      </section>
      <div className="flex flex-col w-full h-[calc(100vh-120px)] overflow-y-auto pb-[55px] font-semibold">
        {processedPerts.map((row) => (
          <PerturbationTableRow
            key={row.perturbationId}
            {...row}
            cellSizes={cellSizes}
            useTextVisualization={perturbationsAsText}
          />
        ))}
      </div>
    </section>
  );
};

export default PerturbationTable;
