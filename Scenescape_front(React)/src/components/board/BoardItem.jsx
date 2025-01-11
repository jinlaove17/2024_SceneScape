import { Link } from "react-router-dom";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const BoardItem = ({
  no,
  title,
  userId,
  viewCount,
  likeCount,
  created,
  thumbnailUrl,
  sceneTitle,
  attractionTitle,
}) => {
  return (
    <Link
      className="w-60 h-72 bg-white border-2 border-gray-200 rounded-md shadow-md border-transparent hover:cursor-pointer hover:border-main-300 select-none group"
      to={`${no}`}
    >
      <div className="relative">
        <div className="w-full h-48 overflow-hidden rounded-t-md">
          <img
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
            src={thumbnailUrl}
            alt="Zoom effect"
          />
        </div>

        <div className="absolute flex gap-2 top-2 left-2">
          <p className="max-w-24 px-2 py-1 bg-white text-xs text-main-400 rounded-xl border border-main-300 truncate">
            #{sceneTitle}
          </p>
          <p className="px-2 py-1 bg-white text-xs text-main-400 rounded-xl border border-main-300">
            {attractionTitle}
          </p>
        </div>
      </div>

      <div className="p-2 text-sm">
        <h1 className="text-lg mb-2 truncate">{title}</h1>
        <p className="text-gray-700 truncate">작성자: {userId}</p>
        <div className="flex justify-between items-center text-gray-700">
          <p className="pt-1">
            {created
              ? dayjs.tz(created, "Asia/Seoul").format("YYYY-MM-DD HH:mm")
              : "알 수 없음"}
          </p>
          <div className="flex justify-center items-center gap-3">
            <div className="flex justify-center items-center gap-1">
              <svg
                className="w-4 h-4 fill-gray-500"
                viewBox="0 0 576 512"
              >
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
              </svg>
              <p className="pt-1">{viewCount.toLocaleString()}</p>
            </div>

            <div className="flex justify-center items-center gap-1">
              <svg
                className="w-4 h-4 fill-blue-300"
                viewBox="0 0 512 512"
              >
                <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16l-97.5 0c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8l97.5 0c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32l-64 0z" />
              </svg>
              <p className="pt-1">{likeCount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BoardItem;
