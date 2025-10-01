import DeselectAllIcon from '../../../../assets/icons/deselect_all.svg';
import ToggleSelectionIcon from '../../../../assets/icons/toggle_selection.svg';
import SelectAllIcon from '../../../../assets/icons/select_all.svg';

import type { SelectionButtonsProps } from './SelectionButtonsProps';
import IconButtonReact from '../../lit-wrappers/IconButtonReact';

const SelectionButtons: React.FC<SelectionButtonsProps> = ({
  keys,
  selectedVariables,
  setSelectedVariables,
  buttonBorderRadius = '10px',
  buttonSize = '29px',
}) => {
  const selectAll = () => {
    setSelectedVariables(
      keys.reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, boolean>)
    );
  };

  const toggleSelected = () => {
    setSelectedVariables(
      keys.reduce((acc, key) => {
        if (!selectedVariables[key]) {
          acc[key] = !selectedVariables[key];
        }
        return acc;
      }, {} as Record<string, boolean>)
    );
  };

  const deselectAll = () => {
    setSelectedVariables({});
  };

  /** Array of buttons for changing the selection status of variables.
   * Each button is represented as a tuple containing:
   * - the button icon (string)
   * - The icon alt (string)
   * - The onClick handler function (() => void)
   */
  const statusButtons: Array<[string, string, () => void]> = [
    [DeselectAllIcon, 'D', () => deselectAll()],
    [ToggleSelectionIcon, 'T', () => toggleSelected()],
    [SelectAllIcon, 'S', () => selectAll()],
  ];

  return (
    <div className="flex flex-row gap-2 h-full max-w-[50%] items-center justify-start">
      {statusButtons.map(([icon, alt, onClick], index) => (
        <IconButtonReact
          key={index}
          compHeight={buttonSize}
          compWidth={buttonSize}
          buttonBorderRadius={buttonBorderRadius}
          iconSrc={icon}
          iconAlt={alt}
          iconSize="65%"
          handleClick={onClick}
        />
      ))}
    </div>
  );
};

export default SelectionButtons;
