import "./CarouselItem.css";

import getImageUrl from "../utils/get-image-url";

const CarouselItem = ({ text, img }) => {
  return (
    <div className="relative min-w-full overflow-hidden">
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
