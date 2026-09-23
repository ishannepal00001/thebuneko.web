import { Minus, Plus, X } from 'lucide-react';

export type CartProduct = {
  id: string;
  title: string;
  image: string;
  ageRange: string;
  gender: string;
  deliveryInfo: string;
  price: number;
  quantity: number;
};

type ProductCardProps = {
  item: CartProduct;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

export default function ProductCard({
  item,
  onUpdateQuantity,
  onRemove,
}: ProductCardProps) {
  return (
    <article className="relative flex gap-4 py-6 first:pt-0 last:pb-0">
      {/* Image */}
      <div className="h-28 w-24 shrink-0 overflow-hidden border border-border bg-surface sm:h-32 sm:w-28">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="truncate font-sans text-sm font-bold uppercase tracking-wide text-text-primary sm:text-base">
          {item.title}
        </h3>
        <p className="mt-1 text-xs font-light text-text-secondary">
          {item.ageRange} &middot; {item.gender} &middot; {item.deliveryInfo}
        </p>
        <p className="mt-2 font-sans text-sm font-black text-text-primary sm:text-base">
          &#8377;{(item.price * item.quantity).toLocaleString('en-IN')}
        </p>

        {/* Quantity stepper */}
        <div className="mt-3 flex w-fit items-center border border-border">
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
            disabled={item.quantity <= 1}
            aria-label={`Decrease quantity of ${item.title}`}
            className="flex h-8 w-8 items-center justify-center text-text-primary transition-colors hover:bg-surface disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <Minus aria-hidden="true" className="h-3.5 w-3.5" />
          </button>
          <span
            aria-live="polite"
            className="w-8 text-center font-sans text-sm font-bold tabular-nums"
          >
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            aria-label={`Increase quantity of ${item.title}`}
            className="flex h-8 w-8 items-center justify-center text-text-primary transition-colors hover:bg-surface"
          >
            <Plus aria-hidden="true" className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        aria-label={`Remove ${item.title}`}
        className="absolute right-0 top-6 flex h-7 w-7 items-center justify-center text-text-secondary transition-colors hover:text-text-primary"
      >
        <X aria-hidden="true" className="h-4 w-4" />
      </button>
    </article>
  );
}
