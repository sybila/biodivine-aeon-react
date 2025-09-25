import { memo, useMemo, useState } from 'react';
import type { PerturbationTableRowProps } from './PerturbationTableRowProps';
import ControlPerturbationsTable from '../../../../../services/control-perturbations-table/ControlPerturbationsTable';

const PerturbationTableRow: React.FC<PerturbationTableRowProps> = memo(
  ({
    perturbationId,
    numberOfInterpretations,
    robustness,
    perturbation,
    cellSizes,
    useTextVisualization = false,
  }) => {
    const [textVisualization, setTextVisualization] =
      useState<boolean>(useTextVisualization);

    const perturbationArray = useMemo(() => {
      return Object.entries(perturbation);
    }, [perturbation]);

    /** Memoized formatted perturbation in the form of JSX elements [coloredFormat, textFormat] */
    const formatedPerturbation = useMemo(() => {
      return ControlPerturbationsTable.formatPerturbation(perturbationArray);
    }, [perturbationArray]);

    /** Data for each cell inside the row */
    const cells = [
      perturbationId,
      textVisualization || useTextVisualization
        ? formatedPerturbation[1]
        : formatedPerturbation[0],
      perturbationArray.length,
      numberOfInterpretations,
      (robustness * 100).toFixed(2),
    ];

    /** Handles click events for each cell */
    const handleClick = [
      () => null,
      () => setTextVisualization((prev) => !prev),
      () => null,
      () => null,
      () => null,
    ];

    return (
      <section className="flex flex-row w-full h-[32px] items-center rounded-md bg-white hover:bg-blue-50 transition-shadow shadow-sm border-b border-gray-200">
        {cells.map((cell, index) => (
          <div
            key={index}
            onClick={handleClick[index]}
            style={{ width: cellSizes[index] }}
            className="flex h-full justify-center-safe px-2 py-1 overflow-x-auto select-none font-[var(--base-font-family)] text-sm text-gray-700 whitespace-nowrap"
          >
            {cell}
          </div>
        ))}
      </section>
    );
  }
);

export default PerturbationTableRow;
