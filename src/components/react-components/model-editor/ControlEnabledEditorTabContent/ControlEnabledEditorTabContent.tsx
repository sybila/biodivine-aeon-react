import { useMemo, type ReactNode } from 'react';
import type {
  ModelEditorVariable,
  Variable,
  VariableIdSet,
} from '../../../../types';
import TableRowWithName from '../../global/NameTableRow/TableRowWithName';
import SearchTable from '../../global/SearchTable/SearchTable';
import DotHeaderReact from '../../lit-wrappers/DotHeaderReact';
import type { ControlEnabledEditorTabContentProps } from './ControlEnabledEditorTabContentProps';
import ControlEnabledStatsTable from './ControlEnabledStatsTable/ControlEnabledStatsTable';

import ContrIcon from '../../../../assets/icons/control-enabled-button.svg';

const ControlEnabledEditorTabContent: React.FC<
  ControlEnabledEditorTabContentProps
> = ({
  controlEnabledEditorServ,
  searchAndFilterHelpersServ,
  pageStringProviderServ,
  loadingServ,

  controlStore,
  variablesStore,
  modelEditorStatusStore,
  helpHoverStore,
}) => {
  const controlEnabledStatuses: Record<number, boolean> = controlStore(
    (state) => state.controlEnabled
  );

  const selectedVariablesIds: VariableIdSet =
    modelEditorStatusStore((state) => state.selectedItemsInfo.variables) ??
    new Set();

  const variablesObj = variablesStore((state) => state.variables);

  const variables = Object.values(variablesObj);

  const variableIds = useMemo(() => {
    return variables
      .map((variable) => variable.id ?? -1)
      .filter((id) => id !== -1);
  }, [variables]);

  const hoverVariableId = modelEditorStatusStore((state) =>
    state.hoverItemInfo?.type === 'variable' ? state.hoverItemInfo.id : null
  );

  const toggleVariableSelect = (variableId: number) => {
    loadingServ.startLoading();

    const variable: ModelEditorVariable = { type: 'variable', id: variableId };

    if (selectedVariablesIds.has(variableId)) {
      modelEditorStatusStore.getState().removeSelectedItemInfo(variable);
      controlEnabledEditorServ.selectVariableVisualization(variableId, false);
    } else {
      modelEditorStatusStore.getState().addSelectedItemInfo(variable);
      controlEnabledEditorServ.selectVariableVisualization(variableId, true);
    }

    loadingServ.endLoading();
  };

  const updateSelectedVariables = (newSelected: Set<number>) => {
    loadingServ.startLoading();

    modelEditorStatusStore.getState().clearSelectedItemsInfo();
    controlEnabledEditorServ.unselectAllVisualization();

    newSelected.forEach((variableId) => {
      const variable: ModelEditorVariable = {
        type: 'variable',
        id: variableId,
      };

      modelEditorStatusStore.getState().addSelectedItemInfo(variable);
      controlEnabledEditorServ.selectVariableVisualization(variableId, true);
    });

    loadingServ.endLoading();
  };

  const getControlButtonColor = (varId: number, hover: boolean) => {
    switch (controlEnabledStatuses[varId] ?? false) {
      case false:
        return hover
          ? 'var(--color-not-control-enabled-highlight)'
          : 'var(--color-not-control-enabled)';
      default:
        return hover
          ? 'var(--color-control-enabled-highlight)'
          : 'var(--color-control-enabled)';
    }
  };

  const getNextControlStatus = (current: boolean) => {
    return !current;
  };

  return (
    <div className="flex flex-col items-center w-full h-fit gap-3">
      <section className="flex flex-col items-center w-full h-fit gap-3">
        <DotHeaderReact
          textColor="var(--color-primary-text)"
          headerText="Control Statistics"
          compWidth="100%"
          justifyHeader="start"
        />
        <ControlEnabledStatsTable controlStore={controlStore} />
      </section>

      <section className="flex flex-row items-around w-full h-fit gap-1">
        <DotHeaderReact
          textColor="var(--color-primary-text)"
          compWidth="50%"
          headerText="Variables"
          justifyHeader="start"
        />
      </section>
      <SearchTable<Variable>
        elements={variables}
        noRowsPlaceholder={'No Variables'}
        noRowsTextColor="var(--color-primary-text"
        getSearchText={() => controlEnabledEditorServ.getVariableSearch()}
        setSearchText={(newText: string) =>
          controlEnabledEditorServ.setVariableSearch(newText)
        }
        searchPlaceholder={'Search variables...'}
        filterElements={(
          elements: Variable[],
          searchTerm: string
        ): Variable[] => {
          return searchAndFilterHelpersServ.filterVariablesBySearchTerms(
            elements,
            searchTerm
          );
        }}
        textInputTextColor="var(--color-secondary-text)"
        textInputColor="var(--color-secondary-text-inputs)"
        textInputBorderColor="var(--color-secondary-text-inputs-border)"
        buttons={[
          {
            text: 'N',
            handleClick: () =>
              controlEnabledEditorServ.changeControlEnabledSelected(
                selectedVariablesIds,
                false
              ),
            buttonBgColor: 'var(--color-not-control-enabled)',
            buttonHoverColor: 'var(--color-not-control-enabled-highlight)',
            buttonTooltipFunction: (e: MouseEvent) =>
              helpHoverStore
                .getState()
                .setHelpHoverAtMouse(
                  e,
                  pageStringProviderServ.Tooltips.changeVariableControlEnabled(
                    false
                  ),
                  true,
                  -50,
                  200
                ),
          },
          {
            text: 'E',
            handleClick: () =>
              controlEnabledEditorServ.changeControlEnabledSelected(
                selectedVariablesIds,
                true
              ),
            buttonBgColor: 'var(--color-control-enabled)',
            buttonHoverColor: 'var(--color-control-enabled-highlight)',
            buttonTooltipFunction: (e: MouseEvent) =>
              helpHoverStore
                .getState()
                .setHelpHoverAtMouse(
                  e,
                  pageStringProviderServ.Tooltips.changeVariableControlEnabled(
                    true
                  ),
                  true,
                  -50,
                  150
                ),
          },
        ]}
        selectionButtonsConfig={{
          buttonColor: 'var(--color-secondary-buttons)',
          buttonHoverColor: 'var(--color-secondary-buttons-hover)',
          selectedElementsIds: selectedVariablesIds,
          setSelectedElements: (newSelectedElements) => {
            updateSelectedVariables(newSelectedElements);
          },
          allElementIds: variableIds,
          selectionButtonsTooltips: pageStringProviderServ.Tooltips,
          helpHoverStore: helpHoverStore,
        }}
        renderRowsWithContainer={(variables: Variable[]): ReactNode => {
          return (
            <section className="flex flex-col min-h-[50px] h-auto max-h-[152px] md:max-h-[252px] xl:max-h-[352px] 2xl:max-h-[452px] overflow-auto w-[98%] px-[2%] pb-1 mb-1 gap-1">
              {variables.map(
                (variable: Variable) => {
                  const isVariableControlEnabled =
                    controlStore
                      .getState()
                      .getVariableControlEnabled(variable.id) ?? false;

                  return (
                    <TableRowWithName
                      key={variable.id}
                      name={variable.name}
                      nameWidth="80%"
                      nameIsEditable={false}
                      handleClick={() => toggleVariableSelect(variable.id)}
                      isSelected={selectedVariablesIds.has(variable.id)}
                      rowHeight="40px"
                      buttonSectionHeight="100%"
                      buttonHeight="21px"
                      nameTextColor="var(--color-secondary-text)"
                      contColor="var(--color-secondary-light)"
                      contHoverColor="var(--color-secondary-light-highlight)"
                      contActiveColor="var(--color-secondary-active)"
                      contActiveBorderColor="var(--color-secondary-border)"
                      contHoverBorderColor="var(--color-secondary-border)"
                      contBorderColor="var(--color-secondary-light)"
                      hideTooltipFun={() => helpHoverStore.getState().clear()}
                      hover={hoverVariableId === variable.id}
                      handleMouseEnter={() =>
                        controlEnabledEditorServ.hoverVariableVisualization(
                          variable.id,
                          true
                        )
                      }
                      handleMouseLeave={() =>
                        controlEnabledEditorServ.hoverVariableVisualization(
                          variable.id,
                          false
                        )
                      }
                      buttons={[
                        {
                          text: 'CE',
                          icon: ContrIcon,
                          handleClick: () => {
                            controlEnabledEditorServ.toggleControlEnabled(
                              variable.id
                            );
                            helpHoverStore
                              .getState()
                              .setHelpHoverText(
                                pageStringProviderServ.Tooltips.currentControlEnabled(
                                  getNextControlStatus(isVariableControlEnabled)
                                )
                              );
                          },
                          iconAlt: 'Control-Enabled Icon',
                          buttonTextColor:
                            'var(--color-control-enabled-status-text)',
                          buttonBgColor: getControlButtonColor(
                            variable.id,
                            false
                          ),
                          buttonHoverColor: getControlButtonColor(
                            variable.id,
                            true
                          ),
                          buttonActiveColor: 'var(--color-not-control-enabled)',
                          buttonTooltipFunction: (e: MouseEvent) =>
                            helpHoverStore
                              .getState()
                              .setHelpHoverAtMouse(
                                e,
                                pageStringProviderServ.Tooltips.currentControlEnabled(
                                  isVariableControlEnabled
                                ),
                                true,
                                -50
                              ),
                          isActive: false,
                        },
                      ]}
                    />
                  );
                }
                // <VariableControlEnabledInfo
                //   key={variable.id}
                //   id={variable.id}
                //   name={variable.name ?? 'Unknown Variable'}
                //   hover={hoverVariableId === variable.id}
                //   selected={selectedVariablesIds.has(variable.id) ?? false}
                //   toggleSelect={toggleVariableSelect}
                //   controlEnabledEditorServ={controlEnabledEditorServ}
                //   pageStringProviderServ={pageStringProviderServ}
                //   controlStore={controlStore}
                //   helpHoverStore={helpHoverStore}
                // />
              )}
            </section>
          );
        }}
        hideTooltipFunction={() => helpHoverStore.getState().clear()}
      />
    </div>
  );
};

export default ControlEnabledEditorTabContent;
