import { useState } from "react";

import SearchDropdown from "./SearchDropdown";
import AttractionItem from "./AttractionItem";

const contentList = [
  {
    id: 12,
    name: "관광지",
  },
  {
    id: 14,
    name: "문화시설",
  },
  {
    id: 15,
    name: "축제공연행사",
  },
  {
    id: 25,
    name: "여행코스",
  },
  {
    id: 28,
    name: "레포츠",
  },
  {
    id: 32,
    name: "숙박",
  },
  {
    id: 38,
    name: "쇼핑",
  },
  {
    id: 39,
    name: "음식점",
  },
];

const AttractionList = ({ attractionList }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sceneTitle, setSceneTitle] = useState("");
  const [area, setArea] = useState("");
  const [subArea, setSubArea] = useState("");
  const [contentsBit, setContentsBit] = useState(0);

  const onChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const onChangeSceneTitle = (newSceneTitle) => {
    setSceneTitle(newSceneTitle);
  };

  const onChangeArea = (newArea) => {
    setArea(newArea);
  };

  const onChangeSubArea = (newSubArea) => {
    setSubArea(newSubArea);
  };

  const checkContent = (num) => {
    return contentsBit & (1 << num);
  };

  const onSelectContent = (num) => {
    if (checkContent(num)) {
      setContentsBit(contentsBit & ~(1 << num));
    } else {
      setContentsBit(contentsBit | (1 << num));
    }
  };

  return (
    <div className="py-3">
      <div className="flex flex-col gap-2 px-4 mb-3">
        <div className="relative group">
          <label
            htmlFor="search"
            className="block text-sm text-gray-500 group-focus-within:text-main-400"
          >
            검색어
          </label>
          <div className="flex gap-2">
            <input
              className="block flex-1 px-10 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-main-300"
              type="text"
              id="search"
              placeholder="장소명을 입력하세요..."
              onChange={onChangeSearchTerm}
            />

            {/* <button> 태그를 사용하면, focus가 일어나서 group에 속한 요소들의 스타일이 바뀌므로, <div> 태그를 사용하여 focus가 일어나지 않도록 구현  */}
            <div
              className="w-12 py-2 text-sm text-center text-white bg-main-300 rounded-lg hover:bg-main-400 cursor-pointer"
              onClick={() => {}}
            >
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

        <SearchDropdown
          title={"컨텐츠"}
          selected={sceneTitle}
          itemList={[
            "이태원클라쓰",
            "미생",
            "스토브리그",
            "나의 아저씨",
            "아는 와이프",
            "무브 투 헤븐 : 나는 유품 정리사입니다.",
            "오징어 게임",
          ]}
          onSelectItem={onChangeSceneTitle}
        />

        <div className="flex justify-between gap-2">
          <SearchDropdown
            title={"지역"}
            selected={area}
            itemList={["서울", "인천", "경기", "부산", "광주", "대전", "제주"]}
            onSelectItem={onChangeArea}
          />
          <SearchDropdown
            title={"세부 지역"}
            selected={subArea}
            itemList={[
              "강남",
              "약수",
              "역삼",
              "이태원",
              "잠실",
              "광교",
              "신사",
            ]}
            onSelectItem={onChangeSubArea}
          />
        </div>

        <div className="group w-full">
          <p className="block text-sm text-gray-500">분류</p>
          <div className="w-full grid grid-cols-4 gap-1 place-items-center">
            {contentList.map((item, index) => (
              <label
                key={index}
                className={`relative flex justify-center items-center w-20 py-1 cursor-pointer border rounded-md bg-white text-xs
                ${
                  checkContent(index)
                    ? "border-main-300 text-main-400"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                <input
                  type="checkbox"
                  className="absolute w-0 h-0"
                  value={item.id}
                  onClick={() => onSelectContent(index)}
                />
                {item.name}
              </label>
            ))}
          </div>
        </div>
      </div>

      {!attractionList || attractionList.length === 0 ? (
        <div className="text-center text-gray-300 mb-4">
          검색 결과가 없습니다.
        </div>
      ) : (
        <>
          <div className="mb-4">
            {attractionList.map((item, index) => {
              return (
                <AttractionItem
                  key={index}
                  {...item}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default AttractionList;
