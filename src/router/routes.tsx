import { createRoute, redirect } from '@tanstack/react-router';
import AttractorBifurcationExplorer from '../pages/attractor-bifurcation-explorer/AttractorBifurcationExplorer';
import AttractorVisualizer from '../pages/attractor-visualizer/AttractorVisualizer';
import ControlPerturbationsTable from '../pages/control-perturbations-table/ControlPerturbationTable';
import ModelEditor from '../pages/model-editor/ModelEditor';
import TrapSpaceSuccessionDiagram from '../pages/trap-space-succession-diagram/TrapSpaceSuccessionDiagram';
import ObjectProvider from '../wiring/ObjectProvider';
import { rootRoute } from './root';

const ModelEditorComponent = () => (
  <ModelEditor
    liveModelServ={ObjectProvider.GlobalServicesProvider.liveModelServ}
    modelVisualization={
      ObjectProvider.ModelEditorServicesProvider.modelVisualizationServ
    }
    modelEditorServ={ObjectProvider.ModelEditorServicesProvider.modelEditorServ}
    controlEditorServ={
      ObjectProvider.ModelEditorServicesProvider.controlEditorServ
    }
    computationManagerServ={
      ObjectProvider.GlobalServicesProvider.computationManagerServ
    }
    searchAndFilterHelpersServ={
      ObjectProvider.UtilitiesServiceProvider.searchAndFilterHelpersServ
    }
    openCloseOperationsServ={
      ObjectProvider.GlobalServicesProvider.openCloseOperationsServ
    }
    warningServ={ObjectProvider.GlobalServicesProvider.warningServ}
    messageServ={ObjectProvider.GlobalServicesProvider.messageServ}
    loadingServ={ObjectProvider.GlobalServicesProvider.loadingServ}
    fileConvertorsServ={
      ObjectProvider.UtilitiesServiceProvider.fileConvertorsServ
    }
    stringProviderServ={
      ObjectProvider.GlobalServicesProvider.stringProviderServ
    }
    modelEditorStatusStore={
      ObjectProvider.StoresProvider.modelEditorStatusStore
    }
    tabStore={ObjectProvider.StoresProvider.tabsStore}
    resultsStatusStore={ObjectProvider.StoresProvider.resultsStatusStore}
    controlStore={ObjectProvider.StoresProvider.controlStore}
    regulationsStore={ObjectProvider.StoresProvider.regulationsStore}
    variablesStore={ObjectProvider.StoresProvider.variablesStore}
    updateFunctionsStore={ObjectProvider.StoresProvider.updateFunctionsStore}
    modelInfoStore={ObjectProvider.StoresProvider.modelInfoStore}
    loadedModelStore={ObjectProvider.StoresProvider.loadedModelStore}
    modelUndoRedoStore={ObjectProvider.StoresProvider.modelUndoRedoStore}
    helpHoverStore={ObjectProvider.StoresProvider.helpHoverStore}
  />
);

// Redirect root path '/' to '/model-editor'
export const defaultRedirect = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: () => redirect({ to: '/model-editor' }),
});

export const modelEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/model-editor',
  component: ModelEditorComponent,
});

export const AttractorBifurcationExplorerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/attractor-bifurcation-explorer',
  component: () => (
    <AttractorBifurcationExplorer
      attractorBifurcationExplorerServ={
        ObjectProvider.AttractorBifurcationExplorerServicesProvider
          .attractorBifurcationExplorerServ
      }
      behaviorClassOperationsServ={
        ObjectProvider.UtilitiesServiceProvider.behaviorClassOperationsServ
      }
      stringProviderServ={
        ObjectProvider.GlobalServicesProvider.stringProviderServ
      }
      bifurcationExplorerStatusStore={
        ObjectProvider.StoresProvider.bifurcationExplorerStatusStore
      }
    />
  ),
});

export const AttractorVisualizerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/attractor-visualizer',
  component: () => (
    <AttractorVisualizer
      attractorVisualizerServ={
        ObjectProvider.AttractorVisualizerServicesProvider
          .attractorVisualizerServ
      }
      messageServ={ObjectProvider.GlobalServicesProvider.messageServ}
      stringProviderServ={
        ObjectProvider.GlobalServicesProvider.stringProviderServ
      }
      attractorVisualizerStatusStore={
        ObjectProvider.StoresProvider.attractorVisualizerStatusStore
      }
    />
  ),
});

export const WitnessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/witness',
  component: ModelEditorComponent,
});

export const ControlPerturbationsTableRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/control-perturbations-table',
  component: () => (
    <ControlPerturbationsTable
      liveModelServ={ObjectProvider.GlobalServicesProvider.liveModelServ}
      controlPerturbationsTableServ={
        ObjectProvider.ControlPerturbationsTableServicesProvider
          .controlPerturbationsTableServ
      }
      dataFormatersServ={
        ObjectProvider.UtilitiesServiceProvider.dataFormatersServ
      }
      searchAndFilterHelpersServ={
        ObjectProvider.UtilitiesServiceProvider.searchAndFilterHelpersServ
      }
      loadingServ={ObjectProvider.GlobalServicesProvider.loadingServ}
      stringProviderServ={
        ObjectProvider.GlobalServicesProvider.stringProviderServ
      }
      resultsStatusStore={ObjectProvider.StoresProvider.resultsStatusStore}
      perturbationFilterSortStore={
        ObjectProvider.StoresProvider.perturbationFiltersSortStore
      }
    />
  ),
});

export const TrapSpaceSuccessionDiagramRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/trap-space-succession-diagram',
  component: () => (
    <TrapSpaceSuccessionDiagram
      trapSpaceSDServ={
        ObjectProvider.TrapSpaceSuccessionDiagramnServicesProvider
          .trapSpaceSDServ
      }
      trapSpaceSDStatusStore={
        ObjectProvider.StoresProvider.trapSpaceSDStatusStore
      }
    />
  ),
});

export const routeTree = rootRoute.addChildren([
  defaultRedirect,
  modelEditorRoute,
  AttractorBifurcationExplorerRoute,
  AttractorVisualizerRoute,
  WitnessRoute,
  ControlPerturbationsTableRoute,
  TrapSpaceSuccessionDiagramRoute,
]);
