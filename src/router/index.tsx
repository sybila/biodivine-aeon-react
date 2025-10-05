import { createHashHistory, createRouter } from '@tanstack/react-router';
import { routeTree } from './routes';


// Allows navigation without changing the URL.
// For final deployment, we can use normal URL navigation,
// but this makes it easier to deploy as a static site.
const hashHistory = createHashHistory()
const router = createRouter({ 
  routeTree,
  basepath: import.meta.env.BASE_URL,
  history: hashHistory
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;
