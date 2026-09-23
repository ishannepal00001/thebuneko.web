import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ProductCard, { type CartProduct } from '../components/cart/productcard';
import { PRODUCTS } from '../components/products/catalog';

const COUPON_DISCOUNT = 200;

function toCartItems(): CartProduct[] {
  const meta = [
    { ageRange: 'Age 2-4 Y', gender: 'Unisex', deliveryInfo: 'Express delivery in 3 days' },
    { ageRange: 'Age 4-6 Y', gender: 'Girls', deliveryInfo: 'Express delivery in 3 days' },
    { ageRange: 'Age 0-2 Y', gender: 'Boys', deliveryInfo: 'Standard delivery in 5 days' },
  ];
  return PRODUCTS.slice(0, 3).map((p, i) => ({
    id: p.id,
    title: p.title,
    image: p.image,
    ageRange: meta[i % meta.length].ageRange,
    gender: meta[i % meta.length].gender,
    deliveryInfo: meta[i % meta.length].deliveryInfo,
    price: p.price,
    quantity: i + 1,
  }));
}

export default function Cart() {
  const [items, setItems] = useState<CartProduct[]>(toCartItems);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const totalCount = items.length;

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = items.length > 0 ? COUPON_DISCOUNT : 0;
  const total = Math.max(0, subtotal - discount);

  const updateQuantity = (id: string, quantity: number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const removeAll = () => setItems([]);

  return (
    <div className="bg-background text-text-primary">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 py-10 md:px-10 lg:grid-cols-[1fr_360px]">
        {/* LEFT SECTION: Products */}
        <section aria-label="Cart products">
          {/* Items row */}
          <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
            <span className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-text-primary">
              {totalCount} item{totalCount === 1 ? '' : 's'}
            </span>
            <button
              type="button"
              onClick={removeAll}
              className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-text-secondary transition-colors hover:text-text-primary"
            >
              Remove
            </button>
          </div>

          {/* Product list */}
          <div className="divide-y divide-border">
            {items.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
            {items.length === 0 && (
              <p className="py-10 text-center text-sm font-light text-text-secondary">
                Your cart is empty.
              </p>
            )}
          </div>
        </section>

        {/* RIGHT SECTION: Checkout */}
        <section aria-label="Checkout" className="flex flex-col gap-6">
          {/* 1. Number input */}
          <div className="border border-border bg-surface/40 p-5">
            <h2 className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-text-secondary">
              Number
            </h2>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              aria-label="Phone number"
              className="mt-4 w-full border border-border bg-background px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-secondary focus:border-text-primary"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              aria-label="Name"
              className="mt-3 w-full border border-border bg-background px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-secondary focus:border-text-primary"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              aria-label="Email"
              className="mt-3 w-full border border-border bg-background px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-secondary focus:border-text-primary"
            />
          </div>

          {/* 2. Price Details */}
          <div className="border border-border bg-surface/40 p-5">
            <h2 className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-text-secondary">
              Price Details
            </h2>
            <p className="mt-4 text-sm font-medium text-text-primary">
              {totalCount} item{totalCount === 1 ? '' : 's'}
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {items.map((i) => (
                <div key={i.id} className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="min-w-0 flex-1 truncate font-light text-text-secondary">
                    {i.quantity} x {i.title}
                  </span>
                  <span className="shrink-0 font-medium tabular-nums text-text-primary">
                    &#8377;{(i.price * i.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
              {items.length === 0 && (
                <p className="text-sm font-light text-text-secondary">No items in cart.</p>
              )}
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="font-light text-text-secondary">Coupon discount</span>
              <span className="font-medium tabular-nums text-secondary">
                -&#8377;{discount.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="font-light text-text-secondary">Delivery charges</span>
              <span className="font-medium text-secondary">Free Delivery</span>
            </div>
            <hr className="my-4 border-border" />
            <div className="flex items-center justify-between">
              <span className="font-sans text-sm font-bold uppercase tracking-[0.15em] text-text-primary">
                Total Amount
              </span>
              <span className="font-sans text-lg font-black tabular-nums text-text-primary">
                &#8377;{total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* 3. Place order */}
          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 bg-text-primary px-6 py-4 font-sans text-xs font-medium uppercase tracking-[0.25em] text-background transition-colors hover:bg-accent"
          >
            Place order
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </section>
      </div>
    </div>
  );
}
