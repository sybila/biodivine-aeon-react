import type { Result } from '../../../types/result';

/** Interface for managing global UI messages such as success messages, error messages, or info messages. */
export interface MessageInt {
  /**
   * Displays a success message.
   *
   * @param message - The message string to display.
   * @param duration - Display duration in milliseconds. When omitted, duration is
   *   computed automatically from the message length.
   * @param floodDuration - Display duration in milliseconds used when flood mode is
   *   active (too many messages queued). When omitted, derived automatically from `duration`.
   */
  showSuccess(message: string, duration?: number, floodDuration?: number): void;

  /**
   * Displays an informational message.
   *
   * @param message - The message string to display.
   * @param duration - Display duration in milliseconds. When omitted, duration is
   *   computed automatically from the message length.
   * @param floodDuration - Display duration in milliseconds used when flood mode is
   *   active (too many messages queued). When omitted, derived automatically from `duration`.
   */
  showInfo(message: string, duration?: number, floodDuration?: number): void;

  /**
   * Displays an error message.
   *
   * @param message - The message string to display.
   * @param duration - Display duration in milliseconds. When omitted, duration is
   *   computed automatically from the message length.
   * @param floodDuration - Display duration in milliseconds used when flood mode is
   *   active (too many messages queued). When omitted, derived automatically from `duration`.
   */
  showError(message: string, duration?: number, floodDuration?: number): void;

  /**
   * Evaluates a {@link Result} and displays an appropriate message based on its status.
   *
   * - On failure: displays an error message composed of `errorPrefix` and the result's error detail.
   * - On success: displays `successMessage` as a success message, if provided.
   *
   * Useful for handling operation outcomes with a single call.
   *
   * @param result - The result object to evaluate.
   * @param errorPrefix - A prefix prepended to the error detail when the result represents a failure
   *   (e.g. `"Failed to save:"` → `"Failed to save: network timeout"`).
   * @param successMessage - When provided, displays this as a success message if the result is successful.
   * @returns The original `result` object, passed through unchanged for further chaining or handling.
   */
  showFromResult<T>(
    result: Result<T>,
    errorPrefix: string,
    successMessage?: string
  ): Result<T>;
}
