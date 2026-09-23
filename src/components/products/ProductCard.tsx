import { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Check, ShoppingBag } from 'lucide-react';
import MaskedHeading from '../MaskedHeading';

type ProductCardProps = {
  id: string;
  label: string;
  title: string;
  image: string;
  onAddToCart?: (id: string) => void;
};

export default function ProductCard({ id, label, title, image, onAddToCart }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    []
  );

  const handleAdd = () => {
    onAddToCart?.(id);
    setAdded(true);
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1600);
  };
  return (
    <article className="group relative flex min-h-80 flex-col justify-between overflow-hidden rounded-none border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(74,45,27,0.5)]">
      {/* Full-bleed image */}
      <img
        src={image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {/* Legibility scrims */}
      <div aria-hidden="true" className="absolute inset-0 bg-text-primary/15" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent"
      />

      <div className="relative z-30 flex items-start justify-between gap-3">
        <span className="rounded-none bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-on-primary">
          {label}
        </span>
        <Link
          to="/products/$projectId"
          params={{ projectId: id }}
          aria-label={`View ${title}`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-none border border-background/40 bg-background text-text-primary transition-colors hover:bg-text-primary hover:text-background"
        >
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>

      <h3 className="relative z-10 mt-16 text-lg font-bold text-background">{title}</h3>

      {/* Hover overlay — white cover with the item name in animated masked type */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 bg-background p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <MaskedHeading
          text={title}
          tag="h3"
          src={image}
          trigger="hover"
          reveal="rise"
          align="center"
          weight={800}
          textScale={0.1}
          className="font-sans uppercase"
        />
        <motion.button
          type="button"
          onClick={handleAdd}
          whileTap={{ scale: 0.93 }}
          animate={added ? { scale: [1, 1.07, 1] } : { scale: 1 }}
          transition={{ duration: 0.35 }}
          className={`inline-flex items-center gap-2 rounded-none px-6 py-2.5 font-sans text-xs font-medium uppercase tracking-[0.2em] transition-colors ${
            added ? 'bg-secondary text-on-primary' : 'bg-text-primary text-background hover:bg-accent'
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={added ? 'added' : 'add'}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center gap-2"
            >
              {added ? (
                <Check aria-hidden="true" className="h-4 w-4" />
              ) : (
                <ShoppingBag aria-hidden="true" className="h-4 w-4" />
              )}
              {added ? 'Added' : 'Add to Cart'}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </article>
  );
}
