import type {
  ControlEnabledStats,
  ControlInfo,
  Phenotype,
  PhenotypeNoId,
  PhenotypeStats,
  PhenotypeStatus,
  Result,
} from '../../../types';

/** Zustand store for managing control information of variables in LiveModel
 Provides actions for adding, removing, updating, and querying control info and phenotypes */
export type ControlStatus = {
  // #region --- Props ---

  /** Property containing control-enabled status information for each variable. */
  controlEnabled: Record<number, boolean>;

  /** Property containing currently selected phenotype. */
  currentPhenotype: Phenotype;
  /** Property containing phenotype status information for each variable. */
  phenotypes: Record<number, PhenotypeNoId>;

  /** Counter used for naming phenotypes with no name. */
  noNamePhenotypeCounter: number;
  /** Name prefix for phenotypes without specified name. */
  noNamePhenotypePrefix: string;

  // #endregion

  // #region --- Variable Control-Info (Control-Enabled + Phenotype) ---

  /** Adds control information for a variable. */
  addInfo: (id: number, controlInfo: ControlInfo) => number;
  /** Removes all control information (accross all phenotypes) for a variable.
   */
  removeInfo: (id: number) => void;

  /** Retrieves control information for a specific variable by ID. (control-enabled status + phenotype status in the currently active phenotype) */
  getVariableControlInfo: (id: number) => ControlInfo | undefined;

  /** Returns the number of variables set as Control-Enabled and in Phenotype .
   * @returns A tuple with the first element being the count of Control-Enabled variables,
   * and the second element being the count of variables in Phenotype.
   */
  getNumberOfSetControl: () => [number, number];

  // #endregion

  // #region --- Multiple Phenotype Operations ---

  /** Function which swithes the currently active phenotype (currentPhenotype).
   *  @param id (number) - id of the phenotype which should be active
   *  @returns if succesful returns id of the newly created phenotype, else if phenotype with id doesn't exist returns undefined.
   */
  switchPhenotype: (id: number) => number | undefined;
  /** Creates new empty phenotype and makes it currently active.
   *  @param name (string) - name of the phenotype.
   *  @returns returns Result object, if succesful error is set to undefined and value is set to the id of the new phenotype, else Result object error property contains error messsage string.
   */
  createPhenotype: (name?: string) => Result<number>;

  /** Removes phenotype and makes it currently active.
   *  @param id (number) - id of the phenotype which should be removed
   *  @returns if succesful returns id of the removed phenotype, else returns undefined if the phenotype cannot be removed (ex. is default phenotype).
   */
  removePhenotype: (id: number) => number | undefined;

  /** Renames phenotype specified by id to a new name.
   *  @param id (number) = id of the renamed phenotype
   *  @param newName (string) = new name for the phenotype.
   *  @returns Result<string> where if the renaming is succesful returns new name as value, else returns error message.
   */
  renamePhenotype: (id: number, newName: string) => Result<string>;

  /** Shifts variables from phenotype to the other phenotype.
   *  Phenotype specified by fromId should be empty after this, and phenotype specified by toId should contain only the variables previouslu present in fromId Phenotype.
   *  @returns If succesful returns toId, else returns error message.
   */
  shiftPhenotype: (fromId: number, toId: number) => Result<number>;

  /** Finds first phenotype with matching name.
   *  @returns If phenotype with specified name exists returns it, else returns undefined.
   */
  getPhenotypeByName: (name: string) => Phenotype | undefined;

  /** Checks if name maches name format connected with phenotype which was created without explicit name.
   *  If yes and noNamePhenotypeCounter is lower then the phenotype number specified in the name, returns new value of noNamePhenotypeCounter, else returns undeifned. */
  checkNoNamePhenotype: (name: string) => number | undefined;

  /** Creates new phenotype name based on the noNamePhenotypePrefix and noNamePhenotypeCounter.
   * @returns Object containing name of the phenotype and new value for the noNamePhenotypeCounter.
   */
  getNewPhenotypeName: () => { name: string; newCounterValue: number };

  // #endregion

  // #region --- Control-Enabled Variable Operations ---

  /** Retrieves control-enabled status of all variables without their ids. */
  getAllControlEnabled: () => boolean[];
  /** Retrieves control-enabled status of all variables with their corresponding IDs.
   *  @returns [id, boolean] - An array of tuples, where each tuple contains the variable ID and its control-enabled status.
   */
  getAllControlEnabledIds: () => Array<[number, boolean]>;
  /** Sets the control enabled state for a variable. */
  setControlEnabled: (id: number, controlEnabled: boolean) => void;
  /** Retrieves IDs of variables based on their control enabled state. */
  getControlEnabledIds: (controlEnabled: boolean) => number[];
  /** Returns how many control enabled / not control enabled variable there is. */
  getControlEnabledStats: () => ControlEnabledStats;
  /** Retrieves control-enabled status for a specific variable by ID. */
  getVariableControlEnabled: (id: number) => boolean | undefined;

  // #endregion

  // #region --- Current Phenotype Operations ---

  /** Retrieves phenotype status of all variables in the currently selected phenotype (without ids of the variables). */
  getAllCurrentPhenotype: () => PhenotypeStatus[];
  /** Retrieves phenotype status of all variables in the currently selected phenotype with their corresponding IDs.
   *  @returns [id, Phenotype] - An array of tuples, where each tuple contains the variable ID and its phenotype status in the currently selected phenotype.
   */
  getAllCurrentPhenotypeIds: () => Array<[number, PhenotypeStatus]>;
  /** Sets the phenotype status for a variable in the currently active phenotype. */
  setPhenotype: (id: number, phenotype: PhenotypeStatus) => void;

  /** Retrieves phenotype status in the currently active phenotype for a specific variable by ID. */
  getVariableCurrentPhenotype: (id: number) => PhenotypeStatus | undefined;

  /** Retrieves IDs of variables based on their phenotype state in the currently active phenotype. */
  getPhenotypeIds: (phenotype: PhenotypeStatus) => number[];

  /** Returns how many variables have certain phenotype status in the currently active phenotype. */
  getPhenotypeStats: () => PhenotypeStats;

  // #endregion

  /** Checks if the control information is empty. */
  isEmpty: () => boolean;
  /** Clears all control information. */
  clear: () => void;
};
