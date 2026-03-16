import { useMemo, useState } from 'react';
import { PertVariableFilterStatus } from '../../../../../types';
import SelectionButtons from '../../../global/SelectionButtons/SelectionButtons';
import TextButtonReact from '../../../lit-wrappers/TextButtonReact';
import TextInputReact from '../../../lit-wrappers/TextInputReact';
import type { SelectVarFilterTableProps } from './SelectVarFilterTableProps';
import SelectVarFilterTableRow from './SelectVarFilterTableRow/SelectVarFilterTableRow';

const SelectVarFilterTable: React.FC<SelectVarFilterTableProps> = ({
  variableNames,

  searchAndFilterHelpersServ,
  loadingServ,

  perturbationFilterSortStore,
}) => {
  const [selectedVariables, setSelectedVariables] = useState<
    Record<string, boolean>
  >({});

  const [searchText, setSearchText] = useState('');

  const filterVariables = perturbationFilterSortStore(
    (state) => state.perturbationVariables
  );

  const toggleVariableSelect = (variableName: string) => {
    loadingServ.startLoading();
    setSelectedVariables((prev) => ({
      ...prev,
      [variableName]: !prev[variableName],
    }));
    loadingServ.endLoading();
  };

  const changeSelectedFilterStat = (
    newStatus: PertVariableFilterStatus | null
  ) => {
    loadingServ.startLoading();
    const newFilterVariables = { ...filterVariables };

    variableNames.forEach((name) => {
      if (selectedVariables[name]) {
        if (newStatus === null) {
          delete newFilterVariables[name];
        } else {
          newFilterVariables[name] = newStatus;
        }
      }
    });

    perturbationFilterSortStore
      .getState()
      .setPerturbationVariables(newFilterVariables);
    loadingServ.endLoading();
  };

  /** Array of buttons for changing the filter status of selected variables.
   * Each button is represented as a tuple containing:
   * - The button label (string)
   * - The button color (string)
   * - The onClick handler function (() => void)
   */
  const statusButtons: Array<[string, string, () => void]> = [
    ['N', 'var(--color-grey)', () => changeSelectedFilterStat(null)],
    [
      'P',
      'var(--color-violet)',
      () =>
        changeSelectedFilterStat(PertVariableFilterStatus.IN_FILTER_PERTURBED),
    ],
    [
      'T',
      'var(--color-green)',
      () =>
        changeSelectedFilterStat(
          PertVariableFilterStatus.IN_FILTER_POSITIVELY_PERTURBED
        ),
    ],
    [
      'F',
      'var(--color-red)',
      () =>
        changeSelectedFilterStat(
          PertVariableFilterStatus.IN_FILTER_NEGATIVELY_PERTURBED
        ),
    ],
  ];

  const filteredVariableNames = useMemo(() => {
    return searchAndFilterHelpersServ.filterStringsBySearchTerms(
      variableNames,
      searchText
    );
  }, [searchText, variableNames]);

  return (
    <div className="h-fit w-[95%] flex flex-col justify-start items-center gap-2">
      <section className="h-[30px] w-full flex flex-row justify-between items-center px-2">
        <div className="flex flex-row gap-2 h-full max-w-[50%] items-center justify-start">
          {statusButtons.map(([label, color, onClick], index) => (
            <TextButtonReact
              key={index}
              compHeight="29px"
              compWidth="29px"
              text={label}
              handleClick={onClick}
              buttonColor={color}
            />
          ))}
        </div>

        <SelectionButtons
          keys={variableNames}
          selectedVariables={selectedVariables}
          setSelectedVariables={setSelectedVariables}
        />
      </section>

      <TextInputReact
        compWidth="100%"
        placeholder="Search Control Enabled variables..."
        onWrite={(value) => setSearchText(value)}
      />

      <section className="h-[150px] w-full overflow-y-auto overflow-x-hidden">
        {filteredVariableNames.map((name) => (
          <SelectVarFilterTableRow
            key={name}
            varName={name}
            isSelected={!!selectedVariables[name]}
            toggleSelect={toggleVariableSelect}
            pertStatus={filterVariables[name]}
          />
        ))}
      </section>
    </div>
  );
};

export default SelectVarFilterTable;
