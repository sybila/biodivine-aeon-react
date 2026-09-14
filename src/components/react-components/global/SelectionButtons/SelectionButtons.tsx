import DeselectAllIcon from '../../../../assets/icons/deselect_all.svg';
import SelectAllIcon from '../../../../assets/icons/select_all.svg';
import ToggleSelectionIcon from '../../../../assets/icons/toggle_selection.svg';

import IconButtonReact from '../../lit-wrappers/IconButtonReact';
import type { SelectionButtonsProps } from './SelectionButtonsProps';

function SelectionButtons<T extends string | number>({
  keys,
  selectedVariables,
  setSelectedVariables,
  buttonBorderRadius = '10px',
  buttonSize = '29px',
  buttonGap = '8px',
  buttonColor = 'var(--color-secondary-buttons)',
  buttonHoverColor = 'var(--color-secondary-buttons-hover)',
  componentHeight = '100%',
  componentWidth = 'fit-content',
  tooltips,
  helpHoverStore,
}: SelectionButtonsProps<T>) {
  const selectAll = () => {
    setSelectedVariables(
      keys.reduce((acc, key) => {
        acc.add(key);
        return acc;
      }, new Set<T>())
    );
  };

  const toggleSelected = () => {
    setSelectedVariables(
      keys.reduce((acc, key) => {
        if (!selectedVariables.has(key)) {
          acc.add(key);
        }
        return acc;
      }, new Set<T>())
    );
  };

  const deselectAll = () => {
    setSelectedVariables(new Set());
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
            tooltips.deselectAllVariables(),
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
            tooltips.toggleSelectedVariables(),
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
            tooltips.selectAllVariables(),
            true,
            -50
          ),
    ],
  ];

  return (
    <div
      className="flex flex-row items-center justify-start"
      style={{ height: componentHeight, width: componentWidth, gap: buttonGap }}
    >
      {statusButtons.map(([icon, alt, onClick, onMouseEnter], index) => (
        <IconButtonReact
          key={index}
          compHeight={buttonSize}
          compWidth={buttonSize}
          buttonColor={buttonColor}
          buttonHoverColor={buttonHoverColor}
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
}

export default SelectionButtons;
