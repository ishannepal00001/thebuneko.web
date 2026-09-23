import { createRoute } from '@tanstack/react-router';
import Cart from '../pages/Cart';
import { rootRoute } from './__root';

export const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: Cart,
});
