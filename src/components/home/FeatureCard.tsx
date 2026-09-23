import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import FlipCard from './FlipCard';
import type { Feature } from '../../dummydata';

type FeatureCardProps = {
  feature: Feature;
  index: number;
};

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="h-full w-full"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <FlipCard
        flipped={flipped}
        onFlipChange={setFlipped}
        width="100%"
        height="100%"
        radius={0}
        tiltMax={8}
        hoverScale={1.01}
        shadow={false}
        glare={false}
        background="transparent"
        color="var(--color-text-primary)"
        ariaLabel={`${feature.title} feature card`}
        className="h-full w-full"
        front={
          <div className="flex h-full w-full flex-col justify-between p-6 md:p-8">
            <span className="font-display text-sm tracking-[0.2em] text-text-secondary">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-display text-3xl uppercase tracking-[0.08em] md:text-4xl">
                {feature.title}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-text-secondary md:text-sm">
                {feature.tagline}
              </p>
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-text-secondary">
              Hover to flip
            </span>
          </div>
        }
        back={
          <div className="flex h-full w-full flex-col justify-between p-6 md:p-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-text-secondary">
                Signature
              </p>
              <h3 className="mt-2 font-display text-2xl uppercase tracking-[0.06em] md:text-3xl">
                {feature.title}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-text-secondary md:text-sm">
                {feature.description}
              </p>
              <ul className="mt-4 space-y-2">
                {feature.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 text-xs md:text-sm"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-4 shrink-0 bg-text-secondary"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] underline underline-offset-4">
              Explore design
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </span>
          </div>
        }
      />
    </div>
  );
}
