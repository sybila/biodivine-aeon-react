import type {
  ParsedAeon,
  ParsedModelDescription,
  ParsedModelName,
  ParsedModelObject,
  ParsedPhenotype,
  ParsedRegulation,
  ParsedUpdateFunction,
  ParsedVariableControl,
  ParsedVariablePosition,
} from '../../../../types/parsedAeon';
import { err, ok } from '../../../../types/result';
import {
  EdgeMonotonicity,
  PHENOTYPE_STATUS,
  type PhenotypeStatus,
} from '../../../../types/types';
import type { AeonParsersInt } from './AeonParsersInt';

class AeonParsers implements AeonParsersInt {
  // #region --- Parser Function ---

  public parseAeonFile(modelString: string) {
    const result: ParsedModelObject = {
      modelName: '',
      modelDescription: '',
      regulations: [],
      varPositions: {},
      updateFunctions: {},
      control: {},
      phenotypes: [],
    };

    const lines = modelString.split('\n');

    for (const rawLine of lines) {
      const line = rawLine.trim();

      if (line.length === 0) continue; // skip whitespace

      // Try to match against specific parsers in order
      const parsed: ParsedAeon =
        this.parseRegulation(line) ||
        this.parseModelName(line) ||
        this.parseModelDescription(line) ||
        this.parsePosition(line) ||
        this.parseUpdateFunction(line) ||
        this.parseControl(line) ||
        this.parsePhenotype(line);

      if (parsed) {
        // Apply the parsed data to the result object
        if (parsed.type === 'regulation') result.regulations.push(parsed.data);
        else if (parsed.type === 'name') result.modelName = parsed.data;
        else if (parsed.type === 'description')
          result.modelDescription += parsed.data;
        else if (parsed.type === 'position')
          result.varPositions[parsed.data.name] = parsed.data.coords;
        else if (parsed.type === 'updateFunction')
          result.updateFunctions[parsed.data.name] = parsed.data.func;
        else if (parsed.type === 'control')
          result.control[parsed.data.name] = parsed.data.values;
        else if (parsed.type === 'phenotype')
          result.phenotypes.push(parsed.data);
        continue;
      }

      // If no parser matched, check if it's a comment
      if (!this.isComment(line)) {
        return err('Unexpected line in file: ' + line);
      }
    }

    // Post-processing
    result.modelDescription = result.modelDescription.replace(/\\n/g, '\n');

    return ok(result);
  }

  // #endregion

  // #region --- Model Description  ---
  private getRegexModelDescription() {
    return /^\s*#description:(.+)$/;
  }

  /**
   * Parses a line of an AEON format file and returns a `ParsedModelDescription` object if the line matches the specified model description line format.
   *
   * @param line - The line of text to be parsed.
   * @returns A `ParsedModelDescription` object if the line matches the format, or `null` if it does not match.
   */
  private parseModelDescription(line: string): ParsedModelDescription | null {
    const regex = this.getRegexModelDescription();
    const match = line.match(regex);
    return match
      ? ({ type: 'description', data: match[1] } as ParsedModelDescription)
      : null;
  }
  // #endregion

  // #region --- Model Name  ---
  private getRegexModelName() {
    return /^\s*#name:(.+)$/;
  }

  /**
   * Parses a line of an AEON format file and returns a `ParsedModelName` object if the line matches the specified model name line format.
   *
   * @param line - The line of text to be parsed.
   * @returns A `ParsedModelName` object if the line matches the format, or `null` if it does not match.
   */
  private parseModelName(line: string): ParsedModelName | null {
    const regex = this.getRegexModelName();
    const match = line.match(regex);
    return match ? ({ type: 'name', data: match[1] } as ParsedModelName) : null;
  }

  // #endregion

  // #region --- Position  ---
  private getRegexPosition() {
    return /^\s*#position:([a-zA-Z0-9_{}]+):(.+?),(.+?)\s*$/;
  }

  /**
   * Parses a line of an AEON format file and returns a `ParsedVariablePosition` object if the line matches the specified variable position line format.
   *
   * @param line - The line of text to be parsed.
   * @returns A `ParsedVariablePosition` object if the line matches the format, or `null` if it does not match.
   */
  private parsePosition(line: string): ParsedVariablePosition | null {
    const regex = this.getRegexPosition();
    const match = line.match(regex);
    if (!match) return null;

    const x = parseFloat(match[2]);
    const y = parseFloat(match[3]);

    // Check for NaN
    if (x !== x || y !== y) return null;

    return {
      type: 'position',
      data: {
        name: match[1],
        coords: [x, y],
      },
    } as ParsedVariablePosition;
  }
  // #endregion

  // #region --- Regulation  ---

  private getRegexRegulation() {
    return /^\s*([a-zA-Z0-9_{}]+)\s*-([>|?])(\??)\s*([a-zA-Z0-9_{}]+)\s*$/;
  }

  /**
   * Parses a line of an AEON format file and returns a `ParsedRegulation` object if the line matches the specified regulation line format.
   *
   * @param line - The line of text to be parsed.
   * @returns A `ParsedRegulation` object if the line matches the format, or `null` if it does not match.
   */
  private parseRegulation(line: string): ParsedRegulation | null {
    const regex = this.getRegexRegulation();
    const match = line.match(regex);
    if (!match) return null;

    let monotonicity: EdgeMonotonicity = EdgeMonotonicity.unspecified;
    if (match[2] === '>') monotonicity = EdgeMonotonicity.activation;
    if (match[2] === '|') monotonicity = EdgeMonotonicity.inhibition;

    return {
      type: 'regulation',
      data: {
        regulatorName: match[1],
        targetName: match[4],
        monotonicity,
        observable: match[3].length === 0,
      },
    };
  }

  // #endregion

  // #region --- Update Function  ---
  private getRegexUpdateFunction() {
    return /^\s*\$\s*([a-zA-Z0-9_{}]+)\s*:\s*(.+)\s*$/;
  }

  /**
   * Parses a line of an AEON format file and returns a `ParsedUpdateFunction` object if the line matches the specified update function line format.
   *
   * @param line - The line of text to be parsed.
   * @returns A `ParsedUpdateFunction` object if the line matches the format, or `null` if it does not match.
   */
  public parseUpdateFunction(line: string) {
    const regex = this.getRegexUpdateFunction();
    const match = line.match(regex);
    return match
      ? ({
          type: 'updateFunction',
          data: { name: match[1], func: match[2] },
        } as ParsedUpdateFunction)
      : null;
  }
  // #endregion

  // #region --- Control  ---
  private getRegexControl() {
    return /^\s*#!control:([a-zA-Z0-9_{}]+):(true|false),(true|false|null)\s*$/;
  }

  /**
   * Parses a line of an AEON format file and returns a `ParsedVariableControl` object if the line matches the specified variable control line format.
   *
   * @param line - The line of text to be parsed.
   * @returns A `ParsedVariableControl` object if the line matches the format, or `null` if it does not match.
   */
  public parseControl(line: string) {
    const regex = this.getRegexControl();
    const match = line.match(regex);
    if (!match) return null;

    return {
      type: 'control',
      data: {
        name: match[1],
        values: [
          match[2] === 'true',
          this.convertStringToPhenotypeStatus(match[3]),
        ],
      },
    } as ParsedVariableControl;
  }
  // #endregion

  // #region --- Phenotype  ---
  private getRegexPhenotypePrefix() {
    return /^\s*#!phen:([a-zA-Z0-9_{}]+)/;
  }

  private getRegexPhenotypeVariable() {
    return /([a-zA-Z0-9_{}]+)\s+(true|false|null)/g;
  }

  /**
   * Parses a line of an AEON format file and returns a `ParsedPhenotype` object if the line matches the specified phenotype line format.
   *
   * @param line - The line of text to be parsed.
   * @returns A `ParsedPhenotype` object if the line matches the format, or `null` if it does not match.
   */
  private parsePhenotype(line: string): ParsedPhenotype | null {
    const prefixRegex = this.getRegexPhenotypePrefix();
    const varRegex = this.getRegexPhenotypeVariable();

    const prefixMatch = line.match(prefixRegex);
    if (!prefixMatch) return null;

    const variables: { varName: string; phenValue: PhenotypeStatus }[] = [];
    let varMatch: RegExpExecArray | null;

    while ((varMatch = varRegex.exec(line)) !== null) {
      variables.push({
        varName: varMatch[1],
        phenValue: this.convertStringToPhenotypeStatus(varMatch[2]),
      });
    }

    return {
      type: 'phenotype',
      data: {
        phenName: prefixMatch[1],
        variables,
      },
    } as ParsedPhenotype;
  }

  // #endregion

  // #region --- Comment ---
  private getRegexComment() {
    return /^\s*#.*?$/;
  }

  /**
   * Checks if a given line is a comment line in an AEON format file.
   *
   * @param line - The line of text to be checked.
   * @returns `true` if the line is a comment, `false` otherwise.
   */
  private isComment(line: string) {
    const regex = this.getRegexComment();

    return regex.test(line);
  }
  // #endregion

  // #region --- Utilities ---

  /**
   * Converts a string representation of a phenotype status into the corresponding
   * `PhenotypeStatus` enum.
   *
   * @param value The string value to convert.
   * @returns The `PhenotypeStatus` enum value representing the input string.
   */
  private convertStringToPhenotypeStatus(value: string): PhenotypeStatus {
    return value == 'true'
      ? PHENOTYPE_STATUS.InPhenotypeTrue
      : value == 'false'
        ? PHENOTYPE_STATUS.InPhenotypeFalse
        : PHENOTYPE_STATUS.NotInPhenotype;
  }

  // #endregion
}

export default AeonParsers;
