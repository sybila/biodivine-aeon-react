import type {
  PhenotypeNoId,
  PhenotypeStatus,
  Position,
  Regulation,
  UpdateFunction,
  Variable,
} from '../../../../types/types';

/**
 * Read-only accessors describing the model currently loaded in the
 * application, narrowed to exactly what the Aeon serializer requires. */
export type SerializeAeonParams = {
  getModelName: () => string;
  getModelDescription: () => string;

  getModelVariables: () => Variable[];
  getModelVariableName: (varId: number) => string | undefined;
  getVariablePosition: (varId: number) => Position | undefined;
  getVariableControlEnabled: (varId: number) => boolean | undefined;
  /** Returns phenotype status of the variable specified by the varId in the default phenotype. */
  getVariableDefaultPhenStatus: (varId: number) => PhenotypeStatus | undefined;
  getVariableUpdateFunction: (varId: number) => UpdateFunction | undefined;
  getVariableRegulators: (varId: number) => Regulation[];

  /**  * All phenotypes of the model except the default one.
   *
   * @returns non-default phenotypes keyed by their id; empty record when the
   * model defines none beyond the default. */
  getModelPhenotypes: () => Record<number, PhenotypeNoId>;
};

/** Contains functions for serialization of model loaded into application into the Aeon string format. */
export interface AeonSerializersInt {
  /**
   * Function which serializes model loaded into the application into aeon
   * string format.
   *
   * @param parameters - accessors over the model to serialize; see
   * {@link SerializeAeonParams}.
   * @returns the whole model as an Aeon-formatted string */
  serializeAeonIntoString(parameters: SerializeAeonParams): string;
}
