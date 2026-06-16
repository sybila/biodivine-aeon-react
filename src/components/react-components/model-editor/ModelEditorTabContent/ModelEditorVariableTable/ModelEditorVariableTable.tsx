import { useEffect, useMemo, useRef } from 'react';
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
  pageStringProviderServ,

  regulationsStore,
  variablesStore,
  modelEditorStatusStore,
  updateFunctionsStore,
  helpHoverStore,
}) => {
  const scrollToVariableId = modelEditorStatusStore(
    (state) => state.scrollToVariable
  );

  const VariableListRef = useRef<HTMLDivElement>(null);
  const variableInfoRefs = useRef<Record<number, HTMLElement | null>>({});

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

  useEffect(() => {
    if (scrollToVariableId == null) return;

    const container = VariableListRef.current;
    const element = variableInfoRefs.current[scrollToVariableId];

    if (container && element) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const top =
        container.scrollTop +
        (elementRect.top - containerRect.top) -
        container.clientHeight / 2 +
        element.clientHeight / 2;

      container.scrollTo({
        top: Math.max(0, top),
        behavior: 'smooth',
      });
    }

    modelEditorStatusStore.getState().clearScrollToVariable();
  }, [scrollToVariableId, filteredVariables, modelEditorStatusStore]);

  return !filteredVariables || filteredVariables.length === 0 ? (
    <section className="flex h-[200px] w-[98%] justify-center items-center">
      <SimpleHeaderReact headerText="No Variables" textFontWeight="normal" />
    </section>
  ) : (
    <section
      ref={VariableListRef}
      className="flex flex-col min-h-[50px] h-auto max-h-[100px] md:max-h-[200px] xl:max-h-[300px] 2xl:max-h-[400px] overflow-auto w-[98%] px-[2%] pb-1 mb-1 gap-1"
    >
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
          setVariableInfoRef={(id: number, element: HTMLElement | null) => {
            variableInfoRefs.current[id] = element;
          }}
          modelEditorServ={modelEditorServ}
          pageStringProviderServ={pageStringProviderServ}
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
