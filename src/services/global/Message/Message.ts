import { isErr, type Result } from '../../../types/result';
import type { MessageInt } from './MessageInt';

/** Class which implements global message management. */
class Message implements MessageInt {
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

  showSuccess(message: string, duration: number = 3000): void {
    this.successFunction(message, duration);
  }

  showInfo(message: string, duration: number = 3000): void {
    this.infoFunction(message, duration);
  }

  showError(message: string, duration: number = 3000): void {
    this.errorFunction(message, duration);
  }

  showFromResult<T>(
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
}

export default Message;
