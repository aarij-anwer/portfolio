import { useEffect, useState, type ComponentType } from 'react';
import type { ImageAsset } from '@/lib/types';
import { cn } from '@/lib/utils';

export type GalleryProps = { images: ImageAsset[] };

// The interactive carousel (Swiper + lightbox, ~250 KB) is only needed on
// project pages, so it lives in its own chunk loaded after hydration. Until
// then (and in the pre-rendered HTML) the gallery is a plain, crawlable image
// list, so the server markup and first client render match. The list is laid
// out as a one-slide-tall strip (the rest overflow to the side), and the hint
// below it renders in both states, so swapping in the carousel doesn't shift
// the page.
export default function ProjectGallery({ images }: GalleryProps) {
  const [Carousel, setCarousel] = useState<ComponentType<GalleryProps> | null>(null);

  useEffect(() => {
    let cancelled = false;
    import('@/components/ProjectGalleryCarousel')
      .then((module) => {
        if (!cancelled) setCarousel(() => module.default);
      })
      .catch(() => {
        // Chunk failed to load (offline, or a stale hash after a redeploy):
        // keep showing the static gallery.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (images.length === 0) return null;

  return (
    <section className="space-y-4">
      {Carousel ? <Carousel images={images} /> : <StaticStrip images={images} />}
      {/* Space is reserved in both states (no layout shift), but the hint only
          shows once the carousel's arrows and fullscreen view actually exist. */}
      {images.length > 1 && (
        <p className={cn('text-center text-sm text-on-surface-variant', !Carousel && 'invisible')}>
          Swipe or use the arrows to view more images. Click any image to view it fullscreen.
        </p>
      )}
    </section>
  );
}

function StaticStrip({ images }: GalleryProps) {
  return (
    <div className="flex overflow-hidden rounded-3xl border border-outline-variant bg-surface-container-low">
      {images.map((image, imageIndex) => (
        <div key={image.src} className="relative aspect-[16/10] w-full flex-none md:aspect-[21/9]">
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading={imageIndex === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
