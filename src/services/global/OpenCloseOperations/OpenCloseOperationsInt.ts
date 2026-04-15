/** Interface for managing open and close operations of global menus. */
export interface OpenCloseOperationsInt {
  /** Sets function for openning of compute engine menu. */
  setOpenComputeEngineMenu(openFunction: () => void): void;

  /** Opens the compute engine menu.
   *  Should be called after setOpenComputeEngineMenu to ensure the function is defined.
   */
  openComputeEngineMenu(): void;
}
