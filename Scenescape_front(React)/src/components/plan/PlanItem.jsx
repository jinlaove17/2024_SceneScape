import { useNavigate } from "react-router-dom";

import getAreaName from "../../utils/get-area-name";

const PlanItem = ({ id, title, overview, sceneCount, startDate, endDate }) => {
  const nav = useNavigate();

  return (
    <div
      className="flex w-full h-[120px] p-2 bg-white border-b hover:bg-gray-100 cursor-pointer"
      onClick={() => nav(`${id}`)}
    >
      <div className="flex flex-col justify-between flex-1 overflow-hidden">
        <div>
          <p className="text-xl truncate">{title}</p>
          <p className="text-gray-800 line-clamp-2 break-words">{overview}</p>
        </div>

        <div className="flex justify-between items-center text-end mr-3 text-sm">
          <p className="text-main-400">{sceneCount}개의 씬</p>
          <p className="text-gray-700">
            {startDate} ~ {endDate}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <svg
          className="w-5 h-5 fill-gray-300 cursor-pointer hover:scale-110"
          viewBox="0 0 448 512"
        >
          <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
        </svg>
      </div>
    </div>
  );
};

export default PlanItem;
