/** Zustand store for managing the help hover in the application. */
export type HelpHoverState = {
  /**
   * Coordinates for the help hover, or null if the hover is hidden.
   * x is the horizontal offset in pixels from the viewport left.
   * y is the vertical offset in pixels from the viewport top.
   */
  position: { x: number; y: number } | null;
  /** The current content to be displayed in the help hover.
   * If null, the help hover is hidden.
   */
  helpText: string | null;
  /** Set the help hover state.
   *  @param event (MouseEvent) - event to get the position from
   *  @param helpText (string) - text to be displayed in the help hover
   */
  setHelpHover(
    event: MouseEvent,
    helpText: string,
    adjustTop?: number,
    adjustLeft?: number
  ): void;
  clear: () => void;
};
