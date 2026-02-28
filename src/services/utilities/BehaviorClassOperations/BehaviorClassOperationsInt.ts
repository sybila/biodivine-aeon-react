/**
 * Interface for utitlity functions related to behavior class operations, such as formatting.
 */
export interface BehaviorClassOperationsInt {
  /** Normalize behavior classes.
   *  Converts full class names to their short forms and joins them into one string.
   *   @param classes - An array of class names.
   *   @param classesJson - A JSON string representing an array of class names.
   *   @returns A string of normalized class names or undefined if input is invalid.
   */
  normalizeClasses(
    classes: Array<string> | undefined,
    classesJson: string | undefined
  ): string | undefined;
}
