import { createRoute } from '@tanstack/react-router';
import ProductDetail from '../pages/ProductDetail';
import { rootRoute } from './__root';

export const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products/$projectId',
  component: ProductDetail,
});
