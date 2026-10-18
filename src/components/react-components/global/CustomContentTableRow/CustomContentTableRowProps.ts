import type { ReactElement } from 'react';

export type CustomContentTableRowProps = {
  /** Height of the row container. @default "45px" */
  rowHeight?: string;

  /** Width of the row container. @default "100%" */
  rowWidth?: string;

  /** Element placed in the left part of the row (eq. row name, colored words ....) */
  customContent: ReactElement;

  /** If true, then the cursor changes to a pointer when hovered over the row. @default false */
  isSelectable?: boolean;
  /** When true the row is rendered with the “selected” style. @default false */
  isSelected?: boolean;

  /** Callback invoked when the user clicks anywhere on the row. */
  handleClick?: () => void;
  /** Callback invoked when the user places mouse over row. */
  handleMouseEnter?: () => void;
  /** Callback invoked when the cursor leaves area of the row. */
  handleMouseLeave?: () => void;

  /** Function that receives the native mouse event when the user hovers over the name box. */
  nameTooltipFun?: (e: MouseEvent) => void;

  /** Function called when the mouse leaves the name box (typically hides the tooltip). */
  hideTooltipFun?: () => void;

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

  /**Gap between buttons. @default "5px" */
  buttonsGap?: string;
};
