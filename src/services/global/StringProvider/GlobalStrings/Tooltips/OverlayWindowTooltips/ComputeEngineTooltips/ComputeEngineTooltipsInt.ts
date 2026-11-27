import type { LoggerTooltipsInt } from "../../../../common-tooltips/Logger/LoggerTooltipsInt";

/** Class which provides tooltips for Compute Engine Overlay Window. */
export interface ComputeEngineTooltipsInt extends LoggerTooltipsInt {
  changeComputeEngineAddress(): string;

  connectComputeEngineButton(isConnected: boolean): string;

  downloadComputeEngine(): string;
}
