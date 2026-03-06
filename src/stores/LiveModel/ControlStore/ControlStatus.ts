import type { ControlInfo, Phenotype } from '../../../types';

/** Zustand store for managing control information of variables in LiveModel
 Provides actions for adding, removing, updating, and querying control info and phenotypes */
export type ControlStatus = {
  /** Property containing control information for each variable. */
  controlInfo: Record<number, ControlInfo>;
  /** Adds control information for a variable. */
  addInfo: (id: number, controlInfo: ControlInfo) => number;
  /** Removes control information for a variable. */
  removeInfo: (id: number) => void;
  /** Retrieves all control information. */
  getAllInfo: () => ControlInfo[];
  /** Retrieves all control information with the IDs of the corresponding variables.
   *  @returns [id, ControlInfo] - An array of tuples, where each tuple contains the variable ID and its control information.
   */
  getAllInfoIds: () => Array<[number, ControlInfo]>;
  /** Sets the control enabled state for a variable. */
  setControlEnabled: (id: number, controlEnabled: boolean) => void;
  /** Sets the phenotype for a variable. */
  setPhenotype: (id: number, phenotype: Phenotype) => void;
  /** Retrieves control information for a specific variable by ID. */
  getVariableControlInfo: (id: number) => ControlInfo | undefined;
  /** Retrieves IDs of variables based on their control enabled state. */
  getControlEnabledIds: (controlEnabled: boolean) => number[];
  /** Retrieves IDs of variables based on their phenotype state. */
  getPhenotypeIds: (phenotype: Phenotype) => number[];
  /** Checks if the control information is empty. */
  isEmpty: () => boolean;
  /** Clears all control information. */
  clear: () => void;
};
