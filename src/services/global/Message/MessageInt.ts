/** Interface for managing global messages. */
export interface MessageInt {
  /** Displays a success message.
   *  @param message - The message to display.
   *  @param duration - Optional duration in milliseconds for which the message should be displayed. Defaults to 3000ms.
   */
  showSuccess(message: string, duration?: number): void;
  /** Displays an info message.
   *  @param message - The message to display.
   *  @param duration - Optional duration in milliseconds for which the message should be displayed. Defaults to 3000ms.
   */
  showInfo(message: string, duration?: number): void;
  /** Displays an error message.
   *  @param message - The message to display.
   *  @param duration - Optional duration in milliseconds for which the message should be displayed. Defaults to 3000ms.
   */
  showError(message: string, duration?: number): void;
}
