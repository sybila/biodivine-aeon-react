import { useEffect, useMemo, useState } from 'react';
import type { ComputationModes, TabInfo } from '../../../../../types';
import DynamicTabs from '../DynamicTabs/DynamicTabs';
import type { ResultTabsProps } from './ResultTabsProps';

const ResultTabs: React.FC<ResultTabsProps> = ({
  deleteModeOn,
  setTabBarHelpHover,
  clearHelpHover,
  openResultsWindow,
  closeResultsWindow,
  resultsStatusStore,
}) => {
  const [lastAddedResultsTimestamp, setLastAddedResultsTimestamp] = useState<
    number | null
  >(null);

  const results = resultsStatusStore((state) => state.results);
  const selectedResults = resultsStatusStore((state) => state.selectedResults);
  const lastAddedResults = resultsStatusStore(
    (state) => state.lastAddedResults
  );

  useEffect(() => {
    if (
      lastAddedResults &&
      lastAddedResults.timestamp &&
      lastAddedResults.timestamp !== lastAddedResultsTimestamp
    ) {
      setLastAddedResultsTimestamp(lastAddedResults.timestamp);
      resultsStatusStore.getState().setSelectedResults(lastAddedResults.mode);
      openResultsWindow();
    }
  }, [lastAddedResults]);

  const resultsArray: TabInfo<ComputationModes, ComputationModes>[] = useMemo(
    () =>
      Object.entries(results).reduce<
        TabInfo<ComputationModes, ComputationModes>[]
      >((acc, [key, result]) => {
        if (result !== undefined) {
          acc.push({
            id: key as ComputationModes,
            type: key as ComputationModes,
            path: '',
            active: selectedResults === key,
            text: key + ' Results',
          });
        }
        return acc;
      }, []),
    [results, selectedResults]
  );

  return resultsArray.length === 0 ? null : (
    <DynamicTabs<ComputationModes, ComputationModes>
      tabs={resultsArray}
      deleteModeOn={(_) => deleteModeOn}
      getIcon={(tabType) => 'TODO'}
      setTabBarHelpHover={setTabBarHelpHover}
      clearHelpHover={clearHelpHover}
      handleTabClick={(tabId, active) => {
        if (deleteModeOn) {
          resultsStatusStore.getState().clearResult(tabId);
        } else if (!active && results[tabId] !== undefined) {
          resultsStatusStore.getState().setSelectedResults(tabId);
          openResultsWindow();
        } else if (active) {
          resultsStatusStore.getState().setSelectedResults(undefined);
          closeResultsWindow();
        }
      }}
    />
  );
};

export default ResultTabs;
