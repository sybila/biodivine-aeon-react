import { useMemo } from 'react';
import SearchAndFilterHelpers from '../../../../../services/utilities/SearchAndFilterHelpers/SearchAndFilterHelpers';
import type { ModelEditorItem, Variable } from '../../../../../types';
import SimpleHeaderReact from '../../../lit-wrappers/SimpleHeaderReact';
import type { ModelEditorVariableTableProps } from './ModelEditorVariableTableProps';
import VariableInfo from './VariableInfo/VariableInfo';

const ModelEditorVariableTable: React.FC<ModelEditorVariableTableProps> = ({
  searchText,
  modelEditorServ,
  regulationsStore,
  variablesStore,
  modelEditorStatusStore,
  updateFunctionsStore,
}) => {
  const selectedItemInfo: ModelEditorItem | null = modelEditorStatusStore(
    (state) => state.selectedItemInfo
  );
  const hoverItemInfo: ModelEditorItem | null = modelEditorStatusStore(
    (state) => state.hoverItemInfo
  );

  const hoverVariableId =
    hoverItemInfo?.type === 'variable' ? hoverItemInfo.id : null;
  const selectedVariableId =
    selectedItemInfo?.type === 'variable' ? selectedItemInfo.id : null;

  const hoverRegulation =
    hoverItemInfo?.type === 'regulation' ? hoverItemInfo.regulationIds : null;
  const selectedRegulation =
    selectedItemInfo?.type === 'regulation'
      ? selectedItemInfo.regulationIds
      : null;

  const variablesObj = variablesStore((state) => state.variables);
  const variables = Object.values(variablesObj);

  const filteredVariables = useMemo(() => {
    return SearchAndFilterHelpers.filterVariablesBySearchTerms(
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
          selectedVariable={selectedVariableId === variable.id}
          hoverRegulation={
            hoverRegulation && hoverRegulation.target === variable.id
              ? hoverRegulation
              : undefined
          }
          selectedRegulation={
            selectedRegulation && selectedRegulation.target === variable.id
              ? selectedRegulation
              : undefined
          }
          modelEditorServ={modelEditorServ}
          regulationsStore={regulationsStore}
          variablesStore={variablesStore}
          updateFunctionsStore={updateFunctionsStore}
        />
      ))}
    </section>
  );
};

export default ModelEditorVariableTable;
