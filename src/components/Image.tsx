type ImageKitTransformation = {
  /** Desired width (px). Maps to ImageKit `w-` */
  width?: number;
  /** Desired height (px). Maps to ImageKit `h-` */
  height?: number;
  /** Quality 1-100. Maps to ImageKit `q-` */
  quality?: number;
  /** Crop focus, e.g. `auto`, `centre`, `face`. Maps to ImageKit `fo-` */
  focus?: string;
  /** Raw ImageKit transformation string appended as-is, e.g. `e-grayscale` */
  raw?: string;
};

type ImageProps = {
  /** ImageKit file path (e.g. `img/image1.jpeg`) or a full ImageKit URL. */
  src: string;
  alt: string;
  /** ImageKit URL endpoint. Defaults to `VITE_IMAGEKIT_URL_ENDPOINT` or the public demo endpoint. */
  urlEndpoint?: string;
  /** Transformation applied via `tr:` params. Defaults to auto format. */
  transformation?: ImageKitTransformation;
  /** Wrapper classes — sizing/positioning. Defaults to filling the parent. */
  className?: string;
  /** Extra classes for the inner `<img>`. */
  imgClassName?: string;
  /** Eager-load above-the-fold images (sets fetchpriority + eager loading). */
  eager?: boolean;
  /** Strip border, background and rounding — just the image (e.g. for marquees). */
  bare?: boolean;
  /** Responsive widths used to build `srcSet`. Set to `[]` to disable. */
  responsiveWidths?: number[];
};

const DEFAULT_ENDPOINT = 'https://ik.imagekit.io/demo';

function getEndpoint(explicit?: string): string {
  const fromEnv =
    typeof import.meta !== 'undefined'
      ? (import.meta.env?.VITE_IMAGEKIT_URL_ENDPOINT as string | undefined)
      : undefined;
  return (explicit ?? fromEnv ?? DEFAULT_ENDPOINT).replace(/\/$/, '');
}

function buildTransformationString(t?: ImageKitTransformation): string {
  const parts: string[] = ['f-auto'];
  if (t?.width) parts.push(`w-${t.width}`);
  if (t?.height) parts.push(`h-${t.height}`);
  if (t?.quality) parts.push(`q-${t.quality}`);
  if (t?.focus) parts.push(`fo-${t.focus}`);
  if (t?.raw) parts.push(t.raw);
  return parts.join(',');
}

/**
 * Split a full ImageKit delivery URL back into endpoint + path so callers
 * can pass either a relative path or a complete URL.
 */
function splitSrc(src: string, endpoint: string): { base: string; path: string } {
  const cleanSrc = src.trim();
  if (/^https?:\/\//i.test(cleanSrc)) {
    try {
      const url = new URL(cleanSrc);
      // If it already points at this endpoint, reuse its pathname.
      if (cleanSrc.startsWith(endpoint)) {
        const path = url.pathname.replace(/^\/+/, '').replace(/^tr:[^/]+\//, '');
        return { base: endpoint, path };
      }
      // Foreign absolute URL (non-ImageKit) — return untouched.
      return { base: '', path: cleanSrc };
    } catch {
      return { base: '', path: cleanSrc };
    }
  }
  return { base: endpoint, path: cleanSrc.replace(/^\/+/, '') };
}

export function buildImageKitUrl(
  src: string,
  endpoint: string,
  transformation?: ImageKitTransformation,
): string {
  const { base, path } = splitSrc(src, endpoint);
  // Non-ImageKit absolute URL — don't touch it.
  if (!base) return path;
  const tr = buildTransformationString(transformation);
  return `${base}/tr:${tr}/${path}`;
}

/**
 * ImageKit-backed image card — no roundness, no text, just the image
 * with a thin theme border. Grid parents should use `gap-0` so the
 * per-image borders form the grid lines with no gaps.
 */
export default function Image({
  src,
  alt,
  urlEndpoint,
  transformation,
  imgClassName = '',
  eager = false,
  responsiveWidths = [480, 768, 1024, 1366],
  bare = false,
  className = 'h-full w-full',
}: ImageProps) {
  const endpoint = getEndpoint(urlEndpoint);

  const baseTr: ImageKitTransformation = {
    quality: 80,
    ...transformation,
  };

  const srcUrl = buildImageKitUrl(src, endpoint, baseTr);

  const srcSet =
    responsiveWidths.length > 0
      ? responsiveWidths
          .map((w) => `${buildImageKitUrl(src, endpoint, { ...baseTr, width: w })} ${w}w`)
          .join(', ')
      : undefined;

  return (
    <figure className={bare ? `block overflow-hidden ${className}` : `block overflow-hidden rounded-md border border-border bg-surface ${className}`}>
      <img
        src={srcUrl}
        srcSet={srcSet}
        sizes="(max-width: 768px) 50vw, 25vw"
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        draggable={false}
        className={`block h-full w-full rounded-none object-cover ${imgClassName}`}
      />
    </figure>
  );
}
