import type { WaiterFunctionInt } from './WaiterFunctionInt';

class WaiterFunction implements WaiterFunctionInt {
  public createWaiterFunction<T>() {
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

export default WaiterFunction;
