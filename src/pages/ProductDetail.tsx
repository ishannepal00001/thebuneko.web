import { useState } from 'react';
import { Link, getRouteApi } from '@tanstack/react-router';
import { Check, Minus, Plus, ShoppingBag } from 'lucide-react';
import { PRODUCTS, formatINR } from '../components/products/catalog';

const routeApi = getRouteApi('/products/$projectId');

export default function ProductDetail() {
  const { projectId } = routeApi.useParams();
  const product = PRODUCTS.find((p) => p.id === projectId);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <section className="mx-auto w-full max-w-3xl px-6 py-16 text-center">
        <h1 className="font-sans text-3xl font-black uppercase text-text-primary">
          Product not found
        </h1>
        <Link
          to="/products"
          className="mt-6 inline-block rounded-none bg-text-primary px-6 py-2.5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-background"
        >
          Back to products
        </Link>
      </section>
    );
  }

  const handleAdd = () => {
    if (!selectedColor) return;
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="bg-background text-text-primary">
      <section className="mx-auto w-full max-w-6xl px-6 py-10 md:px-10 md:py-16">
        <Link
          to="/products"
          className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-text-secondary transition-colors hover:text-text"
        >
          &larr; Back to products
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          {/* Left — image gallery */}
          <div>
            <div className="overflow-hidden border border-border bg-surface">
              <img
                key={product.images[activeImage]}
                src={product.images[activeImage]}
                alt={product.title}
                className="aspect-square w-full object-cover"
                draggable={false}
              />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1} of ${product.title}`}
                  aria-pressed={i === activeImage}
                  className={`overflow-hidden border bg-surface transition-all ${
                    i === activeImage
                      ? 'border-text-primary ring-1 ring-text-primary'
                      : 'border-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    draggable={false}
                    className="aspect-square w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right — info / purchase panel */}
          <div className="flex flex-col">
            <span className="w-fit rounded-none bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-on-primary">
              {product.label}
            </span>
            <h1 className="mt-4 font-sans text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl">
              {product.title}
            </h1>
            <p className="mt-4 line-clamp-2 text-sm font-light leading-relaxed text-text-secondary md:text-base">
              {product.description}
            </p>
            <p className="mt-5 font-sans text-2xl font-black md:text-3xl">
              {formatINR(product.price)}
            </p>

            {/* Color selector */}
            <div className="mt-8">
              <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-text-secondary">
                Color{selectedColor ? ` — ${selectedColor}` : ''}
              </p>
              <div className="mt-3 flex items-center gap-3">
                {product.colors.map((color) => {
                  const selected = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      title={color.name}
                      aria-label={`Select color ${color.name}`}
                      aria-pressed={selected}
                      style={{ backgroundColor: color.hex }}
                      className={`h-9 w-9 transition-all ${
                        selected
                          ? 'ring-2 ring-text-primary ring-offset-2 ring-offset-background'
                          : 'opacity-80 hover:opacity-100 hover:ring-1 hover:ring-text-secondary hover:ring-offset-2 hover:ring-offset-background'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Quantity selector */}
            <div className="mt-8">
              <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-text-secondary">
                Quantity
              </p>
              <div className="mt-3 flex w-fit items-center border border-border">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="flex h-11 w-11 items-center justify-center text-text-primary transition-colors hover:bg-surface disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <Minus aria-hidden="true" className="h-4 w-4" />
                </button>
                <span
                  aria-live="polite"
                  className="w-12 text-center font-sans text-base font-bold tabular-nums"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="flex h-11 w-11 items-center justify-center text-text-primary transition-colors hover:bg-surface"
                >
                  <Plus aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              type="button"
              onClick={handleAdd}
              disabled={!selectedColor}
              className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-none px-6 py-4 font-sans text-xs font-medium uppercase tracking-[0.25em] transition-colors ${
                selectedColor
                  ? added
                    ? 'bg-secondary text-on-primary'
                    : 'bg-text-primary text-background hover:bg-accent'
                  : 'cursor-not-allowed bg-border/50 text-text-secondary'
              }`}
            >
              {added ? (
                <Check aria-hidden="true" className="h-4 w-4" />
              ) : (
                <ShoppingBag aria-hidden="true" className="h-4 w-4" />
              )}
              {added ? 'Added to Cart' : 'Add to Cart'}
            </button>
            {!selectedColor && (
              <p className="mt-3 text-xs font-light text-text-secondary">
                Select a color to add this piece to your cart.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
