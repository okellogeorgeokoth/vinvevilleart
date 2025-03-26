"use client";
import AutoPlay from "embla-carousel-autoplay";
import { ReactElement, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ImageSlider from "../ImageSlider";

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

type DotButtonProps = {
  onClick: () => void;
  isSelected: boolean;
};

const DotButton = ({ onClick, isSelected }: DotButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
      isSelected ? "bg-white opacity-100 scale-125" : "bg-white opacity-50"
    }`}
    aria-label={isSelected ? "Current slide" : "Go to slide"}
  />
);

const useDotButton = (emblaApi: ReturnType<typeof useEmblaCarousel>[1]) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onInit();
    onSelect();
    emblaApi.on("reInit", onInit);
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onInit);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

const SliderImages = (): ReactElement => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    AutoPlay({ delay: 4000, stopOnInteraction: false }),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  return (
    <div className="embla relative w-full overflow-hidden">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex">
          {ImagesSlider.map(({ id, ...ImageSliderProps }) => (
            <div
              key={`${id}-${ImageSliderProps.srcDesktop}`}
              className="embla__slide flex-[0_0_100%] min-w-0 relative h-[360px] md:h-64 lg:h-72 xl:h-[420px] 2xl:h-[500px]"
            >
              <ImageSlider id={id} {...ImageSliderProps} />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__dots absolute bottom-4 left-0 right-0 flex justify-center">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            isSelected={index === selectedIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderImages;