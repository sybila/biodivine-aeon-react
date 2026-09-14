/**
 * Interface for utility function that creates a waiter function for async resolution.
 */
export interface WaiterFunctionInt {
  /** Creates a waiter function for async resolution.
   *  Returns an object with a promise and a resolver function.
   *  The promise resolves when the resolver is invoked.
   *  Promise returns the value which was passed to the resolver.
   */
  createWaiterFunction<T>(): {
    promise: () => Promise<T>;
    resolver: (value: T) => void;
  };
}
