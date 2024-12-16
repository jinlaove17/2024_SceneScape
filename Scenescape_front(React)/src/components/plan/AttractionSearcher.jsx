import { useState } from "react";

import SearchDropdown from "./SearchDropdown";
import AttractionItem from "./AttractionItem";

const AttractionSearcher = ({
  contentList,
  areaList,
  subAreaList,
  attractionList,
  categoryList,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState("전체");
  const [area, setArea] = useState("전체");
  const [subArea, setSubArea] = useState("전체");
  const [categoryBit, setCategoryBit] = useState(0);

  const onChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const onChangeContent = (newContent) => {
    setContent(newContent);
  };

  const onChangeArea = (newArea) => {
    setArea(newArea);
  };

  const onChangeSubArea = (newSubArea) => {
    setSubArea(newSubArea);
  };

  const onChangeCategory = (num) => {
    if (checkCategory(num)) {
      setCategoryBit(categoryBit & ~(1 << num));
    } else {
      setCategoryBit(categoryBit | (1 << num));
    }
  };

  const checkCategory = (num) => {
    return categoryBit & (1 << num);
  };

  return (
    <div className="flex flex-col w-full h-full py-3">
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
          selected={content}
          itemList={contentList}
          onSelectItem={onChangeContent}
        />

        <div className="flex justify-between gap-2">
          <SearchDropdown
            title={"지역"}
            selected={area}
            itemList={areaList}
            onSelectItem={onChangeArea}
          />
          <SearchDropdown
            title={"세부 지역"}
            selected={subArea}
            itemList={subAreaList}
            onSelectItem={onChangeSubArea}
          />
        </div>

        <div className="group w-full">
          <p className="block text-sm text-gray-500">분류</p>
          <div className="w-full grid grid-cols-4 gap-1 place-items-center">
            {categoryList.map((item, index) => (
              <label
                key={index}
                className={`relative flex justify-center items-center w-20 py-1 cursor-pointer border rounded-md bg-white text-xs
                ${
                  checkCategory(index)
                    ? "border-main-300 text-main-400"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                <input
                  type="checkbox"
                  className="absolute w-0 h-0"
                  value={item.id}
                  onClick={() => onChangeCategory(index)}
                />
                {item.name}
              </label>
            ))}
          </div>
        </div>
      </div>

      {!attractionList || attractionList.length === 0 ? (
        <div className="flex justify-center items-center flex-1 text-gray-300">
          검색 결과가 없습니다.
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default AttractionSearcher;
