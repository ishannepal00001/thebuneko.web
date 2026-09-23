export type MenuItem = {
  label: string;
  link: string;
  ariaLabel?: string;
};

export type MenuSocialItem = {
  label: string;
  link: string;
  ariaLabel?: string;
};

export const menuItems: MenuItem[] = [
  { label: 'Home', link: '/', ariaLabel: 'Go to home' },
  { label: 'Products', link: '/products', ariaLabel: 'Browse products' },
];

export const menuSocialItems: MenuSocialItem[] = [
  {
    label: 'Instagram',
    link: 'https://instagram.com',
    ariaLabel: 'Open Instagram',
  },
  { label: 'X', link: 'https://x.com', ariaLabel: 'Open X' },
];

export type Feature = {
  title: string;
  tagline: string;
  description: string;
  points: string[];
};

export const features: Feature[] = [
  {
    title: 'Rings',
    tagline: 'Stacked bands, worn your way.',
    description:
      'Layered rings handcrafted to stack, mix and live in — from whisper-thin bands to bold signets.',
    points: ['Recycled precious metals', 'Hand-set stones', 'Made to stack'],
  },
  {
    title: 'Necklaces',
    tagline: 'Layers that sit just right.',
    description:
      'Delicate chains and sculptural pendants designed to layer along the collarbone.',
    points: ['Adjustable lengths', 'Tarnish-resistant finish', 'Pendant drops'],
  },
  {
    title: 'Bracelets',
    tagline: 'Cuffs with quiet strength.',
    description:
      'Statement cuffs and everyday bangles, balanced for comfort from morning to midnight.',
    points: ['Sculptural cuffs', 'Stackable bangles', 'Hypoallergenic'],
  },
  {
    title: 'Earrings',
    tagline: 'Light-catchers, refined.',
    description:
      'From everyday studs to sculptural drops — earrings that move with you and catch the light.',
    points: ['Secure comfort backs', 'Sculptural drops', 'Everyday studs'],
  },
];
