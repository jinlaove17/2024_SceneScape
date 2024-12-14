import { useState, useRef, useEffect } from "react";

import CarouselItem from "./CarouselItem";

const AUTO_SLIDE_TIME = 8_000;

const Carousel = ({ carouselContents }) => {
  const [index, setIndex] = useState(0);
  const slideInterval = useRef(null);

  useEffect(() => {
    slideAutomatically(AUTO_SLIDE_TIME);
    return () => clearInterval(slideInterval.current);
  }, []);

  const slideAutomatically = (slideTime) => {
    slideInterval.current = setInterval(() => {
      setIndex((index) => (index + 1) % carouselContents.length);
    }, slideTime);
  };

  const onClickPrevButton = () => {
    clearInterval(slideInterval.current);
    slideAutomatically(AUTO_SLIDE_TIME);
    setIndex(
      (index) => (index - 1 + carouselContents.length) % carouselContents.length
    );
  };

  const onClickNextButton = () => {
    clearInterval(slideInterval.current);
    slideAutomatically(AUTO_SLIDE_TIME);
    setIndex((index) => (index + 1) % carouselContents.length);
  };

  return (
    <div className="relative w-full max-w-[120rem] h-[30rem] mx-auto mb-12 overflow-hidden select-none">
      <div
        className="h-full flex transition-transform duration-1000"
        style={{ transform: `translateX(-${100 * index}%)` }}
      >
        {carouselContents.map((item, index) => (
          <CarouselItem
            key={index}
            {...item}
          />
        ))}
      </div>
      <button
        type="button"
        className="absolute bottom-5 end-24 z-30 flex items-center justify-center cursor-pointer group focus:outline-none"
        onClick={onClickPrevButton}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
          <svg
            className="w-4 h-4 text-white rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </span>
      </button>
      <button
        type="button"
        className="absolute bottom-5 end-10 z-30 flex items-center justify-center cursor-pointer group focus:outline-none"
        onClick={onClickNextButton}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
          <svg
            className="w-4 h-4 text-white rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
