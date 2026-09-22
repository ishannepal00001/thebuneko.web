import { createRoute } from '@tanstack/react-router';
import Products from '../pages/Products';
import { rootRoute } from './__root';

export const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: Products,
});
