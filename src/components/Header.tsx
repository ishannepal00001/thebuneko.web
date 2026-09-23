import { ShoppingBag, X } from 'lucide-react';
import { Link } from '@tanstack/react-router';

type HeaderProps = {
  onMenuClick?: () => void;
  onCartClick?: () => void;
  menuOpen?: boolean;
};

export default function Header({ onMenuClick, onCartClick, menuOpen = false }: HeaderProps) {
  return (
    <header className="w-full bg-background">
      <div className="relative flex w-full items-center justify-between px-6 py-5 md:px-10">
        {/* Left-aligned wordmark — typography only */}
        <span className="font-sans text-lg font-bold uppercase leading-none tracking-[0.25em] text-text md:text-2xl md:tracking-[0.35em]">
          Buenko
        </span>

        {/* Centered navigation — desktop only, sidebar takes over on mobile */}
        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex md:gap-10"
        >
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: 'text-text underline underline-offset-8' }}
            className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-text-secondary transition-colors hover:text-text md:text-sm"
          >
            Home
          </Link>
          <Link
            to="/products"
            activeProps={{ className: 'text-text underline underline-offset-8' }}
            className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-text-secondary transition-colors hover:text-text md:text-sm"
          >
            Products
          </Link>
        </nav>

        {/* Right-aligned actions — cart icon left of the hamburger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Open cart"
            onClick={onCartClick}
            className="p-1 text-text"
          >
            <ShoppingBag aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
          </button>

          {/* Hamburger — morphs to a close icon while the sidebar is open */}
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            data-menu-toggle
            onClick={onMenuClick}
            className="flex h-8 w-8 flex-col items-center justify-center gap-[6px] p-1 text-text"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="h-6 w-6" />
            ) : (
              <>
                <span aria-hidden="true" className="block h-[2px] w-6 bg-current" />
                <span aria-hidden="true" className="block h-[2px] w-6 bg-current" />
                <span aria-hidden="true" className="block h-[2px] w-6 bg-current" />
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
