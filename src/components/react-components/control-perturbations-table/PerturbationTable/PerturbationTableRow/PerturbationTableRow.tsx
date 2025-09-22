import { memo, useMemo, useState, type JSX } from 'react';
import type { PerturbationTableRowProps } from './PerturbationTableRowProps';

const PerturbationTableRow: React.FC<PerturbationTableRowProps> = memo(
  ({
    perturbationId,
    numberOfInterpretations,
    robustness,
    perturbationArray,
    cellSizes,
    useTextVisualization = false,
  }) => {
    const [textVisualization, setTextVisualization] =
      useState<boolean>(useTextVisualization);

    /** Formats perturbation array into tuple of two JSX element.
     *  On index 0 the element contains perturbation variables colored (green for positive, red for negative),
     *  on index 1 the element contains perturbation variables and their values in text (VariableName: true, VariableName2: false).
     *  Each tuple represents one variable in the perturbation.
     */
    const formatPerturbation = () => {
      if (perturbationArray.length === 0) {
        return [
          <span className="flex flex-row h-full w-fit text-black">
            {'{ }'}
          </span>,
          <span className="flex flex-row h-full w-fit text-black">
            No Perturbation
          </span>,
        ];
      }

      const coloredPerturbation: Array<JSX.Element> = [];
      const textPerturbation: Array<JSX.Element> = [];

      perturbationArray.forEach(([key, value], index) => {
        coloredPerturbation.push(
          <div key={key} className="flex flex-row h-full w-fit">
            <span
              style={{
                color: `${
                  value > 0 ? 'var(--color-green)' : 'var(--color-red)'
                }`,
              }}
            >
              {key}
            </span>
            {index < perturbationArray.length - 1 && <span>,</span>}
          </div>
        );

        textPerturbation.push(
          <div key={key} className="flex flex-row h-full w-fit">
            <span className="">{`${key}: ${
              value > 0 ? 'true' : 'false'
            }`}</span>
            {index < perturbationArray.length - 1 && <span>,</span>}
          </div>
        );
      });

      return [
        <div className="flex flex-row h-full w-fit gap-1">
          {coloredPerturbation}
        </div>,
        <div className="flex flex-row h-full w-fit gap-1 text-black">
          {textPerturbation}
        </div>,
      ];
    };

    const formatedPerturbation = useMemo(() => {
      return formatPerturbation();
    }, [perturbationArray]);

    const cells = [
      perturbationId,
      textVisualization || useTextVisualization
        ? formatedPerturbation[1]
        : formatedPerturbation[0],
      perturbationArray.length,
      numberOfInterpretations,
      robustness.toFixed(2),
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
