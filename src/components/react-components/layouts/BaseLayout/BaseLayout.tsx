import { useEffect, useState } from 'react';
import ComputeEngineWindowContent from '../../global/ComputeEngineWindowContent/ComputeEngineWindowContent';
import ResultsWindowContent from '../../global/ResultsWindowContent/ResultsWindowContent';
import OverlayWindowReact from '../../lit-wrappers/OverlayWindowReact';
import PopUpBarReact from '../../lit-wrappers/PopUpBarReact';
import NavigationDockContent from '../../global/NavigationDockContent/NavigationDockContent';

import DockIcon from '../../../../assets/icons/dock-arrow.svg';
import StatusBar from '../../global/StatusBar/StatusBar';
import TwoSidedTextReact from '../../lit-wrappers/TwoSidedTextReact';
import { Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import TabBar from '../../global/TabBar/TabBar';
import useResultsStatus from '../../../../stores/ComputationManager/useResultsStatus';
import WarningOverlay from '../../global/WarningOverlay/WarningOverlay';
import ContentOverlayWindow from '../../global/ContentOverlayWindow/ContentOverlayWindow';

type OverlayWindowTypeME = 'Compute Engine' | 'Results' | null;

const BaseLayout = () => {
  const [activeOverlayWindow, setActiveOverlayWindow] =
    useState<OverlayWindowTypeME | null>(null);

  const loadedResults = useResultsStatus((state) => state.results);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/model-editor') {
      return;
    }

    const [nav] = performance.getEntriesByType(
      'navigation'
    ) as PerformanceNavigationTiming[];
    if (nav?.type === 'reload') {
      navigate({ to: '/model-editor' });
    }
  }, []);

  useEffect(() => {
    if (loadedResults) {
      setActiveOverlayWindow('Results');
    }
  }, [loadedResults]);

  const renderOverlayWindowContent = () => {
    switch (activeOverlayWindow) {
      case 'Compute Engine':
        return <ComputeEngineWindowContent />;
      case 'Results':
        return <ResultsWindowContent />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full w-full">
      <section className="flex flex-row h-[40px] overflow-visible w-fit max-w-[calc(100% - 578px)] justify-end items-center gap-5 absolute top-1 right-3 z-10 select-none pointer-events-none">
        <StatusBar />
        <TwoSidedTextReact rightText="Aeon/" leftText="BIODIVINE" />
      </section>

      {activeOverlayWindow !== null ? (
        <OverlayWindowReact
          compZIndex="999999990"
          compWidth="100%"
          compHeight="100%"
          windWidth="fit-content"
          windMaxWidth="80%"
          showHeader={true}
          showCloseButton={true}
          headerText={activeOverlayWindow}
          handleCloseClick={() => setActiveOverlayWindow(null)}
          handleBackgroundClick={() => setActiveOverlayWindow(null)}
        >
          {renderOverlayWindowContent()}
        </OverlayWindowReact>
      ) : null}

      <WarningOverlay zIndex="999999992" />

      <ContentOverlayWindow zIndex="999999991" />

      <PopUpBarReact
        className="absolute max-w-full bottom-[25px] left-1/2 -translate-x-1/2 z-999999990"
        iconSrc={DockIcon}
        iconAlt="Dock"
      >
        <NavigationDockContent
          handleComputeEngineClick={() =>
            setActiveOverlayWindow('Compute Engine')
          }
          handleResultsClick={() => setActiveOverlayWindow('Results')}
        >
          <TabBar />
        </NavigationDockContent>
      </PopUpBarReact>

      <Outlet />
    </div>
  );
};

export default BaseLayout;
