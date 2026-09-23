import Image from './Image';

export type MarqueeImage = {
  src: string;
  alt: string;
};

type MarqueeProps = {
  /** Images to loop. Defaults to the ImageKit demo set. */
  images?: MarqueeImage[];
  /** Seconds per loop. Lower = faster. */
  speed?: number;
  /** Flow direction of the loop. */
  direction?: 'ltr' | 'rtl';
  /** Size classes for each tile. Defaults to full-size tiles. */
  tileClassName?: string;
  /** Extra classes for the viewport (sizing/positioning). */
  className?: string;
};

const DEFAULT_IMAGES: MarqueeImage[] = [
  { src: 'img/image1.jpeg', alt: 'Handcrafted jewelry still life' },
  { src: 'img/image2.jpeg', alt: 'Gold ring detail' },
  { src: 'img/image4.jpeg', alt: 'Layered necklaces' },
  { src: 'img/image5.jpeg', alt: 'Sculptural cuff bracelet' },
  { src: 'img/image6.jpeg', alt: 'Earrings catching light' },
  { src: 'img/image7.jpeg', alt: 'Stacked bands close-up' },
  { src: 'img/image8.jpeg', alt: 'Pendant detail' },
  { src: 'img/image9.jpeg', alt: 'Polished gold texture' },
];

/**
 * Image marquee flowing left to right — no borders, no backgrounds,
 * just images. Content is duplicated for a seamless loop.
 */
export default function Marquee({
  images = DEFAULT_IMAGES,
  speed = 32,
  direction = 'ltr',
  tileClassName = 'h-40 w-56 mr-4 shrink-0 md:h-56 md:w-72 md:mr-6',
  className = '',
}: MarqueeProps) {
  const loop = [...images, ...images];

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`${direction === 'rtl' ? 'animate-marquee-rtl' : 'animate-marquee-ltr'} flex w-max items-center hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${speed}s` }}
      >
        {loop.map((image, index) => {
          const tile = (
            <Image
              key={`${image.src}-${index}`}
              src={image.src}
              alt={image.alt}
              bare
              className={tileClassName}
            />
          );
          // Hide the duplicated half from assistive tech
          return index >= images.length ? (
            <span key={`${image.src}-${index}`} aria-hidden="true" className="contents">
              {tile}
            </span>
          ) : (
            tile
          );
        })}
      </div>
    </div>
  );
}
