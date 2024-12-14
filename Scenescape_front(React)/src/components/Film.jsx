import { useState, useRef, useEffect } from "react";

import getImageUrl from "../utils/get-image-url";

const FILM_FRAME_SIZE = 320;
const ANIMATION_SPEED = 0.5;

const dummyData = [
  {
    id: 1,
    shift: 0,
  },
  {
    id: 2,
    shift: FILM_FRAME_SIZE,
  },
  {
    id: 3,
    shift: 2 * FILM_FRAME_SIZE,
  },
  {
    id: 4,
    shift: 3 * FILM_FRAME_SIZE,
  },
  {
    id: 5,
    shift: 4 * FILM_FRAME_SIZE,
  },
  {
    id: 6,
    shift: 5 * FILM_FRAME_SIZE,
  },
  {
    id: 7,
    shift: 6 * FILM_FRAME_SIZE,
  },
];

const Film = () => {
  const [frameList, setFrameList] = useState(dummyData);
  const animationRef = useRef(null);
  const isHovered = useRef(false);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const animate = () => {
    if (isHovered.current) {
      return;
    }

    setFrameList((prevFrameList) =>
      prevFrameList.map((frame) => {
        frame.shift -= ANIMATION_SPEED;
        if (frame.shift <= -FILM_FRAME_SIZE) {
          frame.shift = FILM_FRAME_SIZE * (frameList.length - 1);
        }
        return frame;
      })
    );

    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <div>
      <div className="w-[80rem] mx-auto mb-10 overflow-hidden">
        <h1 className="text-3xl">
          📸 이 장면의 <span className="text-blue-500">주인공</span>은 바로 나!
        </h1>
        <p className="text-xl text-gray-400 ps-10">
          촬영지에서 주인공이 된 사진을 공유해보세요!
        </p>
      </div>

      <div
        className="relative w-full h-52 mx-auto overflow-hidden"
        style={{
          maxWidth: FILM_FRAME_SIZE * (frameList.length - 1),
        }}
        onMouseEnter={() => {
          isHovered.current = true;
        }}
        onMouseLeave={() => {
          isHovered.current = false;
          animationRef.current = requestAnimationFrame(animate);
        }}
      >
        {frameList.map((item) => (
          <img
            key={item.id}
            className="absolute w-80 h-full object-center"
            style={{ transform: `translateX(${item.shift}px)` }}
            src={getImageUrl("FlimFrame.png")}
          />
        ))}
      </div>
    </div>
  );
};

export default Film;
