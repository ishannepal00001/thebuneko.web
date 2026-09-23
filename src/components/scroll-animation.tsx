import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const FADE_IN_END = 0.25;
const FADE_OUT_START = 0.85;
const FADE_OUT_END = 0.97;

type ScrollAnimationProps = {
  fromScale?: number;
  onLoadComplete?: () => void;
  children?: ReactNode;
  overlay?: ReactNode;
};

export default function ScrollAnimation({
  fromScale = 0.5,
  onLoadComplete,
  children,
  overlay,
}: ScrollAnimationProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const loadedRef = useRef(false);
  const onLoadCompleteRef = useRef(onLoadComplete);

  useEffect(() => {
    onLoadCompleteRef.current = onLoadComplete;
  }, [onLoadComplete]);

  useGSAP(
    () => {
      if (!sectionRef.current || !panelRef.current) return;

      gsap.fromTo(
        panelRef.current,
        { scale: fromScale },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
            onUpdate: (self) => {
              if (!loadedRef.current && self.progress >= 1) {
                loadedRef.current = true;
                onLoadCompleteRef.current?.();
              }
            },
          },
        },
      );

      if (overlayRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const p = self.progress;
            const opacity =
              p < FADE_IN_END
                ? p / FADE_IN_END
                : p > FADE_OUT_START
                  ? Math.max(0, 1 - (p - FADE_OUT_START) / (FADE_OUT_END - FADE_OUT_START))
                  : 1;
            gsap.set(overlayRef.current, { autoAlpha: opacity });
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [fromScale] },
  );

  return (
    <section ref={sectionRef} className="relative h-[300svh] bg-background">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div
          ref={panelRef}
          className="absolute inset-0 will-change-transform"
        >
          {children ?? <div className="h-full w-full bg-background-accent" />}
        </div>
        {overlay ? (
          <div ref={overlayRef} className="absolute inset-0 opacity-0">
            {overlay}
          </div>
        ) : null}
      </div>
    </section>
  );
}
