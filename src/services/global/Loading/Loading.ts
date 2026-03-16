import type { TabsState } from '../../../stores/Navigation/TabState';
import type { ZustandStore } from '../../../stores/ZustandStoreType';
import type { LoadingInt } from './LoadingInt';

/** Class for managing loading states.
 *  Should displays a loading indicator when loading is in progress. */
class Loading implements LoadingInt {
  private startLoadingFunction: () => void;
  private endLoadingFunction: () => void;

  constructor(
    startLoadingFunction: () => void,
    endLoadingFunction: () => void,
    tabsStore: ZustandStore<TabsState>
  ) {
    this.startLoadingFunction = startLoadingFunction;
    this.endLoadingFunction = endLoadingFunction;

    tabsStore.getState().startLoading = () => {
      this.startLoading();
    };

    tabsStore.getState().endLoading = () => {
      this.endLoading();
    };
  }

  public startLoading(): void {
    this.startLoadingFunction();
  }

  public endLoading(): void {
    this.endLoadingFunction();
  }
}

export default Loading;
