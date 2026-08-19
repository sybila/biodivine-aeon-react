import type { Result } from '../../../types/result';

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

  /**
   * Displays a message based on the given result status.
   *
   * @param result - The result object to evaluate.
   * @param errorPrefix - A prefix to add to the error message.
   * @param successMessage - An optional success message to display if the result is successful.
   *
   * @returns The original result object.
   */
  showFromResult<T>(
    result: Result<T>,
    errorPrefix: string,
    successPrefix?: string
  ): Result<T>;
}
