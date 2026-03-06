import type { WaiterFunctionInt } from './WaiterFunctionInt';

class WaiterFunctionClass implements WaiterFunctionInt {
  /**
   * Creates an object with a function that returns a promise and a resolver function.
   * The promise resolves when the resolver is invoked.
   * Promise returns the value which was passed to the resolver.
   */
  public createWaiterFunction<T>(): {
    promise: () => Promise<T>;
    resolver: (value: T) => void;
  } {
    let resolver: ((value: T) => void) | undefined;
    const promise = new Promise<T>((res) => {
      resolver = res;
    });

    return {
      promise: () => promise,
      resolver: (value: T) => resolver?.(value),
    };
  }
}

const WaiterFunction = new WaiterFunctionClass();

export default WaiterFunction;
