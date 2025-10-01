import { memo, useMemo, useState } from 'react';
import type { PerturbationTableRowProps } from './PerturbationTableRowProps';
import ControlPerturbationsTable from '../../../../../services/control-perturbations-table/ControlPerturbationsTable';
import DataFormaters from '../../../../../services/utilities/DataFormaters';

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
      DataFormaters.convertRobustnessToPercentage(robustness),
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
      <section className="flex flex-row min-h-[32px] max-h-[45px] w-full items-center rounded-md bg-white hover:bg-blue-50 transition-shadow shadow-sm border-b border-gray-200">
        {cells.map((cell, index) => (
          <div
            key={index}
            onClick={handleClick[index]}
            style={{ width: cellSizes[index] }}
            className="flex min-h-[25px] max-h-[45px] justify-center-safe px-2 py-1 overflow-x-auto overflow-y-hidden select-none font-[var(--base-font-family)] text-sm text-gray-700 whitespace-nowrap"
          >
            {cell}
          </div>
        ))}
      </section>
    );
  }
);

export default PerturbationTableRow;
