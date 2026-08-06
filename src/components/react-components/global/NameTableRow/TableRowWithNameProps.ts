export type TableRowWithNameProps = {
  /** Height of the row container. @default "45px" */
  rowHeight?: string;

  /** Width of the row container. @default "100%" */
  rowWidth?: string;

  /** Current name value shown in the editable input. @default "" */
  name?: string;

  /** Height of the name‑box that wraps the input. @default "100%" */
  nameHeight?: string;

  /** Width of the name‑box that wraps the input. @default "40%" */
  nameWidth?: string;

  /**
   * Text colour for the name value.
   * This prop is required because the original component always supplied a colour.
   */
  nameTextColor: string;

  /** Background colour of the name box. @default "transparent" */
  nameBgcolor?: string;

  /** Border colour of the name box. @default "transparent" */
  nameBorderColor?: string;

  /** When true the row is rendered with the “selected” style. @default false */
  isSelected?: boolean;

  /** Callback invoked when the user clicks anywhere on the row. */
  handleClick?: () => void;

  /**
   * Called on every **onChange** (each keystroke) of the inner input.
   * Return the new name if the change is accepted, or `undefined` if it should be rejected.
   */
  handleNameChange?: (newName: string) => string | undefined;

  /**
   * Called when the user finalises the edit (onSubmit / press Enter).
   * Same contract as `handleNameChange`.
   */
  handleNameSubmit?: (newName: string) => string | undefined;

  /** Function that receives the native mouse event when the user hovers over the name box. */
  nameTooltipFun?: (e: MouseEvent) => void;

  /** Function called when the mouse leaves the name box (typically hides the tooltip). */
  hideTooltipFun?: () => void;

  /** If true, toggles an internal key on value changes to force a remount of the input.
   *  @default false */
  rerenderOnNameUpdate?: boolean;

  /** Background colour of the content container. */
  contColor: string;

  /** Background colour when the mouse hovers the container. */
  contHoverColor: string;

  /** Background colour when the container is in the active (selected) state. */
  contActiveColor: string;

  /** Border color for the active state. */
  contActiveBorderColor: string;

  /** Border color when the mouse hovers the container. */
  contHoverBorderColor: string;

  /** Normal border color. */
  contBorderColor: string;

  buttons?: Array<{
    text: string;
    icon: string;
    iconAlt: string;
    handleClick: () => void;
    buttonBgColor: string;
    buttonTextColor: string;
    buttonHoverColor: string;
    buttonActiveColor: string;
    buttonTooltipFunction: (e: MouseEvent) => void;
    isActive: boolean;
  }>;
  buttonHeight?: string;
  buttonWidth?: string;
  buttonSectionWidth?: string;
  buttonSectionHeight?: string;
};
