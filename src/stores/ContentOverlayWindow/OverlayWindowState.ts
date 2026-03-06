/** Zustand store for managing the content of global content overlay window in the model editor. */
export type OverlayWindowState = {
  /** The current content to be displayed in the overlay window.
   * If null, the overlay window is hidden.
   */
  currentContent: { header: string; content: React.ReactNode } | null;
  /** Sets the current content to be displayed in the overlay window.
   * If null, the overlay window is hidden.
   * @param content - The content to be displayed in the overlay window, or null to hide it.
   */
  setCurrentContent: (
    content: { header: string; content: React.ReactNode } | null
  ) => void;
  clear: () => void;
};
