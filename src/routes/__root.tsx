import { Outlet, createRootRoute } from '@tanstack/react-router';
import Header from '../components/Header';
import { StaggeredMenu } from '../components/staggeredmenu';
import { menuItems, menuSocialItems } from '../dummydata';
import { useMenu } from '../App';

function RootLayout() {
  const { menuOpen, setMenuOpen } = useMenu();

  return (
    <div className="min-h-screen bg-background text-text">
      <Header
        menuOpen={menuOpen}
        onMenuClick={() => setMenuOpen(!menuOpen)}
      />
      <StaggeredMenu
        open={menuOpen}
        onRequestClose={() => setMenuOpen(false)}
        items={menuItems}
        socialItems={menuSocialItems}
      />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export const rootRoute = createRootRoute({
  component: RootLayout,
});
