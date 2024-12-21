import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import SearchDropdown from "./SearchDropdown";
import AttractionItem from "./AttractionItem";

const AttractionSearcher = ({
  contentList,
  areaList,
  subAreaList,
  attractionList,
  categoryList,
}) => {
  const [filter, setFilter] = useState({});
  const [categoryBit, setCategoryBit] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const newFilter = {
      searchTerm: searchParams.get("searchTerm") || "",
      content: searchParams.get("content") || "전체",
      area: searchParams.get("area") || "전체",
      subArea: searchParams.get("subArea") || "전체",
      categoryList: searchParams.getAll("categoryList") || [],
    };
    setFilter(newFilter);

    // queryString에 categoryList가 있다면, 해당 버튼 활성화하기
    let bit = 0;
    for (const category of newFilter.categoryList) {
      switch (parseInt(category)) {
        case 12:
          bit |= 1;
          break;
        case 14:
          bit |= 1 << 1;
          break;
        case 15:
          bit |= 1 << 2;
          break;
        case 25:
          bit |= 1 << 3;
          break;
        case 28:
          bit |= 1 << 4;
          break;
        case 32:
          bit |= 1 << 5;
          break;
        case 38:
          bit |= 1 << 6;
          break;
        case 39:
          bit |= 1 << 7;
          break;
      }
    }
    setCategoryBit(bit);
  }, []);

  const onChangeFilter = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const onChangeCategory = (num) => {
    if (checkCategory(num)) {
      setCategoryBit(categoryBit & ~(1 << num));
    } else {
      setCategoryBit(categoryBit | (1 << num));
    }
  };

  const onClickSearchButton = () => {
    const list = [];
    for (let i = 0; i < categoryList.length; ++i) {
      if (categoryBit & (1 << i)) {
        list.push(categoryList[i].id);
      }
    }

    const newFilter = { ...filter, categoryList: list };
    setFilter(newFilter);

    const queryParams = new URLSearchParams();
    for (const key in newFilter) {
      if (newFilter[key]) {
        if (Array.isArray(newFilter[key])) {
          // 배열인 경우 각 요소를 개별적으로 추가
          newFilter[key].forEach((value) => {
            queryParams.append(key, value);
          });
        } else {
          // 배열이 아닌 경우 그대로 추가
          queryParams.append(key, newFilter[key]);
        }
      }
    }
    setSearchParams(queryParams);
  };

  const checkCategory = (num) => {
    return categoryBit & (1 << num);
  };

  return (
    <div className="flex flex-col w-full h-full gap-3 py-3">
      <div className="flex flex-col gap-2 px-4">
        <div className="relative group">
          <p className="block text-sm text-gray-500 group-focus-within:text-main-400">
            검색어
          </p>
          <div className="flex gap-2">
            <input
              className="block flex-1 px-10 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-main-300"
              type="text"
              name="searchTerm"
              value={filter.searchTerm}
              placeholder="장소명을 입력하세요..."
              onChange={onChangeFilter}
            />

            {/* <button> 태그를 사용하면, focus가 일어나서 group에 속한 요소들의 스타일이 바뀌므로, <div> 태그를 사용하여 focus가 일어나지 않도록 구현  */}
            <div
              className="w-12 py-2 text-sm text-center text-white bg-main-300 rounded-lg hover:bg-main-400 cursor-pointer"
              onClick={onClickSearchButton}
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
          selected={filter.content}
          itemList={contentList}
          onSelectItem={(item) => {
            onChangeFilter({
              target: {
                name: "content",
                value: item,
              },
            });
          }}
        />

        <div className="flex justify-between gap-2">
          <SearchDropdown
            title={"지역"}
            selected={filter.area}
            itemList={areaList}
            onSelectItem={(item) => {
              onChangeFilter({
                target: {
                  name: "area",
                  value: item,
                },
              });
            }}
          />
          <SearchDropdown
            title={"세부 지역"}
            selected={filter.subArea}
            itemList={subAreaList}
            onSelectItem={(item) => {
              onChangeFilter({
                target: {
                  name: "subArea",
                  value: item,
                },
              });
            }}
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

export default AttractionSearcher;
