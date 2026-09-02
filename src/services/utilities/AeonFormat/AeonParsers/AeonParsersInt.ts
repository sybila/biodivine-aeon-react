import type { ParsedModelObject } from '../../../../types/parsedAeon';
import type { Result } from '../../../../types/result';

/** Interface containing functions for parsing files in the aeon format.  */
export interface AeonParsersInt {
  // #region --- Parser Function ---

  /**
   * Parses model into intermediate objects.
   * Returns model name and model description.
   * modelString is model in the form of Aeon string
   * All the other parameters are empty objects to be filled with data from the parsed Aeon string
   */
  parseAeonFile(modelString: string): Result<ParsedModelObject>;

  // #endregion
}
