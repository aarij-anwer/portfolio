'use client';

import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';

type GalleryImage = {
  src: string;
  alt: string;
};

export default function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState(-1);

  return (
    <section aria-labelledby="project-gallery" className="space-y-5">
      <div>
        <h2
          id="project-gallery"
          className="text-2xl font-semibold tracking-[-0.03em] text-on-surface"
        >
          Gallery
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant">
          A look at the core product experience, including challenge tracking,
          progress views, and leaderboard interactions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {images.map((image, imageIndex) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setIndex(imageIndex)}
            className={
              imageIndex === 0
                ? 'group relative aspect-[16/10] overflow-hidden rounded-3xl border border-outline-variant bg-surface-container-low md:col-span-12 md:aspect-[21/9]'
                : 'group relative aspect-[16/10] overflow-hidden rounded-3xl border border-outline-variant bg-surface-container-low md:col-span-4'
            }
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={imageIndex === 0}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              sizes={
                imageIndex === 0 ? '100vw' : '(max-width: 768px) 100vw, 33vw'
              }
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={images.map((image) => ({
          src: image.src,
          alt: image.alt,
        }))}
      />
    </section>
  );
}
