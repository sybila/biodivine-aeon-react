import { createRoute, redirect } from '@tanstack/react-router';
import AttractorBifurcationExplorer from '../pages/attractor-bifurcation-explorer/AttractorBifurcationExplorer';
import AttractorVisualizer from '../pages/attractor-visualizer/AttractorVisualizer';
import ControlPerturbationsTable from '../pages/control-perturbations-table/ControlPerturbationTable';
import ModelEditor from '../pages/model-editor/ModelEditor';
import ControlPerturbationsTableServ from '../services/control-perturbations-table/ControlPerturbationsTable';
import ComputationManager from '../services/global/ComputationManager/ComputationManager';
import { LiveModel } from '../services/global/LiveModel/LiveModel';
import ControlEditor from '../services/model-editor/ControlEditor/ControlEditor';
import ModelEditorServ from '../services/model-editor/ModelEditor/ModelEditor';
import CytoscapeME from '../services/model-editor/ModelVisualization/CytoscapeME';
import DataFormaters from '../services/utilities/DataFormaters/DataFormaters';
import SearchAndFilterHelpers from '../services/utilities/SearchAndFilterHelpers/SearchAndFilterHelpers';
import useResultsStatus from '../stores/ComputationManager/ResultStatus/useResultsStatus';
import usePerturbationFilterSortStore from '../stores/ControlPerturbationsTable/PerturbationsFilterSortStore/usePerturbationsFilterSortStore';
import useControlStore from '../stores/LiveModel/ControlStore/useControlStore';
import useModelInfoStore from '../stores/LiveModel/ModelInfoStore/useModelInfoStore';
import useRegulationsStore from '../stores/LiveModel/RegulationsStore/useRegulationsStore';
import useUpdateFunctionsStore from '../stores/LiveModel/UpdateFunctionsStore/useUpdateFunctionsStore';
import useVariablesStore from '../stores/LiveModel/VariablesStore/useVariablesStore';
import useModelEditorStatus from '../stores/ModelEditor/useModelEditorStatus';
import useTabsStore from '../stores/Navigation/useTabsStore';
import { rootRoute } from './root';

// Redirect root path '/' to '/model-editor'
export const defaultRedirect = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: () => redirect({ to: '/model-editor' }),
});

export const modelEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/model-editor',
  component: () => (
    <ModelEditor
      liveModelServ={LiveModel}
      modelVisualization={CytoscapeME}
      modelEditorServ={ModelEditorServ}
      controlEditorServ={ControlEditor}
      computationManagerServ={ComputationManager}
      modelEditorStatusStore={useModelEditorStatus}
      tabStore={useTabsStore}
      resultsStatusStore={useResultsStatus}
      controlStore={useControlStore}
      regulationsStore={useRegulationsStore}
      variablesStore={useVariablesStore}
      updateFunctionsStore={useUpdateFunctionsStore}
      modelInfoStore={useModelInfoStore}
    />
  ),
});

export const AttractorBifurcationExplorerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/attractor-bifurcation-explorer',
  component: AttractorBifurcationExplorer,
});

export const AttractorVisualizerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/attractor-visualizer',
  component: AttractorVisualizer,
});

export const WitnessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/witness',
  component: () => (
    <ModelEditor
      liveModelServ={LiveModel}
      modelVisualization={CytoscapeME}
      modelEditorServ={ModelEditorServ}
      controlEditorServ={ControlEditor}
      computationManagerServ={ComputationManager}
      modelEditorStatusStore={useModelEditorStatus}
      tabStore={useTabsStore}
      resultsStatusStore={useResultsStatus}
      controlStore={useControlStore}
      regulationsStore={useRegulationsStore}
      variablesStore={useVariablesStore}
      updateFunctionsStore={useUpdateFunctionsStore}
      modelInfoStore={useModelInfoStore}
    />
  ),
});

export const ControlPerturbationsTableRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/control-perturbations-table',
  component: () => (
    <ControlPerturbationsTable
      liveModelServ={LiveModel}
      controlPerturbationsTableServ={ControlPerturbationsTableServ}
      dataFormatersServ={DataFormaters}
      searchAndFilterHelpersServ={SearchAndFilterHelpers}
      resultsStatusStore={useResultsStatus}
      perturbationFilterSortStore={usePerturbationFilterSortStore}
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
]);
