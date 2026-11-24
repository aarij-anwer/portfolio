import { useEffect, useState, type ComponentType } from 'react';
import type { ImageAsset } from '@/lib/types';

export type GalleryProps = { images: ImageAsset[] };

// The interactive carousel (Swiper + lightbox, ~250 KB) is only needed on
// project pages, so it lives in its own chunk loaded after hydration. Until
// then (and in the pre-rendered HTML) the gallery is a plain, crawlable image
// list, so the server markup and first client render match.
export default function ProjectGallery({ images }: GalleryProps) {
  const [Carousel, setCarousel] = useState<ComponentType<GalleryProps> | null>(null);

  useEffect(() => {
    let cancelled = false;
    import('@/components/ProjectGalleryCarousel').then((module) => {
      if (!cancelled) setCarousel(() => module.default);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (images.length === 0) return null;
  if (Carousel) return <Carousel images={images} />;

  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-3xl border border-outline-variant bg-surface-container-low">
        {images.map((image, imageIndex) => (
          <div key={image.src} className="relative aspect-[16/10] w-full md:aspect-[21/9]">
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
    </section>
  );
}
