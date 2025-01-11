import { Link, useOutletContext } from "react-router-dom";

import BoardItem from "./BoardItem";
import Pagenation from "../Pagenation";

const BoardList = () => {
  const { data, filter, onChangeFilter } = useOutletContext();

  return (
    <div>
      <div className="flex justify-center items-center gap-3 my-1">
        <div className="group">
          <p className="block text-sm text-gray-500 group-focus-within:text-main-400">
            검색 조건
          </p>
          <select
            name="searchType"
            className="block w-28 min-h-9 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-main-300 text-center cursor-pointer"
            onChange={onChangeFilter}
          >
            <option value="title">글 제목</option>
            <option value="userId">작성자명</option>
            <option value="sceneTitle">컨텐츠명</option>
            <option value="attractionTitle">촬영지명</option>
          </select>
        </div>

        <div className="w-[32rem] group relative my-3">
          <p className="block text-sm text-gray-500 group-focus-within:text-main-400">
            검색어
          </p>
          <div className="flex gap-3">
            <input
              className="block flex-1 px-10 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-main-300"
              type="text"
              name="searchKeyword"
              placeholder="장소명을 입력해 주세요."
              onChange={onChangeFilter}
            />
            {/* <button> 태그를 사용하면, focus가 일어나서 group에 속한 요소들의 스타일이 바뀌므로, <div> 태그를 사용하여 focus가 일어나지 않도록 구현  */}
            <div className="w-20 py-2 text-sm text-center text-white bg-main-300 rounded-lg hover:bg-main-400 cursor-pointer">
              검색
            </div>
          </div>

          <svg
            className="absolute left-3 top-7 w-4 h-4 fill-gray-300 group-focus-within:fill-main-400"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          className="flex justify-center items-center"
          //   @click="onWritePost"
        >
          <svg
            className="w-5 h-5 fill-gray-300"
            viewBox="0 0 576 512"
          >
            <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 125.7-86.8 86.8c-10.3 10.3-17.5 23.1-21 37.2l-18.7 74.9c-2.3 9.2-1.8 18.8 1.3 27.5L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM549.8 235.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-29.4 29.4-71-71 29.4-29.4c15.6-15.6 40.9-15.6 56.6 0zM311.9 417L441.1 287.8l71 71L382.9 487.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z" />
          </svg>

          <Link
            className="ml-1 text-gray-600 hover:text-gray-400"
            to={"new"}
          >
            새 글 작성
          </Link>
        </button>

        <select
          name="sortType"
          className="w-24 min-h-9 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-main-300 text-center cursor-pointer"
          onChange={onChangeFilter}
        >
          <option value="created">최신순</option>
          <option value="view">조회순</option>
          <option value="like">좋아요순</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-4 my-2 px-2">
        {/* Skeleton */}
        {/* <div
          className="w-60 border-gray-200 rounded-md shadow-md animate-pulse"
          key={item}
        >
          <div className="flex items-center justify-center h-48 mb-3 bg-gray-300 rounded-t-md">
            <svg
              className="w-full h-10 text-gray-200"
              aria-hidden="true"
              viewBox="0 0 16 20"
            >
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
          </div>
          <div className="p-2">
            <div className="h-2 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          </div>

          <span className="sr-only">Loading...</span>
        </div> */}

        {data.results.map((item) => {
          return (
            <BoardItem
              key={item.no}
              {...item}
            />
          );
        })}
      </div>

      <Pagenation
        className="my-5"
        curPage={filter.page}
        totalItemCount={data.totalResults}
        pageSize={parseInt(import.meta.env.VITE_BOARD_PAGE_SIZE)}
        navSize={parseInt(import.meta.env.VITE_BOARD_NAVIGATION_SIZE)}
        onChangePage={onChangeFilter}
      />
    </div>
  );
};

export default BoardList;
