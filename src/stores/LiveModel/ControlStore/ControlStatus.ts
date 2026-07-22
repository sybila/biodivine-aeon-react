import type { ControlInfo, Phenotype } from '../../../types';

/** Zustand store for managing control information of variables in LiveModel
 Provides actions for adding, removing, updating, and querying control info and phenotypes */
export type ControlStatus = {
  /** Property containing control-enabled status information for each variable. */
  controlEnabled: Record<number, boolean>;

  /** Property containing currently selected phenotype. */
  currentPhenotype: {
    id: number;
    name: string;
    variables: Record<number, Phenotype>;
  };
  /** Property containing phenotype status information for each variable. */
  phenotypes: Record<
    number,
    { name: string; variables: Record<number, Phenotype> }
  >;

  /** Adds control information for a variable. */
  addInfo: (id: number, controlInfo: ControlInfo) => number;
  /** Removes control information for a variable. */
  removeInfo: (id: number) => void;

  /** Retrieves control-enabled status of all variables without their ids. */
  getAllControlEnabled: () => boolean[];
  /** Retrieves control-enabled status of all variables with their corresponding IDs.
   *  @returns [id, boolean] - An array of tuples, where each tuple contains the variable ID and its control-enabled status.
   */
  getAllControlEnabledIds: () => Array<[number, boolean]>;
  /** Sets the control enabled state for a variable. */
  setControlEnabled: (id: number, controlEnabled: boolean) => void;
  /** Retrieves phenotype status of all variables in the currently selected phenotype (without ids of the variables). */
  getAllCurrentPhenotype: () => Phenotype[];
  /** Retrieves phenotype status of all variables in the currently selected phenotype with their corresponding IDs.
   *  @returns [id, Phenotype] - An array of tuples, where each tuple contains the variable ID and its phenotype status in the currently selected phenotype.
   */
  getAllCurrentPhenotypeIds: () => Array<[number, Phenotype]>;
  /** Sets the control enabled state for a variable. */
  /** Sets the phenotype for a variable. */
  setPhenotype: (id: number, phenotype: Phenotype) => void;
  /** Retrieves control information for a specific variable by ID. */
  getVariableControlInfo: (id: number) => ControlInfo | undefined;
  /** Retrieves control-enabled status for a specific variable by ID. */
  getVariableControlEnabled: (id: number) => boolean | undefined;
  /** Retrieves phenotype status in the currently selected phenotype for a specific variable by ID. */
  getVariableCurrentPhenotype: (id: number) => Phenotype | undefined;

  /** Retrieves IDs of variables based on their control enabled state. */
  getControlEnabledIds: (controlEnabled: boolean) => number[];
  /** Retrieves IDs of variables based on their phenotype state. */
  getPhenotypeIds: (phenotype: Phenotype) => number[];
  /** Checks if the control information is empty. */
  isEmpty: () => boolean;
  /** Clears all control information. */
  clear: () => void;
};
