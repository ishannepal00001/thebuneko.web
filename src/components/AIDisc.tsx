import { useId } from 'react';
import { Sparkles } from 'lucide-react';

type AIDiscProps = {
  text?: string;
  onClick?: () => void;
  label?: string;
  className?: string;
};

/**
 * AI twin of the contact disc — rotating circular wordmark with a
 * centered action button. Used as the folded state of the chat input.
 */
export default function AIDisc({
  text = 'Ask AI \u2022 Buneko Assistant \u2022 ',
  onClick,
  label = 'Open chat',
  className = '',
}: AIDiscProps) {
  const pathId = `ai-disc-${useId().replace(/:/g, '')}`;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`relative block h-full w-full ${className}`}
    >
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="animate-spin-slow h-full w-full"
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
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary transition-transform duration-300 hover:scale-105 md:h-14 md:w-14">
          <Sparkles
            aria-hidden="true"
            className="text-on-primary h-5 w-5 md:h-6 md:w-6"
          />
        </span>
      </span>
    </button>
  );
}
