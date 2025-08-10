import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from './root';
import ModelEditor from '../pages/model-editor/ModelEditor';

// Redirect root path '/' to '/model-editor'
export const defaultRedirect = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: () => redirect({ to: '/model-editor' }),
});

export const modelEditorRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: '/model-editor',
  component: ModelEditor,
});

export const routeTree = rootRoute.addChildren([
  defaultRedirect,
  modelEditorRouter,
]);
