import type { CSSProperties, ReactElement, ReactNode } from 'react';

export type ParallaxProps = {
  bgImage?: string;
  bgImageAlt?: string;
  bgImageSrcSet?: string;
  bgImageSizes?: string;
  bgImageStyle?: CSSProperties;
  bgStyle?: CSSProperties;
  bgClassName?: string;
  contentClassName?: string;
  className?: string;
  strength?: number;
  blur?: number | { min: number; max: number };
  disabled?: boolean;
  parent?: Element;
  style?: CSSProperties;
  children?: ReactNode;
};

export function Parallax(props: ParallaxProps): ReactElement;

export type BackgroundProps = {
  className?: string;
  children?: ReactNode;
};

export function Background(props: BackgroundProps): ReactElement;
