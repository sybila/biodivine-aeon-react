/** Utility class for operations on behavior classes */
class BehaviorClassOperations {
  /** Normalize behavior classes.
   *  Converts full class names to their short forms and joins them into one string.
   *   @param classes - An array of class names.
   *   @param classesJson - A JSON string representing an array of class names.
   *   @returns A string of normalized class names or undefined if input is invalid.
   */
  public static normalizeClasses(
    classes: Array<string> | undefined,
    classesJson: string | undefined
  ): string | undefined {
    const classesParsed = classes
      ? classes
      : classesJson
      ? JSON.parse(classesJson)
      : undefined;

    if (!classesParsed) {
      return undefined;
    }

    return classesParsed
      .map((x: string) => x[0])
      .sort()
      .join('');
  }
}

export default BehaviorClassOperations;
