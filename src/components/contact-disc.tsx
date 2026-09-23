import { useId } from 'react';
import { ArrowUpRight } from 'lucide-react';

type ContactDiscProps = {
  text?: string;
  href?: string;
  label?: string;
  className?: string;
};

export default function ContactDisc({
  text = 'Contact Us \u2022 Get In Touch \u2022 ',
  href = '#',
  label = 'Contact',
  className = '',
}: ContactDiscProps) {
  const pathId = `contact-disc-${useId().replace(/:/g, '')}`;

  return (
    <a
      href={href}
      aria-label={label}
      className={`relative block h-28 w-28 md:h-44 md:w-44 ${className}`}
    >
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="h-full w-full animate-spin-slow"
      >
        <defs>
          <path
            id={pathId}
            d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
            fill="none"
          />
        </defs>
        <text
          className="fill-text-primary font-display text-[15px] uppercase"
          style={{ letterSpacing: '0.32em' }}
        >
          <textPath
            href={`#${pathId}`}
            textLength={489}
            lengthAdjust="spacingAndGlyphs"
          >
            {text}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary transition-transform duration-300 hover:scale-105 md:h-16 md:w-16">
          <ArrowUpRight
            aria-hidden="true"
            className="h-5 w-5 text-on-primary md:h-6 md:w-6"
          />
        </span>
      </span>
    </a>
  );
}
