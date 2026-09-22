import { Link } from '@tanstack/react-router';

export default function Home() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-text">
        Home
      </h1>
      <p className="max-w-xl text-text/80">
        Welcome to Buneko. Browse our products or open a project directly.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/products"
          className="rounded-lg bg-primary px-5 py-2.5 font-medium text-white transition hover:opacity-90"
        >
          View Products
        </Link>
        <Link
          to="/products/$projectId"
          params={{ projectId: 'demo-project' }}
          className="rounded-lg border border-secondary/40 bg-background px-5 py-2.5 font-medium text-text transition hover:border-secondary"
        >
          Open demo project
        </Link>
      </div>
    </section>
  );
}
