import type { LoggerOtherStringsInt } from '../../../../common-other-strings/Logger/LoggerOtherStringsInt';

/** Interface providing uncategorized strings (not tooltips, help texts....) for the Compute Engine menu */
export interface ComputeEngineMenuOtherStringsInt extends LoggerOtherStringsInt {
  /* #region --- Common Parts --- */

  computationStatusHeader(): string;
  computationStatusNotAvailable(): string;

  computationModeHeader(): string;
  computationModeNotAvailable(): string;

  computationIsRunningTimestampHeader(): string;
  computationEndedTimestampHeader(): string;

  computeEngineURLHeader(): string;

  /* #endregion */

  /* #region --- Web Version ---  */

  downloadComputeEngineButton(): string;
  connectComputeEngineButton(isConnected: boolean): string;

  /* #endregion */
}
