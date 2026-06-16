import { useEffect, useState } from 'react';
import ComputeEngineWindowContent from '../../global/ComputeEngineWindowContent/ComputeEngineWindowContent';
import NavigationDockContent from '../../global/NavigationDockContent/NavigationDockContent';
import ResultsWindowContent from '../../global/ResultsWindowContent/ResultsWindowContent';
import OverlayWindowReact from '../../lit-wrappers/OverlayWindowReact';
import PopUpBarReact from '../../lit-wrappers/PopUpBarReact';

import { Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import DockIcon from '../../../../assets/icons/dock-arrow.svg';
import ContentOverlayWindow from '../../global/ContentOverlayWindow/ContentOverlayWindow';
import HelpHover from '../../global/HelpHover/HelpHover';
import StatusBar from '../../global/StatusBar/StatusBar';
import TabBar from '../../global/TabBar/TabBar';
import WarningOverlay from '../../global/WarningOverlay/WarningOverlay';
import TwoSidedTextReact from '../../lit-wrappers/TwoSidedTextReact';
import type { BaseLayoutProps } from './BaseLayoutProps';

export type OverlayWindowTypeME = 'Compute Engine' | 'Results' | null;

const BaseLayout: React.FC<BaseLayoutProps> = ({
  attractorVisualizerServ,
  attractorBifurcationExplorerServ,
  controlPerturbationsTableServ,
  computationManagerServ,
  resultsOperationsServ,
  openCloseOperationsServ,
  tabOperationsServ,
  dataFormatersServ,
  warningServ,
  stringProviderServ,

  computeEngineStatusStore,
  resultsStatusStore,
  modelInfoStore,
  tabsStore,
  helpHoverStore,
  overlayWindowStore,
  warningStore,
}) => {
  const [activeOverlayWindow, setActiveOverlayWindow] =
    useState<OverlayWindowTypeME | null>(null);

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

  const renderOverlayWindowContent = () => {
    switch (activeOverlayWindow) {
      case 'Compute Engine':
        return (
          <ComputeEngineWindowContent
            computationManagerServ={computationManagerServ}
            stringProviderServ={stringProviderServ}
            helpHoverStore={helpHoverStore}
            computeEngineStatusStore={computeEngineStatusStore}
          />
        );
      case 'Results':
        return (
          <ResultsWindowContent
            computationManagerServ={computationManagerServ}
            attractorVisualizerServ={attractorVisualizerServ}
            attractorBifurcationExplorerServ={attractorBifurcationExplorerServ}
            controlPerturbationsTableServ={controlPerturbationsTableServ}
            resultsOperationsServ={resultsOperationsServ}
            dataFormatersServ={dataFormatersServ}
            stringProviderServ={stringProviderServ}
            modelInfoStore={modelInfoStore}
            tabsStore={tabsStore}
            resultsStatusStore={resultsStatusStore}
            helpHoverStore={helpHoverStore}
          />
        );
      default:
        return null;
    }
  };

  const getOnCloseFunctionForOverlayWindow = (
    windowType: OverlayWindowTypeME
  ) => {
    switch (windowType) {
      case 'Compute Engine':
        return () => setActiveOverlayWindow(null);
      case 'Results':
        return () => {
          setActiveOverlayWindow(null);
          resultsStatusStore.getState().setSelectedResults(undefined);
        };
      default:
        return () => {};
    }
  };

  openCloseOperationsServ.setOpenComputeEngineMenu(() => {
    getOnCloseFunctionForOverlayWindow(activeOverlayWindow)();
    setActiveOverlayWindow('Compute Engine');
  });

  const setNavBarHelpHover = (event: MouseEvent, text: string) => {
    helpHoverStore
      .getState()
      .setHelpHoverAtElementCenter(event, text, false, -85);
  };

  return (
    <div className="h-full w-full">
      <section className="flex flex-row h-[40px] overflow-visible w-fit max-w-[calc(100% - 578px)] justify-end items-center gap-5 absolute top-1 right-3 z-10 select-none pointer-events-none">
        <StatusBar
          onClick={() => setActiveOverlayWindow('Compute Engine')}
          setHelpHover={(e: MouseEvent) => {
            helpHoverStore
              .getState()
              .setHelpHoverAtMouse(
                e,
                stringProviderServ.ToolTips.GlobalTooltips.computeEngineStatus(),
                true,
                50
              );
          }}
          clearHelpHover={() => {
            helpHoverStore.getState().clear();
          }}
          computeEngineStatusStore={computeEngineStatusStore}
        />
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
          handleCloseClick={getOnCloseFunctionForOverlayWindow(
            activeOverlayWindow
          )}
          handleBackgroundClick={getOnCloseFunctionForOverlayWindow(
            activeOverlayWindow
          )}
        >
          {renderOverlayWindowContent()}
        </OverlayWindowReact>
      ) : null}

      <WarningOverlay zIndex="999999993" warningStore={warningStore} />

      <ContentOverlayWindow
        zIndex="999999991"
        overlayWindowStore={overlayWindowStore}
      />

      <HelpHover zIndex={999999992} helpHoverStore={helpHoverStore} />

      <PopUpBarReact
        className="absolute max-w-full bottom-[25px] left-1/2 -translate-x-1/2 z-999999990"
        iconSrc={DockIcon}
        iconAlt="Dock"
      >
        <NavigationDockContent
          helpHoverStore={helpHoverStore}
          handleComputeEngineClick={() =>
            setActiveOverlayWindow(
              activeOverlayWindow === 'Compute Engine' ? null : 'Compute Engine'
            )
          }
          setNavBarHelpHover={setNavBarHelpHover}
        >
          <TabBar
            setTabBarHelpHover={setNavBarHelpHover}
            setActiveWindow={(windowType) => setActiveOverlayWindow(windowType)}
            tabOperationsServ={tabOperationsServ}
            resultsOperationsServ={resultsOperationsServ}
            warningServ={warningServ}
            helpHoverStore={helpHoverStore}
            tabsStore={tabsStore}
            resultsStatusStore={resultsStatusStore}
          />
        </NavigationDockContent>
      </PopUpBarReact>

      <Outlet />
    </div>
  );
};

export default BaseLayout;
