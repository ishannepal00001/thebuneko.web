import { Link, getRouteApi } from '@tanstack/react-router';

const routeApi = getRouteApi('/products/$projectId');

export default function ProductDetail() {
  const { projectId } = routeApi.useParams();

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-12">
      <Link
        to="/products"
        className="text-sm font-medium text-primary hover:underline"
      >
        &larr; Back to products
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-text">
        Project: {projectId}
      </h1>
      <p className="mt-2 text-text/70">
        This is the detail page for project ID{' '}
        <code className="rounded bg-text/5 px-1.5 py-0.5 font-mono text-sm">
          {projectId}
        </code>
        .
      </p>
    </section>
  );
}
