import Image from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  quality = 85,
  sizes,
  objectFit = "cover",
}: OptimizedImageProps) {
  // Default sizes for responsive images
  const defaultSizes = sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

  const imageProps = {
    src,
    alt,
    quality,
    className: cn(className),
    priority,
    ...(fill
      ? {
          fill: true,
          sizes: defaultSizes,
          style: { objectFit },
        }
      : {
          width,
          height,
          sizes: defaultSizes,
        }),
  };

  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...imageProps} />;
}

interface BackgroundImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
  overlayOpacity?: number;
}

export function BackgroundImage({
  src,
  alt,
  priority = false,
  className,
  children,
  overlay = false,
  overlayOpacity = 0.5,
}: BackgroundImageProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={85}
        className="object-cover"
        sizes="100vw"
      />
      {overlay && (
        <div
          className="absolute inset-0 bg-black z-10"
          style={{ opacity: overlayOpacity }}
        />
      )}
      {children && <div className="relative z-20">{children}</div>}
    </div>
  );
}

interface HeroImageProps {
  src: string;
  alt: string;
  mobileImage?: string;
  priority?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function HeroImage({
  src,
  alt,
  mobileImage,
  priority = true,
  className,
  children,
}: HeroImageProps) {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Desktop image */}
      <div className="hidden md:block relative w-full h-[500px] lg:h-[600px]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Mobile image */}
      <div className="md:hidden relative w-full h-[400px]">
        <Image
          src={mobileImage || src}
          alt={alt}
          fill
          priority={priority}
          quality={85}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {children && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {children}
        </div>
      )}
    </div>
  );
}

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  placeholder = "empty",
  blurDataURL,
}: LazyImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className={cn(className)}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      quality={80}
    />
  );
}
