/**
 * Resource Hints Component
 * Adds preload, prefetch, and preconnect hints for critical resources
 */

export function ResourceHints() {
  return (
    <>
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />

      {/* DNS prefetch for additional domains */}
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* Preload critical fonts (if using custom fonts) */}
      {/* <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      /> */}

      {/* Preload critical images */}
      {/* <link rel="preload" as="image" href="/hero-image.webp" /> */}
    </>
  );
}

interface PreloadImageProps {
  src: string;
  as?: "image";
  type?: string;
}

export function PreloadImage({ src, as = "image", type }: PreloadImageProps) {
  return <link rel="preload" href={src} as={as} type={type} />;
}

interface PreloadFontProps {
  href: string;
  type?: "font/woff2" | "font/woff" | "font/ttf";
}

export function PreloadFont({ href, type = "font/woff2" }: PreloadFontProps) {
  return (
    <link
      rel="preload"
      href={href}
      as="font"
      type={type}
      crossOrigin="anonymous"
    />
  );
}

interface PreconnectProps {
  href: string;
  crossOrigin?: boolean;
}

export function Preconnect({ href, crossOrigin = false }: PreconnectProps) {
  return (
    <link
      rel="preconnect"
      href={href}
      crossOrigin={crossOrigin ? "anonymous" : undefined}
    />
  );
}
