import { isErr, type Result } from '../../../types/result';
import type { MessageInt } from './MessageInt';

/** Class which implements global message management. */
class Message implements MessageInt {
  /* #region --- Properties + Constructor --- */

  private successFunction: (message: string, duration?: number) => void;
  private infoFunction: (message: string, duration?: number) => void;
  private errorFunction: (message: string, duration?: number) => void;

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

  /** For message string computes how long this message should be displayed in ms. */
  private computeMessageDuration(message: string): number {
    const characterPerMinute = 1000;
    const minDuration = 2000;
    const maxDuration = 10000;

    const duration = (message.length / characterPerMinute) * 60 * 1000;

    return Math.min(maxDuration, Math.max(minDuration, duration));
  }

  /* #endregion */

  /* #region --- Show functions --- */

  public showSuccess(message: string, duration?: number): void {
    const computedDuration = duration ?? this.computeMessageDuration(message);

    this.successFunction(message, computedDuration);
  }

  public showInfo(message: string, duration?: number): void {
    const computedDuration = duration ?? this.computeMessageDuration(message);

    this.infoFunction(message, computedDuration);
  }

  public showError(message: string, duration?: number): void {
    const computedDuration = duration ?? this.computeMessageDuration(message);

    this.errorFunction(message, computedDuration);
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
