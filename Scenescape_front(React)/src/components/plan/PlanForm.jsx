import { useState } from "react";
import { useParams } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import AttractionItem from "./AttractionItem";

const attractionList = [
  {
    title: "김밥천국",
    address: "서울특별시 중구 신당동",
    contentId: 39,
    sceneTitle: "이태원클라쓰",
    overview: "참치 김밥이 맛있는 신당동 맛집",
    img: "NoImage.png",
    likeCount: 912,
  },
  {
    title: "김밥천국",
    address: "서울특별시 중구 신당동",
    contentId: 39,
    sceneTitle: "이태원클라쓰",
    overview: "참치 김밥이 맛있는 신당동 맛집",
    img: "NoImage.png",
    likeCount: 912,
  },
  {
    title: "김밥천국",
    address: "서울특별시 중구 신당동",
    contentId: 39,
    sceneTitle: "이태원클라쓰",
    overview: "참치 김밥이 맛있는 신당동 맛집",
    img: "NoImage.png",
    likeCount: 912,
  },
  {
    title: "김밥천국",
    address: "서울특별시 중구 신당동",
    contentId: 39,
    sceneTitle: "이태원클라쓰",
    overview: "참치 김밥이 맛있는 신당동 맛집",
    img: "NoImage.png",
    likeCount: 912,
  },
];

const PlanForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { id } = useParams();

  return (
    <div className="flex flex-col w-full h-full gap-3 py-3">
      <div className="px-5">
        <h1 className="text-2xl">나의 여행 계획</h1>
        <p className="text-gray-400">회원님이 주인공인 멋진 계획이네요!</p>
      </div>

      <div className="w-full flex flex-col gap-2 px-4">
        <div className="group">
          <p className="block text-sm text-gray-500 group-focus-within:text-main-400">
            제목
          </p>
          <div className="flex gap-2">
            <input
              className="block flex-1 px-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-main-300"
              type="text"
              placeholder="이 계획의 제목을 입력하세요..."
              // onChange={onChangeSearchTerm}
            />

            {/* <button> 태그를 사용하면, focus가 일어나서 group에 속한 요소들의 스타일이 바뀌므로, <div> 태그를 사용하여 focus가 일어나지 않도록 구현  */}
            <div
              className="w-12 py-2 text-sm text-center text-white bg-main-300 rounded-lg hover:bg-main-400 cursor-pointer"
              onClick={() => {}}
            >
              생성
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="relative group">
            <p className="block text-sm text-gray-500 group-focus-within:text-main-400">
              시작일
            </p>
            <DatePicker
              className="py-1 px-2 text-center border border-gray-300 outline-none focus:border-main-300 rounded-md"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <svg
              className="absolute top-7 left-3 w-4 h-4 fill-gray-400 group-focus-within:fill-main-300"
              viewBox="0 0 448 512"
            >
              <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z" />
            </svg>
          </div>
          <div className="relative group">
            <p className="block text-sm text-gray-500 group-focus-within:text-main-400">
              종료일
            </p>
            <DatePicker
              className="py-1 px-2 text-center border border-gray-300 outline-none focus:border-main-300 rounded-md"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
            <svg
              className="absolute top-7 left-3 w-4 h-4 fill-gray-400 group-focus-within:fill-main-300"
              viewBox="0 0 448 512"
            >
              <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z" />
            </svg>
          </div>
        </div>

        <div className="group">
          <p className="block text-sm text-gray-500 group-focus-within:text-main-400">
            설명
          </p>
          <textarea
            className="block p-2.5 w-full bg-white rounded-lg border border-gray-300 focus:outline-none focus:border-main-300 resize-none"
            rows="3"
            placeholder="이 계획에 대한 설명과 지금의 감정을 남겨보세요..."
            //   v-model.lazy="planParams.description"
          ></textarea>
        </div>
      </div>

      {!attractionList || attractionList.length === 0 ? (
        <div className="flex justify-center items-center flex-1 text-gray-300">
          검색 결과가 없습니다.
        </div>
      ) : (
        <div>
          {attractionList.map((item, index) => {
            return (
              <AttractionItem
                key={index}
                {...item}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PlanForm;
