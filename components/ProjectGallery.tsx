'use client';

import Image from 'next/image';
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type GalleryImage = {
  src: string;
  alt: string;
};

interface ProjectGalleryProps {
  images: GalleryImage[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const hasMultipleImages = images.length > 1;

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-3xl border border-outline-variant bg-surface-container-low">
        <Swiper
          modules={[Navigation, Pagination, Keyboard, A11y]}
          slidesPerView={1}
          navigation={hasMultipleImages}
          pagination={
            hasMultipleImages
              ? {
                  clickable: true,
                }
              : false
          }
          keyboard={{
            enabled: true,
          }}
          loop={hasMultipleImages}
          className="project-gallery-swiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.src}>
              <div className="relative aspect-[16/10] w-full md:aspect-[21/9]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {hasMultipleImages && (
        <p className="text-center text-sm text-on-surface-variant">
          Swipe or use the arrows to view more images.
        </p>
      )}
    </section>
  );
}
