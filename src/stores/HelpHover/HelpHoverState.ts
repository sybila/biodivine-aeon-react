import type { Position } from '../../types/types';

/** Zustand store for managing the help hover in the application. */
export type HelpHoverState = {
  /**
   * Coordinates for the help hover, or null if the hover is hidden.
   * x (index 0) is the horizontal offset in pixels from the viewport left.
   * y (index 1) is the vertical offset in pixels from the viewport top.
   */
  position: Position | null;
  /** The current content to be displayed in the help hover.
   * If null, the help hover is hidden.
   */
  helpText: string | null;
  /** Defines whether the help hover should be styled as a tooltip.
   */
  isTooltip: boolean;
  /** Set the help hover state. The hover will be positioned at the center of the event target element.
   *  @param event (MouseEvent) - event to get the position from
   *  @param helpText (string) - text to be displayed in the help hover
   *  @param isTooltip (boolean) - whether the hover should be styled as a tooltip
   *  @param adjustTop (number, optional) - additional vertical offset in pixels to adjust the hover position
   *  @param adjustLeft (number, optional) - additional horizontal offset in pixels to adjust the hover position
   */
  setHelpHoverAtElementCenter(
    event: MouseEvent,
    helpText: string,
    isTooltip: boolean,
    adjustTop?: number,
    adjustLeft?: number
  ): void;

  /** Set the help hover state. The hover will be positioned relatively to the mouse position.
   *  @param event (MouseEvent) - event to get the position from
   *  @param helpText (string) - text to be displayed in the help hover
   *  @param isTooltip (boolean) - whether the hover should be styled as a tooltip
   *  @param adjustTop (number, optional) - additional vertical offset in pixels to adjust the hover position
   *  @param adjustLeft (number, optional) - additional horizontal offset in pixels to adjust the hover position
   */
  setHelpHoverAtMouse(
    event: MouseEvent,
    helpText: string,
    isTooltip: boolean,
    adjustTop?: number,
    adjustLeft?: number
  ): void;

  /** Change the text displayed in the help hover.
   *  @param helpText (string) - text to be displayed in the help hover
   */
  setHelpHoverText(helpText: string): void;

  clear: () => void;
};
