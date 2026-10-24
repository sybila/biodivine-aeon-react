/** Types used for construction of mixins (functions allowing extension of class with multiple classes) */

export type Constructor<T = {}> = new (...args: any[]) => T;

export class EmptyBase {}
