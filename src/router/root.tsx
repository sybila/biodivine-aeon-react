import { createRootRoute } from '@tanstack/react-router';
import BaseLayout from '../components/react-components/layouts/BaseLayout/BaseLayout';

const rootRoute = createRootRoute({
  component: BaseLayout,
});

export { rootRoute };
