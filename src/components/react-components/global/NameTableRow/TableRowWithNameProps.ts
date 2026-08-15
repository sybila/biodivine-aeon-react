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

  /** If is true name is editable, if false name appears as non editable text.  @default true*/
  nameIsEditable?: boolean;

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
  /** Callback invoked when the user places mouse over row. */
  handleMouseEnter?: () => void;
  /** Callback invoked when the cursor leaves area of the row. */
  handleMouseLeave?: () => void;

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

  /** Hover override. Can force the element to appear hovered even though its not. @default false */
  hover?: boolean;

  /**
   * Collection of buttons rendered to the right of the name field.
   * If the array is empty or omitted, no button section is rendered.
   */
  buttons?: Array<{
    /** Text shown on the button. */
    text: string;

    /** URL or identifier for the button’s icon. */
    icon: string;

    /** Alt text for the icon (accessibility). */
    iconAlt: string;

    /** Click‑handler for the button. */
    handleClick: () => void;

    /** Background colour of the button (normal state). */
    buttonBgColor: string;

    /** Text colour of the button (normal state). */
    buttonTextColor: string;

    /** Background colour when the button is hovered. */
    buttonHoverColor: string;

    /** Background colour when the button is active / pressed. */
    buttonActiveColor: string;

    /**
     * Function called when the mouse enters the button.
     * Receives the native `MouseEvent` (often used to show a tooltip).
     */
    buttonTooltipFunction: (e: MouseEvent) => void;

    /** Whether the button is currently in an “active” visual state. */
    isActive: boolean;
  }>;

  /** Height of each button in the button strip. @default "100%" */
  buttonHeight?: string;

  /** Width of each button in the button strip. @default "65px" */
  buttonWidth?: string;

  /** Width of the whole button‑section container. @default "40%" */
  buttonSectionWidth?: string;

  /** Height of the whole button‑section container. @default "100%" */
  buttonSectionHeight?: string;
};
