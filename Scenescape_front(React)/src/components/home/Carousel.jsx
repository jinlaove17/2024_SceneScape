import { useState, useRef, useEffect } from "react";

import CarouselItem from "./CarouselItem";

const AUTO_SLIDE_TIME = 8_000;

const carouselContentList = [
  {
    text: (
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-10 w-max">
        <h1 className="text-3xl text-black animate-typing overflow-hidden whitespace-nowrap border-r-2 border-r-black px-1">
          당신의 여정이 영화가 되는 곳&nbsp;
          <span className="text-5xl text-white">SCENE SCAPE&nbsp;</span>에서
          당신만의 한 장면을 담아보세요.
        </h1>
      </div>
    ),
    img: "Traveller.jpg",
  },
  {
    text: (
      <div className="absolute left-32 top-24">
        <p className="text-2xl text-white">이곳은 어떠세요?</p>
        <h1 className="text-5xl mt-3 mb-14">강릉 주문진 영진해변</h1>
        <p className="text-lg text-gray-100 ps-4">
          “너와 함께한 모든 시간이 눈부셨다.
          <br />
          날이 좋아서, 날이 좋지 않아서, 날이 적당해서.
          <br />
          모든 날이 좋았다.”
          <br />
          <p className="text-end">- 드라마 &lt;도깨비&gt; -</p>
        </p>
      </div>
    ),
    img: "Guardian.jpg",
    searchTerm: "영진해변",
  },
  {
    text: (
      <div className="absolute left-32 top-24">
        <p className="text-2xl text-white">이곳은 어떠세요?</p>
        <h1 className="text-5xl mt-3 mb-14">경북 안동 만휴정</h1>
        <p className="text-lg text-gray-100 ps-4">
          “바다보러 갑시다.
          <br />
          귀하가 본 엄청난 바다.
          <br />
          한 달이 걸리는 그 바다.
          <br />
          수평선 너머에도 계속 이어지는 그 바다.
          <br />
          그 바다에서 피어나는 해도 봅시다.”
          <br />
          <p className="text-end">- 드라마 &lt;미스터 션샤인&gt; -</p>
        </p>
      </div>
    ),
    img: "MrSunshine.jpg",
    searchTerm: "만휴정",
  },
  {
    text: (
      <div className="absolute left-32 top-24">
        <p className="text-2xl text-white">이곳은 어떠세요?</p>
        <h1 className="text-5xl mt-3 mb-14">포항 구룡포</h1>
        <p className="text-lg text-gray-100 ps-4">
          “의미가 생기는 순간 특별한 곳이 되니까.”
          <br />
          <p className="text-end">- 드라마 &lt;갯마을 차차차&gt; -</p>
        </p>
      </div>
    ),
    img: "GetMaeulChaChaCha.jpg",
    searchTerm: "구룡포",
  },
];

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const slideInterval = useRef(null);

  useEffect(() => {
    slideAutomatically(AUTO_SLIDE_TIME);
    return () => clearInterval(slideInterval.current);
  }, []);

  const slideAutomatically = (slideTime) => {
    slideInterval.current = setInterval(() => {
      setIndex((index) => (index + 1) % carouselContentList.length);
    }, slideTime);
  };

  const onClickPrevButton = (e) => {
    e.stopPropagation();
    clearInterval(slideInterval.current);
    slideAutomatically(AUTO_SLIDE_TIME);
    setIndex(
      (index) =>
        (index - 1 + carouselContentList.length) % carouselContentList.length
    );
  };

  const onClickNextButton = (e) => {
    e.stopPropagation();
    clearInterval(slideInterval.current);
    slideAutomatically(AUTO_SLIDE_TIME);
    setIndex((index) => (index + 1) % carouselContentList.length);
  };

  return (
    <div className="relative w-full max-w-[120rem] h-[30rem] mx-auto mb-12 overflow-hidden select-none">
      <div
        className="h-full flex transition-transform duration-1000"
        style={{ transform: `translateX(-${100 * index}%)` }}
      >
        {carouselContentList.map((item, index) => (
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
