import getImageUrl from "../../utils/get-image-url";
import getAreaName from "../../utils/get-area-name";

const AttractionItem = ({
  title,
  address,
  contentId,
  sceneTitle,
  overview,
  img,
  likeCount,
}) => {
  return (
    <div className="flex w-full h-[130px] px-2 py-1 bg-white border-b hover:bg-gray-100">
      <div className="flex flex-col justify-center w-full">
        <div className="flex items-center mb-2 ">
          <img
            className="w-20 h-20 mr-2 object-cover"
            src={getImageUrl(img)}
          />
          <div className="flex flex-col justify-center text-sm overflow-hidden">
            <p className="text-base truncate">{title}</p>
            <p className="text-gray-800 truncate">{address}</p>
            <p className="text-gray-800 truncate">{overview}</p>
          </div>
        </div>
        <div className="flex gap-2 text-xs">
          <p className="px-2 py-1 text-xs text-main-400 rounded-xl border border-main-300">
            #{getAreaName(contentId)}
          </p>
          <p className="px-2 py-1 text-xs text-main-400 rounded-xl border border-main-300">
            #{sceneTitle}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div
          // v-if="
          //   !searchResult.likes || !searchResult.likes.includes(item.no)
          // "
          className="flex flex-col justify-center items-center"
        >
          <svg
            className="w-5 h-5 fill-gray-300 hover:scale-110 cursor-pointer"
            viewBox="0 0 512 512"
          >
            <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
          </svg>
          <p className="text-xs text-gray-400">{likeCount}</p>
        </div>
        {/* <div className="flex flex-col justify-center items-center">
      <svg
        className="w-5 h-5 fill-red-300 hover:scale-110 cursor-pointer"
        viewBox="0 0 512 512"
      >
        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
      </svg>

      <p className="text-xs text-red-300">912</p>
    </div> */}

        <svg
          className="w-5 h-5 mb-2 fill-blue-300 hover:scale-110 cursor-pointer"
          viewBox="0 0 384 512"
        >
          <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
        </svg>

        {/* <svg
      className="w-5 h-5 mb-2 fill-violet-300 hover:scale-110 cursor-pointer"
      viewBox="0 0 448 512"
    >
      <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256zm176 40c-13.3 0-24 10.7-24 24l0 48-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l48 0 0 48c0 13.3 10.7 24 24 24s24-10.7 24-24l0-48 48 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-48c0-13.3-10.7-24-24-24z" />
    </svg> */}
      </div>
    </div>
  );
};

export default AttractionItem;
