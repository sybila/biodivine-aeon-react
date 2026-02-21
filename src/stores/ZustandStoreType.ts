/** Custom type for Zustand store instances. */
export type ZustandStore<T> = {
  (selector: (state: T) => T): T;
  getState: () => T;
  setState: (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
  subscribe: (listener: () => void) => () => void;
};
