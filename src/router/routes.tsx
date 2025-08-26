import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from './root';
import ModelEditor from '../pages/model-editor/ModelEditor';
import AttractorBifurcationExplorer from '../pages/attractor-bifurcation-explorer/AttractorBifurcationExplorer';
import AttractorVisualizer from '../pages/attractor-visualizer/AttractorVisualizer';

// Redirect root path '/' to '/model-editor'
export const defaultRedirect = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: () => redirect({ to: '/model-editor' }),
});

export const modelEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/model-editor',
  component: ModelEditor,
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

export const routeTree = rootRoute.addChildren([
  defaultRedirect,
  modelEditorRoute,
  AttractorBifurcationExplorerRoute,
  AttractorVisualizerRoute,
]);
