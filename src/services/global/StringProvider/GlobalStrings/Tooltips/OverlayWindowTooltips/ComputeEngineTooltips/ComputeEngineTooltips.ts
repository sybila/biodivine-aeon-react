import type { ComputeEngineTooltipsInt } from './ComputeEngineTooltipsInt';

class ComputeEngineTooltips implements ComputeEngineTooltipsInt {
  public changeComputeEngineAddress() {
    return 'Change the address the application uses to connect to the compute engine.';
  }

  public connectComputeEngineButton(isConnected: boolean) {
    const buttonOperation: string = isConnected
      ? 'Disconnect from'
      : 'Connect to';

    return `${buttonOperation} currently running compute engine.`;
  }

  public downloadComputeEngine() {
    return 'Redirect to download page for compute engine.';
  }
}

export default ComputeEngineTooltips;
