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
