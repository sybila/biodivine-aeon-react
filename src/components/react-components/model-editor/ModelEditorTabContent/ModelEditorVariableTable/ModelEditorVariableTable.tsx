import { useMemo } from 'react';
import type {
  ModelEditorItem,
  ModelEditorItems,
  Variable,
} from '../../../../../types';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import type { ModelEditorVariableTableProps } from './ModelEditorVariableTableProps';
import VariableInfo from './VariableInfo/VariableInfo';

const ModelEditorVariableTable: React.FC<ModelEditorVariableTableProps> = ({
  searchText,
  exposeSetExtend,

  modelEditorServ,
  searchAndFilterHelpersServ,
  stringProviderServ,

  regulationsStore,
  variablesStore,
  modelEditorStatusStore,
  updateFunctionsStore,
  helpHoverStore,
}) => {
  const selectedItemsInfo: ModelEditorItems = modelEditorStatusStore(
    (state) => state.selectedItemsInfo
  );
  const hoverItemInfo: ModelEditorItem | null = modelEditorStatusStore(
    (state) => state.hoverItemInfo
  );

  const hoverVariableId =
    hoverItemInfo?.type === 'variable' ? hoverItemInfo.id : null;

  const hoverRegulation =
    hoverItemInfo?.type === 'regulation' ? hoverItemInfo.regulationIds : null;

  const variablesObj = variablesStore((state) => state.variables);
  const variables = Object.values(variablesObj);

  const filteredVariables = useMemo(() => {
    return searchAndFilterHelpersServ.filterVariablesBySearchTerms(
      variables,
      searchText
    );
  }, [variables, searchText]);

  return !filteredVariables || filteredVariables.length === 0 ? (
    <section className="flex h-[200px] w-[98%] justify-center items-center">
      <SimpleHeaderReact headerText="No Variables" textFontWeight="normal" />
    </section>
  ) : (
    <section className="flex flex-col min-h-[50px] h-auto max-h-[100px] md:max-h-[200px] xl:max-h-[300px] 2xl:max-h-[400px] overflow-auto w-[98%] px-[2%] pb-1 mb-1 gap-1">
      {filteredVariables.map((variable: Variable) => (
        <VariableInfo
          key={variable.id}
          {...variable}
          hoverVariable={
            hoverVariableId !== null && hoverVariableId === variable.id
          }
          selectedVariable={selectedItemsInfo.variables.has(variable.id)}
          hoverRegulation={
            hoverRegulation && hoverRegulation.target === variable.id
              ? hoverRegulation
              : undefined
          }
          selectedRegulatorIds={selectedItemsInfo.regulations[variable.id]}
          exposeSetExtend={exposeSetExtend}
          modelEditorServ={modelEditorServ}
          stringProviderServ={stringProviderServ}
          regulationsStore={regulationsStore}
          variablesStore={variablesStore}
          updateFunctionsStore={updateFunctionsStore}
          helpHoverStore={helpHoverStore}
        />
      ))}
    </section>
  );
};

export default ModelEditorVariableTable;
