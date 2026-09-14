/** Custom type for Zustand store instances. */
export type ZustandStore<T> = {
  <S>(selector: (state: T) => S): S;
  getState: () => T;
  setState: (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
  subscribe: (listener: () => void) => () => void;
};
