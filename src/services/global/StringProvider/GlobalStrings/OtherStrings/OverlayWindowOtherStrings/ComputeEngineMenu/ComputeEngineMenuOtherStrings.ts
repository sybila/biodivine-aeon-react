import type { ComputeEngineMenuOtherStringsInt } from './ComputeEngineMenuOtherStringsInt';

class ComputeEngineMenuOtherStrings implements ComputeEngineMenuOtherStringsInt {
  // #region --- Common Parts ---

  public computationStatusHeader() {
    return 'Computation Status:';
  }

  public computationStatusNotAvailable() {
    return 'Not Available';
  }

  public computationModeHeader() {
    return 'Computation Mode:';
  }

  public computationModeNotAvailable() {
    return 'Not Available';
  }

  public computationIsRunningTimestampHeader() {
    return 'Elapsed:';
  }

  public computationEndedTimestampHeader() {
    return 'Ended At:';
  }

  public computeEngineURLHeader() {
    return 'Compute Engine URL';
  }

  // #endregion

  // #region --- Web Version ---

  public downloadComputeEngineButton() {
    return 'Download Compute Engine';
  }

  public connectComputeEngineButton(isConnected: boolean) {
    return isConnected ? 'Disconnect' : 'Connect';
  }

  // #endregion

  // #region --- Desktop Version ---

  public loggerHeader() {
    return 'Compute Engine Log';
  }

  public clearButtonText() {
    return 'Clear';
  }

  public noLogToShowPlaceholder() {
    return 'No output yet.';
  }

  // #endregion
}

export default ComputeEngineMenuOtherStrings;
