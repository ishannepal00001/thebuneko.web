import { Link } from '@tanstack/react-router';

const PROJECTS = [
  { id: 'midnight-lamp', name: 'Midnight Lamp', blurb: 'A soft-glow desk lamp.' },
  { id: 'clay-mug', name: 'Clay Mug', blurb: 'Hand-thrown stoneware mug.' },
  { id: 'oak-stool', name: 'Oak Stool', blurb: 'Solid oak, minimal joinery.' },
];

export default function Products() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-text">
        Products
      </h1>
      <p className="mt-2 text-text/70">
        Pick a project to see its detail page.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {PROJECTS.map((project) => (
          <li
            key={project.id}
            className="rounded-xl border border-text/10 bg-background p-5 shadow-sm transition hover:shadow"
          >
            <h2 className="text-lg font-medium text-text">{project.name}</h2>
            <p className="mt-1 text-sm text-text/70">{project.blurb}</p>
            <Link
              to="/products/$projectId"
              params={{ projectId: project.id }}
              className="mt-4 inline-block rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              Open project
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
