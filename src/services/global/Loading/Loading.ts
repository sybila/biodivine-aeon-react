import type { LoadingInt } from './LoadingInt';

/** Class for managing loading states.
 *  Should displays a loading indicator when loading is in progress. */
class Loading implements LoadingInt {
  private startLoadingFunction: () => void;
  private endLoadingFunction: () => void;

  constructor(
    startLoadingFunction: () => void,
    endLoadingFunction: () => void
  ) {
    this.startLoadingFunction = startLoadingFunction;
    this.endLoadingFunction = endLoadingFunction;
  }

  public startLoading(): void {
    this.startLoadingFunction();
  }

  public endLoading(): void {
    this.endLoadingFunction();
  }
}

export default Loading;