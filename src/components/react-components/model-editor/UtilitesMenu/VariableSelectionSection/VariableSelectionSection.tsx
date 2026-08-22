import type { ModelEditorVariable } from '../../../../../types/types';
import SectionWithDotHeader from '../../../global/SectionWithDotHeader/SectionWithDotHeader';
import SelectionButtons from '../../../global/SelectionButtons/SelectionButtons';
import type { VariableSelectionSectionProps } from './VariableSelectionSectionProps';

const VariableSelectionSection: React.FC<VariableSelectionSectionProps> = ({
  variableIds,

  modelVisualizationServ,
  loadingServ,
  pageStringProviderServ,

  modelEditorStatusStore,
  helpHoverStore,
}) => {
  const selectedItems = modelEditorStatusStore(
    (state) => state.selectedItemsInfo
  );

  const selectedVariableIds = selectedItems.variables;

  const updateSelectedVariables = (newSelected: Set<number>) => {
    loadingServ.startLoading();

    modelEditorStatusStore.getState().clearSelectedItemsInfo();
    modelVisualizationServ.unselectAll();

    newSelected.forEach((variableId) => {
      const variable: ModelEditorVariable = {
        type: 'variable',
        id: variableId,
      };

      modelEditorStatusStore.getState().addSelectedItemInfo(variable);
      modelVisualizationServ.selectNode(variableId);
    });

    loadingServ.endLoading();
  };

  return (
    <SectionWithDotHeader text="Variable Selection">
      <SelectionButtons
        componentHeight="fit-content"
        buttonGap='30px'
        buttonSize="33px"
        buttonColor="var(--color-secondary-buttons)"
        buttonHoverColor="var(--color-secondary-buttons-hover)"
        keys={variableIds}
        selectedVariables={selectedVariableIds}
        setSelectedVariables={(selectedVariables) => {
          updateSelectedVariables(selectedVariables);
        }}
        tooltips={pageStringProviderServ.Tooltips}
        helpHoverStore={helpHoverStore}
      />
    </SectionWithDotHeader>
  );
};

export default VariableSelectionSection;
