import type { BehaviorClassOperationsInt } from './BehaviorClassOperationsInt';

/** Utility class for operations on behavior classes */
class BehaviorClassOperations implements BehaviorClassOperationsInt {
  public normalizeClasses(
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
