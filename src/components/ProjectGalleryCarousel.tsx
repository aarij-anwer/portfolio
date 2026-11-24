import { useRef, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
// @ts-ignore
import { A11y, Keyboard, Pagination } from 'swiper/modules';
// @ts-ignore
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './project-gallery.css';
import type { GalleryProps } from '@/components/ProjectGallery';

// Interactive gallery: Swiper carousel + fullscreen lightbox. Loaded lazily by
// ProjectGallery after hydration.
export default function ProjectGalleryCarousel({ images }: GalleryProps) {
  const hasMultipleImages = images.length > 1;
  const swiperRef = useRef<any>(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const lightboxSlides = images.map((image) => ({
    src: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
  }));

  return (
    <>
      <section className="space-y-4">
        <div className="relative overflow-hidden rounded-3xl border border-outline-variant bg-surface-container-low">
          <Swiper
            modules={[Pagination, Keyboard, A11y]}
            slidesPerView={1}
            onSwiper={(swiper: any) => {
              swiperRef.current = swiper;
            }}
            pagination={hasMultipleImages ? { clickable: true } : false}
            keyboard={{ enabled: true }}
            loop={hasMultipleImages}
            className="project-gallery-swiper"
          >
            {images.map((image, imageIndex) => (
              <SwiperSlide key={image.src}>
                <button
                  type="button"
                  aria-label={`Open ${image.alt} fullscreen`}
                  className="relative block aspect-[16/10] w-full cursor-zoom-in border-0 bg-transparent p-0 text-left md:aspect-[21/9]"
                  onClick={() => setLightboxIndex(imageIndex)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading={imageIndex === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>

          {hasMultipleImages ? (
            <>
              <button
                type="button"
                aria-label="Previous image"
                className="project-gallery-arrow project-gallery-arrow-prev"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                &lt;
              </button>
              <button
                type="button"
                aria-label="Next image"
                className="project-gallery-arrow project-gallery-arrow-next"
                onClick={() => swiperRef.current?.slideNext()}
              >
                &gt;
              </button>
            </>
          ) : null}
        </div>

        {hasMultipleImages && (
          <p className="text-center text-sm text-on-surface-variant">
            Swipe or use the arrows to view more images. Click any image to view it fullscreen.
          </p>
        )}
      </section>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={lightboxSlides}
      />
    </>
  );
}
