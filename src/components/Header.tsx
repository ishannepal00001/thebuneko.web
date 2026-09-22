type HeaderProps = {
  onMenuClick?: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="w-full bg-background">
      <div className="flex w-full items-center justify-between px-6 py-5 md:px-10">
        {/* Left-aligned wordmark — typography only */}
        <span className="font-sans text-xl font-bold uppercase leading-none tracking-[0.35em] text-text md:text-2xl">
          Buenko
        </span>

        {/* Right-aligned hamburger — exactly three bars */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={onMenuClick}
          className="flex flex-col items-center justify-center gap-[6px] p-1 text-text"
        >
          <span aria-hidden="true" className="block h-[2px] w-6 bg-current" />
          <span aria-hidden="true" className="block h-[2px] w-6 bg-current" />
          <span aria-hidden="true" className="block h-[2px] w-6 bg-current" />
        </button>
      </div>
    </header>
  );
}
