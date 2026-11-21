import { isErr, type Result } from '../../../types/result';
import type { MessageInt } from './MessageInt';

/** Class which implements global message management. */
class Message implements MessageInt {
  /* #region --- Properties + Constructor --- */

  private successFunction: (
    message: string,
    duration?: number,
    floodDuration?: number
  ) => void;
  private infoFunction: (
    message: string,
    duration?: number,
    floodDuration?: number
  ) => void;
  private errorFunction: (
    message: string,
    duration?: number,
    floodDuration?: number
  ) => void;

  constructor(
    successFunction: (message: string, duration?: number) => void,
    infoFunction: (message: string, duration?: number) => void,
    errorFunction: (message: string, duration?: number) => void
  ) {
    this.successFunction = successFunction;
    this.infoFunction = infoFunction;
    this.errorFunction = errorFunction;
  }

  /* #endregion */

  /* #region --- Utilities --- */

  /**
   * Computes how long a message should be displayed based on its character length.
   *
   * @param message - The message string to compute the display duration for.
   * @returns The display duration in milliseconds.
   */
  private computeMessageDuration(message: string): number {
    const characterPerMinute = 1000;
    const minDuration = 2000;
    const maxDuration = 10000;

    const duration = (message.length / characterPerMinute) * 60 * 1000;

    return Math.min(maxDuration, Math.max(minDuration, duration));
  }

  /**
   * Computes a reduced display duration for use when flood mode is active,
   * i.e. when too many messages are queued in the pipeline.
   *
   * Applies a multiplier to shorten the normal duration, allowing the queue
   * to drain faster while still guaranteeing a minimum legibility threshold.
   *
   * @param normalDuration - The standard display duration in milliseconds,
   *   as returned by {@link computeMessageDuration}.
   * @returns The flood-mode display duration in milliseconds.
   */
  private computeFloodDuration(normalDuration: number): number {
    const floodMultiplier = 0.4;
    const minFloodDuration = 1000;

    return Math.max(minFloodDuration, normalDuration * floodMultiplier);
  }

  /**
   * Resolves safe display durations for a message, falling back to computed
   * defaults when explicit overrides are not provided.
   *
   * If `duration` is not supplied, it is computed from the message length via
   * {@link computeMessageDuration}. If `floodDuration` is not supplied, it is
   * derived from the resolved duration via {@link computeFloodDuration}.
   *
   * @param message - The message string (e.g. an error or status message) for
   *   which durations are being resolved.
   * @param duration - Optional explicit normal display duration in milliseconds.
   *   When omitted, the duration is calculated from the message length.
   * @param floodDuration - Optional explicit flood-mode display duration in milliseconds.
   *   When omitted, the duration is calculated from the resolved normal duration.
   * @returns An object containing:
   *   - `duration` — the resolved normal display duration in milliseconds.
   *   - `floodDuration` — the resolved flood-mode display duration in milliseconds.
   */
  private getSafeDurations(
    message: string,
    duration: number | undefined,
    floodDuration: number | undefined
  ): { duration: number; floodDuration: number } {
    const safeDuration = duration ?? this.computeMessageDuration(message);
    const safeFloodDuration =
      floodDuration ?? this.computeFloodDuration(safeDuration);

    return { duration: safeDuration, floodDuration: safeFloodDuration };
  }

  /* #endregion */

  /* #region --- Show functions --- */

  public showSuccess(
    message: string,
    duration?: number,
    floodDuration?: number
  ): void {
    const durations = this.getSafeDurations(message, duration, floodDuration);

    this.successFunction(message, durations.duration, durations.floodDuration);
  }

  public showInfo(
    message: string,
    duration?: number,
    floodDuration?: number
  ): void {
    const durations = this.getSafeDurations(message, duration, floodDuration);

    this.infoFunction(message, durations.duration, durations.floodDuration);
  }

  public showError(
    message: string,
    duration?: number,
    floodDuration?: number
  ): void {
    const durations = this.getSafeDurations(message, duration, floodDuration);

    this.errorFunction(message, durations.duration, durations.floodDuration);
  }

  public showFromResult<T>(
    result: Result<T>,
    errorPrefix: string,
    successMessage?: string
  ): Result<T> {
    if (isErr(result)) {
      this.showError(`${errorPrefix}: ${result.error}`);
    } else if (successMessage != undefined) {
      this.showSuccess(successMessage);
    }

    return result;
  }

  /* #endregion */
}

export default Message;
