import {
  EdgeMonotonicity,
  PHENOTYPE_STATUS,
  type PhenotypeNoId,
  type PhenotypeStatus,
  type Position,
  type Regulation,
  type UpdateFunction,
  type Variable,
} from '../../../../types/types';
import type {
  AeonSerializersInt,
  SerializeAeonParams,
} from './AeonSerializersInt';

class AeonSerializers implements AeonSerializersInt {
  // #region --- Serialization function ---

  serializeAeonIntoString(parameters: SerializeAeonParams): string {
    return [
      this.serializeModelName(parameters.getModelName),
      this.serializeModelDescription(parameters.getModelDescription),
      this.serializeVariables(
        parameters.getModelVariables,
        parameters.getModelVariableName,
        parameters.getVariablePosition,
        parameters.getVariableUpdateFunction,
        parameters.getVariableRegulators,
        parameters.getVariableControlEnabled,
        parameters.getVariableDefaultPhenStatus
      ),
      this.serializePhenotypes(
        parameters.getModelPhenotypes,
        parameters.getModelVariableName
      ),
    ].join('');
  }

  // #endregion

  // #region --- Model Information ---

  private formatModelNameIntoString(modelName: string | undefined): string {
    return modelName ? `#name:${modelName}\n` : '';
  }

  private serializeModelName(getModelName: () => string): string {
    const modelName = getModelName();

    return this.formatModelNameIntoString(modelName);
  }

  private formatModelDescriptionIntoString(
    modelDescription: string | undefined
  ) {
    return modelDescription
      ? `#description:${modelDescription.replace(/\n/g, '\\n')}\n`
      : '';
  }

  private serializeModelDescription(getModelDescription: () => string): string {
    const modelDescription = getModelDescription();

    return this.formatModelDescriptionIntoString(modelDescription);
  }

  // #endregion

  // #region --- Variables ---

  private serializeVariables(
    getModelVariables: () => Variable[],
    getVariableName: (varId: number) => string | undefined,
    getVariablePosition: (varId: number) => Position | undefined,
    getVariableUpdateFunction: (varId: number) => UpdateFunction | undefined,
    getVariableRegulators: (varId: number) => Regulation[],
    getVariableControlEnabled: (varId: number) => boolean | undefined,
    getVariableDefaultPhenStatus: (varId: number) => PhenotypeStatus | undefined
  ): string {
    const variables = getModelVariables();

    return variables
      .map((variable) =>
        this.serializeVariable(
          variable,
          getVariableName,
          getVariablePosition,
          getVariableUpdateFunction,
          getVariableRegulators,
          getVariableControlEnabled,
          getVariableDefaultPhenStatus
        )
      )
      .join('');
  }

  private serializeVariable(
    variable: Variable,
    getVariableName: (varId: number) => string | undefined,
    getVariablePosition: (varId: number) => Position | undefined,
    getVariableUpdateFunction: (varId: number) => UpdateFunction | undefined,
    getVariableRegulators: (varId: number) => Regulation[],
    getVariableControlEnabled: (varId: number) => boolean | undefined,
    getVariableDefaultPhenStatus: (varId: number) => PhenotypeStatus | undefined
  ): string {
    const variableName = variable?.name;

    return [
      this.serializeVariablePosition(
        variable.id,
        variableName,
        getVariablePosition
      ),
      this.serializeVariableUpdateFunction(
        variable.id,
        variableName,
        getVariableUpdateFunction
      ),
      this.serializeVariableControlInfo(
        variable.id,
        variableName,
        getVariableControlEnabled,
        getVariableDefaultPhenStatus
      ),
      this.serializeVariableRegulators(
        variable.id,
        getVariableRegulators,
        getVariableName
      ),
    ].join('');
  }

  // #endregion

  // #region --- Base Variable Info ---

  private formatVariablePositionIntoString(
    varName: string,
    variablePosition: Position
  ): string {
    return `#position:${varName}:${variablePosition}\n`;
  }

  private serializeVariablePosition(
    varId: number,
    varName: string,
    getVariablePosition: (varId: number) => Position | undefined
  ): string {
    const position = getVariablePosition(varId);

    return position
      ? this.formatVariablePositionIntoString(varName, position ?? [0, 0])
      : '';
  }

  private formatVariableUpdateFunctionIntoString(
    varName: string,
    functionString: string
  ): string {
    return `$${varName}:${functionString}\n`;
  }

  private serializeVariableUpdateFunction(
    varId: number,
    varName: string,
    getVariableUpdateFunction: (varId: number) => UpdateFunction | undefined
  ) {
    const fun = getVariableUpdateFunction(varId);

    return fun
      ? this.formatVariableUpdateFunctionIntoString(varName, fun.functionString)
      : '';
  }

  private formatVariableRegulationIntoString(
    regulation: Regulation,
    getVariableName: (varId: number) => string | undefined
  ): string {
    const regulatorName = getVariableName(regulation.regulator);
    const targetName = getVariableName(regulation.target);

    if (!regulatorName || !targetName) {
      return '';
    }

    let arrow = '-';

    if (regulation.monotonicity === EdgeMonotonicity.unspecified) arrow += '?';
    else if (regulation.monotonicity === EdgeMonotonicity.activation)
      arrow += '>';
    else if (regulation.monotonicity === EdgeMonotonicity.inhibition)
      arrow += '|';

    if (!regulation.observable) arrow += '?';

    return `${regulatorName} ${arrow} ${targetName}\n`;
  }

  private serializeVariableRegulators(
    varId: number,
    getVariableRegulators: (varId: number) => Regulation[],
    getVariableName: (varId: number) => string | undefined
  ) {
    const regulations = getVariableRegulators(varId);

    return regulations
      .map((reg) =>
        this.formatVariableRegulationIntoString(reg, getVariableName)
      )
      .join('');
  }

  // #endregion

  // #region --- Variable Control ---

  private formatVariableControlIntoString(
    varName: string,
    controlEnabled: boolean,
    defaultPhenStatus: PhenotypeStatus
  ): string {
    const convertedDefPhen =
      defaultPhenStatus === PHENOTYPE_STATUS.InPhenotypeTrue
        ? true
        : defaultPhenStatus === PHENOTYPE_STATUS.InPhenotypeFalse
          ? false
          : null;

    return `#!control:${varName}:${controlEnabled},${convertedDefPhen}\n`;
  }

  private serializeVariableControlInfo(
    varId: number,
    varName: string,
    getVariableControlEnabled: (varId: number) => boolean | undefined,
    getVariableDefaultPhenStatus: (varId: number) => PhenotypeStatus | undefined
  ) {
    const controlEnabledStatus = getVariableControlEnabled(varId) ?? true;
    const defaultPhenStatus =
      getVariableDefaultPhenStatus(varId) ?? PHENOTYPE_STATUS.NotInPhenotype;

    return this.formatVariableControlIntoString(
      varName,
      controlEnabledStatus,
      defaultPhenStatus
    );
  }

  // #endregion

  // #region --- Phenotypes ---

  /**
   * Converts a PhenotypeStatus value to a string based on predefined mappings.
   *
   * @param value - The PhenotypeStatus value to be converted.
   * @returns A string representation of the PhenotypeStatus value. Returns 'true' if the value is 'InPhenotypeTrue', 'false' if it is 'InPhenotypeFalse', and undefined otherwise.
   */
  private formatPhenotypeStatusToString(
    value: PhenotypeStatus
  ): string | undefined {
    return value == PHENOTYPE_STATUS.InPhenotypeTrue
      ? 'true'
      : value == PHENOTYPE_STATUS.InPhenotypeFalse
        ? 'false'
        : undefined;
  }

  private formatPhenotypeIntoString(
    phenotype: PhenotypeNoId,
    getVariableName: (varId: number) => string | undefined
  ) {
    const variables = phenotype.variables;
    let entries = '';

    for (const key in variables) {
      const varName = getVariableName(Number(key));
      if (varName === undefined) continue;

      if (entries) entries += ' ';
      entries += `${varName} ${this.formatPhenotypeStatusToString(variables[key])}`;
    }

    return `#!phen:${phenotype.name},${entries}`;
  }

  private serializePhenotypes(
    getModelPhenotypes: () => Record<number, PhenotypeNoId>,
    getVariableName: (varId: number) => string | undefined
  ): string {
    const phenotypes = Object.entries(getModelPhenotypes());

    return phenotypes
      .map(([_, phen]) => {
        return this.formatPhenotypeIntoString(phen, getVariableName);
      })
      .join('\n');
  }

  // #endregion
}

export default AeonSerializers;
