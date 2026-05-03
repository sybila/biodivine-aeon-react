import DeselectAllIcon from '../../../../assets/icons/deselect_all.svg';
import SelectAllIcon from '../../../../assets/icons/select_all.svg';
import ToggleSelectionIcon from '../../../../assets/icons/toggle_selection.svg';

import IconButtonReact from '../../lit-wrappers/IconButtonReact';
import type { SelectionButtonsProps } from './SelectionButtonsProps';

const SelectionButtons: React.FC<SelectionButtonsProps> = ({
  keys,
  selectedVariables,
  setSelectedVariables,
  buttonBorderRadius = '10px',
  buttonSize = '29px',

  stringProviderServ,

  helpHoverStore,
}) => {
  const selectAll = () => {
    setSelectedVariables(
      keys.reduce(
        (acc, key) => {
          acc[key] = true;
          return acc;
        },
        {} as Record<string, boolean>
      )
    );
  };

  const toggleSelected = () => {
    setSelectedVariables(
      keys.reduce(
        (acc, key) => {
          if (!selectedVariables[key]) {
            acc[key] = !selectedVariables[key];
          }
          return acc;
        },
        {} as Record<string, boolean>
      )
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
  const statusButtons: Array<
    [string, string, () => void, (e: React.MouseEvent) => void]
  > = [
    [
      DeselectAllIcon,
      'D',
      () => deselectAll(),
      (e: React.MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e.nativeEvent,
            stringProviderServ.ToolTips.GlobalTooltips.deselectAllVariables(),
            true,
            -50
          ),
    ],
    [
      ToggleSelectionIcon,
      'T',
      () => toggleSelected(),
      (e: React.MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e.nativeEvent,
            stringProviderServ.ToolTips.GlobalTooltips.toggleSelectedVariables(),
            true,
            -50
          ),
    ],
    [
      SelectAllIcon,
      'S',
      () => selectAll(),
      (e: React.MouseEvent) =>
        helpHoverStore
          .getState()
          .setHelpHoverAtMouse(
            e.nativeEvent,
            stringProviderServ.ToolTips.GlobalTooltips.selectAllVariables(),
            true,
            -50
          ),
    ],
  ];

  return (
    <div className="flex flex-row gap-2 h-full max-w-[50%] items-center justify-start">
      {statusButtons.map(([icon, alt, onClick, onMouseEnter], index) => (
        <IconButtonReact
          key={index}
          compHeight={buttonSize}
          compWidth={buttonSize}
          buttonBorderRadius={buttonBorderRadius}
          iconSrc={icon}
          iconAlt={alt}
          iconSize="65%"
          handleClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={() => helpHoverStore.getState().clear()}
        />
      ))}
    </div>
  );
};

export default SelectionButtons;
