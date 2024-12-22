import "./CarouselItem.css";

import { useNavigate } from "react-router-dom";

import getImageUrl from "../../utils/get-image-url";

const CarouselItem = ({ text, img, searchTerm }) => {
  const nav = useNavigate();

  const onClickCarouselItem = () => {
    if (!searchTerm) {
      return;
    }

    nav(`/plan?searchTerm=${searchTerm}`);
  };

  return (
    <div
      className="relative min-w-full cursor-pointer overflow-hidden"
      onClick={() => {
        onClickCarouselItem();
      }}
    >
      <img
        src={getImageUrl(img)}
        className="w-full h-full object-cover blur-md animate-zoom"
      />
      <img
        src={getImageUrl(img)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[45rem] max-w-[45rem] mask-radial-opacity"
      />
      {text}
    </div>
  );
};

export default CarouselItem;
