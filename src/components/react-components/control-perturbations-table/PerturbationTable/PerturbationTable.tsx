import { useEffect, useMemo, useState } from 'react';
import { type ControlResults } from '../../../../types';
import type { PerturbationTableProps } from './PerturbationTableProps';
import PerturbationTableRow from './PerturbationTableRow/PerturbationTableRow';

const PerturbationTable: React.FC<PerturbationTableProps> = ({
  startFilter,
  startSort,
  setNextPageExists,

  controlPerturbationsTableServ,
  pageStringProviderServ,
  dataFormatersServ,
  loadingServ,

  resultsStatusStore,
  helpHoverStore,
}) => {
  const [perturbationsAsText, setPerturbationsAsText] = useState(false);

  const perturbations = resultsStatusStore((state) =>
    state.results.Control != undefined
      ? (state.results.Control as ControlResults).perturbations
      : undefined
  );

  const sortedPerts = useMemo(() => {
    if (!perturbations) {
      return null;
    }

    loadingServ.startLoading();
    const result =
      controlPerturbationsTableServ.sortPerturbations(perturbations);
    loadingServ.endLoading();
    return result;
  }, [perturbations, startSort]);

  const [filteredPerts, nextPageExists] = useMemo(() => {
    if (!sortedPerts) {
      return [null, null];
    }

    loadingServ.startLoading();
    const result =
      controlPerturbationsTableServ.filterPerturbations(sortedPerts);
    loadingServ.endLoading();
    return result;
  }, [sortedPerts, startFilter]);

  useEffect(() => {
    if (!nextPageExists) {
      return;
    }

    setNextPageExists(nextPageExists);
  }, [nextPageExists, setNextPageExists]);

  if (!perturbations) {
    return null;
  }

  /** Table headers for the perturbation table.
   *  [header name, onClick function]
   */
  const tableHeaders: Array<[string, () => void, () => string, number]> = [
    ['Id', () => null, pageStringProviderServ.Tooltips.idHeader, 100],
    [
      'Perturbation',
      () => setPerturbationsAsText((prev) => !prev),
      pageStringProviderServ.Tooltips.perturbationHeader,
      0,
    ],
    [
      'Perturbation Size',
      () => null,
      pageStringProviderServ.Tooltips.perturbationSizeHeader,
      0,
    ],
    [
      'Number of Interpretations',
      () => null,
      pageStringProviderServ.Tooltips.numberOfInterpretationHeader,
      0,
    ],
    [
      'Robustness (%)',
      () => null,
      pageStringProviderServ.Tooltips.robustnessHeader,
      -150,
    ],
  ];

  const cellSizes: [string, string, string, string, string] = [
    '5%',
    '50%',
    '15%',
    '15%',
    '15%',
  ];

  return (
    <section className="flex flex-col justify-center w-[99%] h-fit gap-1 pt-2 pb-2 font-[var(--base-font-family)]">
      <section className="flex flex-row w-full h-[32px] items-center rounded-md bg-gray-100 shadow-sm border-b border-gray-300">
        {tableHeaders.map(
          (
            [
              header,
              handleClick,
              tooltipStringProviderFunction,
              adjustTooltipLeft,
            ],
            index
          ) => (
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
              onMouseEnter={(e: React.MouseEvent) =>
                helpHoverStore
                  .getState()
                  .setHelpHoverAtMouse(
                    e.nativeEvent,
                    tooltipStringProviderFunction(),
                    true,
                    -50,
                    adjustTooltipLeft
                  )
              }
              onMouseLeave={() => helpHoverStore.getState().clear()}
            >
              {header}
              {index === 1 && (
                <span className="ml-1 text-[var(--color-grey)]">&#x25BC;</span>
              )}
            </div>
          )
        )}
      </section>
      <div className="flex flex-col w-full h-[calc(100vh-120px)] overflow-y-auto pb-[55px] font-semibold">
        {filteredPerts != null
          ? filteredPerts.map((row) => (
              <PerturbationTableRow
                key={row.id}
                perturbationId={row.id}
                numberOfInterpretations={row.color_count}
                robustness={row.robustness}
                perturbation={row.perturbation}
                cellSizes={cellSizes}
                useTextVisualization={perturbationsAsText}
                controlPerturbationsTableServ={controlPerturbationsTableServ}
                dataFormatersServ={dataFormatersServ}
              />
            ))
          : null}
      </div>
    </section>
  );
};

export default PerturbationTable;
