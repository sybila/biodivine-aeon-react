/** 
# Result Type

The `Result` type in this file is a utility type used to represent the outcome of an operation. It can either contain a successful value (`Success`) 
or an error (`Err`).

*/

/**
 *`type: 'ok'`**: Indicates that the operation was successful.
 *`value: T`**: Contains the successful value returned by the operation.
 */
type Success<T> = { type: 'ok'; value: T };

/**
 * Represents an error with an error message.

 * - **`type: 'err'`**: Indicates that an error occurred.
 * - **`error: string`**: Contains the error message describing the issue.
 */
type Err = { type: 'err'; error: string };

/**
 * Represents the result of an operation that can either be successful or fail.
 */
export type Result<T> = Success<T> | Err;

/**
 * - This function takes a value of type `T` as an argument and returns a `Success<T>` object. This object is used to indicate that the operation was
 * successful and contains the value returned by the operation.
 */
export function ok<T>(value: T): Success<T> {
  return { type: 'ok', value };
}

/**
 * This function takes an error message as a string and returns an `Err` object. This object is used to indicate that the operation failed, with the
 * error message providing details about the failure.
 */
export function err(message: string): Err {
  return {
    type: 'err',
    error: message,
  };
}

/**
 * This function checks if the provided `Result<T>` is of type `Err`. It returns `true` if the result is an error and `false` if it is successful.
 */
export function isErr<T>(result: Result<T>) {
  return result.type === 'err';
}
