"use client";
import AutoPlay from "embla-carousel-autoplay";
import { ReactElement, useCallback, useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import useEmblaCarousel from "embla-carousel-react";

const ImagesSlider = [
  {
    id: 1,
    srcDesktop: "/slider/Desktop-1.jpg",
    srcMobile: "/slider/MOBILE-1.jpg",
    alt: "Slider 1",
  },
  {
    id: 2,
    srcDesktop: "/slider/Desktop-2.jpg",
    srcMobile: "/slider/MOBILE-2.jpg",
    alt: "Slider 2",
  },
];

const SliderImages = (): ReactElement => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [AutoPlay({ delay: 4000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {ImagesSlider.map(({ id, ...ImageSliderProps }) => (
            <div
              key={`${id}-${ImageSliderProps.srcDesktop}`}
              className="relative flex-[0_0_100%] min-w-0 h-[360px] md:h-64 lg:h-72 xl:h-[420px] 2xl:h-[500px]"
            >
              <ImageSlider id={id} {...ImageSliderProps} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {ImagesSlider.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "bg-white opacity-100 scale-125"
                : "bg-white opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderImages;