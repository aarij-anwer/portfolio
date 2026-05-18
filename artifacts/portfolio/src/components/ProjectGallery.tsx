import { useRef } from 'react';
// @ts-ignore
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules';
// @ts-ignore
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
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div className="relative overflow-hidden rounded-3xl border border-outline-variant bg-surface-container-low">
        <Swiper
          modules={[Navigation, Pagination, Keyboard, A11y]}
          slidesPerView={1}
          navigation={
            hasMultipleImages
              ? {
                  prevEl: prevButtonRef.current,
                  nextEl: nextButtonRef.current,
                }
              : false
          }
          onBeforeInit={(swiper: any) => {
            if (!hasMultipleImages) return;
            const navigation = swiper.params.navigation;
            if (navigation && typeof navigation !== 'boolean') {
              navigation.prevEl = prevButtonRef.current;
              navigation.nextEl = nextButtonRef.current;
            }
          }}
          pagination={hasMultipleImages ? { clickable: true } : false}
          keyboard={{ enabled: true }}
          loop={hasMultipleImages}
          className="project-gallery-swiper"
        >
          {images.map((image) => (
            <SwiperSlide key={image.src}>
              <div className="relative aspect-[16/10] w-full md:aspect-[21/9]">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {hasMultipleImages ? (
          <>
            <button
              ref={prevButtonRef}
              type="button"
              aria-label="Previous image"
              className="project-gallery-arrow project-gallery-arrow-prev"
            >
              &lt;
            </button>
            <button
              ref={nextButtonRef}
              type="button"
              aria-label="Next image"
              className="project-gallery-arrow project-gallery-arrow-next"
            >
              &gt;
            </button>
          </>
        ) : null}
      </div>

      {hasMultipleImages && (
        <p className="text-center text-sm text-on-surface-variant">
          Swipe or use the arrows to view more images.
        </p>
      )}
    </section>
  );
}
