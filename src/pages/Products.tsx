import { useState } from 'react';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import SplitText from '../components/SplitText';
import ProductCard from '../components/products/ProductCard';
import { PRODUCTS } from '../components/products/catalog';

export default function Products() {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const filtered = q
    ? PRODUCTS.filter((p) => `${p.title} ${p.label}`.toLowerCase().includes(q))
    : PRODUCTS;

  return (
    <div className="relative overflow-hidden bg-background text-text-primary">
      {/* Floating background — ClearProduct cutout drifting + rotating across the screen */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <motion.img
          src="/ClearProduct.png"
          alt=""
          draggable={false}
          className="absolute top-[8%] w-40 opacity-40 md:w-64"
          animate={{ x: ['-20vw', '110vw'], y: ['6vh', '-5vh', '7vh', '-3vh', '6vh'], rotate: [0, 360] }}
          transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
        />
        <motion.img
          src="/ClearProduct.png"
          alt=""
          draggable={false}
          className="absolute top-[42%] w-24 opacity-30 md:w-40"
          animate={{ x: ['110vw', '-20vw'], y: ['-4vh', '6vh', '-5vh', '4vh', '-4vh'], rotate: [360, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.img
          src="/ClearProduct.png"
          alt=""
          draggable={false}
          className="absolute top-[68%] w-32 opacity-30 md:w-52"
          animate={{ x: ['-20vw', '110vw'], y: ['-6vh', '5vh', '-7vh', '3vh', '-6vh'], rotate: [0, -360] }}
          transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Centered hero with search */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-10 pt-16 text-center md:px-10 md:pb-14 md:pt-24">
        <div className="font-sans text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-7xl">
          <div>
            <SplitText
              text="Discover"
              tag="h1"
              delay={60}
              duration={0.9}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
          </div>
          <div>
            <SplitText
              text="Our Products"
              tag="h1"
              delay={60}
              duration={0.9}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
          </div>
        </div>
        <div className="mx-auto mt-8 w-full max-w-md md:mt-10">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <div className="flex items-center gap-3 rounded-none border border-border bg-surface px-5 py-3">
            <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-text-secondary" />
            <input
              id="product-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
            />
          </div>
        </div>
      </section>

      {/* Product grid — built inline, no intermediate grid component */}
      <section className="relative z-10 mx-auto w-[90%] pb-16 md:pb-24">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                label={product.label}
                title={product.title}
                image={product.image}
              />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-sm text-text-secondary">
            No products match “{query}”. Try another search.
          </p>
        )}
      </section>
    </div>
  );
}
