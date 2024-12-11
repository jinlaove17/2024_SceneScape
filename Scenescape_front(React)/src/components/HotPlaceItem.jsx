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
    <div className="relative w-80 rounded-lg shadow-2xl mx-8 mb-20 transition duration-200 ease-in-out hover:scale-105 border-2 border-transparent hover:border-main-300">
      <img
        className="rounded-t-lg w-full h-56 object-cover"
        src={img}
      />

      <div className="absolute top-2 left-3 flex flex-col justify-center items-center">
        <svg
          className="w-5 h-5 fill-red-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
        </svg>
        <p className="text-sm text-red-300">{likeCount.toLocaleString()}</p>
      </div>

      <div className="p-5">
        <div className="flex justify-between">
          <h1 className="mb-2 text-xl font-bold tracking-tight text-black">
            {medal} {title}
            <span className="ml-1 text-xs text-gray-400">
              {getAreaName(contentTypeId)}
            </span>
          </h1>

          <p className="text-sm text-main-400">{sceneTitle}</p>
        </div>

        <p className="font-normal text-gray-700 truncate">{address}</p>

        <p
          className="mb-5 text-sm text-gray-500 truncate"
          title={overview}
        >
          {overview}
        </p>

        <div className="text-end">
          <Link
            //   to="{ name: 'search', query: { title: hotPlace.title } }"
            className="px-4 py-3 text-sm font-medium text-white bg-main-300 rounded-lg hover:bg-main-400"
          >
            상세 보기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotPlaceItem;
