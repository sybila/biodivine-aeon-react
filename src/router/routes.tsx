import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from './root';
import ModelEditor from '../pages/model-editor/ModelEditor';
import AttractorBifurcationExplorer from '../pages/attractor-bifurcation-explorer/AttractorBifurcationExplorer';

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

export const routeTree = rootRoute.addChildren([
  defaultRedirect,
  modelEditorRoute,
  AttractorBifurcationExplorerRoute,
]);
