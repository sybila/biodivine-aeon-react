import type { OpenCloseOperationsInt } from './OpenCloseOperationsInt';

class OpenCloseOperations implements OpenCloseOperationsInt {
  private openComputeEngineMenuFunction: () => void = () => {
    console.warn('Open Compute Engine Menu function not set');
  };

  public setOpenComputeEngineMenu(openFunction: () => void) {
    this.openComputeEngineMenuFunction = openFunction;
  }

  public openComputeEngineMenu() {
    if (!this.openComputeEngineMenuFunction) {
      console.warn('Open Compute Engine Menu function not set');
      return;
    }

    this.openComputeEngineMenuFunction();
  }
}

export default OpenCloseOperations;
