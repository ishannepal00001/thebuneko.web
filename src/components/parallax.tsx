import { Background, Parallax } from 'react-parallax';
import type { ReactNode } from 'react';

type ParallaxSectionProps = {
  background: ReactNode;
  strength?: number;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
};

export default function ParallaxSection({
  background,
  strength = 300,
  disabled = false,
  className = '',
  contentClassName = '',
  children,
}: ParallaxSectionProps) {
  return (
    <Parallax
      strength={strength}
      disabled={disabled}
      className={`relative overflow-hidden bg-background ${className}`}
      contentClassName={`relative ${contentClassName}`}
      bgStyle={{ top: 0, height: '150%', width: '100%' }}
    >
      <Background className="h-full w-full">{background}</Background>
      {children}
    </Parallax>
  );
}
