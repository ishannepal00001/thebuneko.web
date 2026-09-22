import { createContext, useContext, useMemo, useState } from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { rootRoute } from './routes/__root';
import { indexRoute } from './routes/index';
import { productsRoute } from './routes/products';
import { productDetailRoute } from './routes/product-detail';

const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute,
  productDetailRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

type MenuContextValue = {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

const MenuContext = createContext<MenuContextValue>({
  menuOpen: false,
  setMenuOpen: () => {},
});

export function useMenu() {
  return useContext(MenuContext);
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuValue = useMemo(() => ({ menuOpen, setMenuOpen }), [menuOpen]);

  return (
    <MenuContext.Provider value={menuValue}>
      <RouterProvider router={router} />
    </MenuContext.Provider>
  );
}
