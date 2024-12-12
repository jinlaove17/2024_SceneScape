import { Link } from "react-router-dom";

import getAreaName from "../utils/get-area-name";

const HotPlaceItem = ({
  likeCount,
  medal,
  title,
  contentTypeId,
  sceneTitle,
  address,
  overview,
  img,
}) => {
  return (
    <div className="relative w-80 rounded-lg shadow-2xl mx-8 mb-20 transition duration-200 ease-in-out hover:scale-105 border-2 border-transparent hover:border-main-300 cursor-pointer">
      <img
        className="rounded-t-md w-full h-56 object-cover"
        src={img}
      />

      <div className="pt-4 pb-5 px-5">
        <div className="flex justify-between mb-2 border-b border-b-gray-200">
          <div className="flex items-center gap-1 text-xl text-black">
            <p>{medal}</p>
            <p>{title}</p>
          </div>

          <div className="flex flex-col justify-center items-center">
            <svg
              className="w-4 h-4 fill-red-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
            </svg>
            <p className="text-sm text-red-300">{likeCount.toLocaleString()}</p>
          </div>
        </div>

        <p className="font-normal text-gray-700 truncate">{address}</p>

        <p className="h-10 mb-3 text-sm text-gray-500 line-clamp-2">
          {overview}
        </p>

        <div className="flex items-center gap-2">
          <p className="px-2 py-1 text-xs text-main-400 rounded-xl border border-main-300">
            #{getAreaName(contentTypeId)}
          </p>
          <p className="px-2 py-1 text-xs text-main-400 rounded-xl border border-main-300">
            #{sceneTitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotPlaceItem;
