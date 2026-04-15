import { createRootRoute } from '@tanstack/react-router';
import BaseLayout from '../components/react-components/layouts/BaseLayout/BaseLayout';
import ObjectProvider from '../wiring/ObjectProvider';

const baseLayout = () => (
  <BaseLayout
    attractorVisualizerServ={
      ObjectProvider.AttractorVisualizerServicesProvider.attractorVisualizerServ
    }
    attractorBifurcationExplorerServ={
      ObjectProvider.AttractorBifurcationExplorerServicesProvider
        .attractorBifurcationExplorerServ
    }
    controlPerturbationsTableServ={
      ObjectProvider.ControlPerturbationsTableServicesProvider
        .controlPerturbationsTableServ
    }
    computationManagerServ={
      ObjectProvider.GlobalServicesProvider.computationManagerServ
    }
    resultsOperationsServ={
      ObjectProvider.GlobalServicesProvider.resultsOperationsServ
    }
    openCloseOperationsServ={
      ObjectProvider.GlobalServicesProvider.openCloseOperationsServ
    }
    tabOperationsServ={ObjectProvider.GlobalServicesProvider.tabOperationsServ}
    dataFormatersServ={
      ObjectProvider.UtilitiesServiceProvider.dataFormatersServ
    }
    computeEngineStatusStore={
      ObjectProvider.StoresProvider.computeEngineStatusStore
    }
    resultsStatusStore={ObjectProvider.StoresProvider.resultsStatusStore}
    modelInfoStore={ObjectProvider.StoresProvider.modelInfoStore}
    tabsStore={ObjectProvider.StoresProvider.tabsStore}
    helpHoverStore={ObjectProvider.StoresProvider.helpHoverStore}
    overlayWindowStore={ObjectProvider.StoresProvider.overlayWindowStore}
    warningStore={ObjectProvider.StoresProvider.warningStore}
  />
);

const rootRoute = createRootRoute({
  component: baseLayout,
});

export { rootRoute };
