export type ProductColor = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  label: string;
  title: string;
  image: string;
  images: string[];
  description: string;
  price: number;
  colors: ProductColor[];
};

const img = (n: number, w = 900) =>
  `https://ik.imagekit.io/demo/tr:w-${w},q-70,f-auto/img/image${n}.jpeg`;

export const YARN_COLORS: ProductColor[] = [
  { name: 'Rose', hex: '#CE8F96' },
  { name: 'Cream', hex: '#F5E3D8' },
  { name: 'Olive', hex: '#7D8B5A' },
  { name: 'Cocoa', hex: '#4A2D1B' },
  { name: 'Terracotta', hex: '#B4552D' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'cloud-soft-cardigan',
    label: 'Best Seller',
    title: 'Cloud Soft Cardigan',
    image: img(1),
    images: [img(1), img(2), img(4), img(5)],
    description:
      'A cloud-soft everyday cardigan hand-crocheted in breathable cotton blend. Relaxed fit with ribbed cuffs that hold their shape.',
    price: 2499,
    colors: YARN_COLORS,
  },
  {
    id: 'sunday-market-tote',
    label: 'New Arrival',
    title: 'Sunday Market Tote',
    image: img(2),
    images: [img(2), img(6), img(7), img(1)],
    description:
      'A sturdy open-weave tote that carries groceries, yarn, and everything in between. Reinforced handles for heavy market days.',
    price: 899,
    colors: YARN_COLORS,
  },
  {
    id: 'honeycomb-throw',
    label: 'Best Seller',
    title: 'Honeycomb Throw',
    image: img(4),
    images: [img(4), img(8), img(9), img(2)],
    description:
      'A weighty honeycomb-stitch throw for slow evenings. Generously sized to share, soft enough to fight over.',
    price: 3299,
    colors: YARN_COLORS,
  },
  {
    id: 'daisy-granny-coasters',
    label: 'Only Two Left',
    title: 'Daisy Granny Coasters',
    image: img(5),
    images: [img(5), img(1), img(6), img(4)],
    description:
      'A set of four daisy-motif coasters in colorfast cotton. Cheerful protection for every table in the house.',
    price: 499,
    colors: YARN_COLORS,
  },
  {
    id: 'moonlight-beanie',
    label: 'New Arrival',
    title: 'Moonlight Beanie',
    image: img(6),
    images: [img(6), img(5), img(2), img(7)],
    description:
      'A snug ribbed beanie with a folded brim for extra warmth. One size fits most, softness fits all.',
    price: 699,
    colors: YARN_COLORS,
  },
  {
    id: 'picnic-blanket',
    label: 'Best Seller',
    title: 'Picnic Blanket',
    image: img(7),
    images: [img(7), img(9), img(4), img(8)],
    description:
      'A hard-wearing striped blanket made for grass, sand, and backseats. Folds small, spreads wide.',
    price: 2799,
    colors: YARN_COLORS,
  },
  {
    id: 'rosebud-headband',
    label: 'Only Two Left',
    title: 'Rosebud Headband',
    image: img(8),
    images: [img(8), img(2), img(1), img(9)],
    description:
      'A delicate rosebud headband with a comfortable elastic back. Keeps hair in place, beautifully.',
    price: 449,
    colors: YARN_COLORS,
  },
  {
    id: 'cottage-mug-cozy',
    label: 'New Arrival',
    title: 'Cottage Mug Cozy',
    image: img(9),
    images: [img(9), img(4), img(6), img(5)],
    description:
      'A chunky buttoned cozy that keeps drinks warm and hands happy. Fits standard mugs with room to spare.',
    price: 349,
    colors: YARN_COLORS,
  },
];

export function formatINR(price: number): string {
  return `₹${price.toLocaleString('en-IN')} INR`;
}
