import { useState, useRef } from "react";

import SideBar from "./SideBar";
import TabMenu from "./TabMenu";
import AttractionSearcher from "./AttractionSearcher";

const contentList = [
  "전체",
  "이태원클라쓰",
  "미생",
  "스토브리그",
  "나의 아저씨",
  "아는 와이프",
  "무브 투 헤븐 : 나는 유품 정리사입니다.",
  "오징어게임",
];
const areaList = [
  "전체",
  "서울",
  "인천",
  "경기",
  "부산",
  "광주",
  "대전",
  "제주",
];
const subAreaList = [
  "전체",
  "강남",
  "약수",
  "역삼",
  "이태원",
  "잠실",
  "광교",
  "신사",
];
const categoryList = [
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

const SearchSideBar = ({ attractionList }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const tabMenuListRef = useRef([
    {
      text: "상세 검색",
      img: (
        <svg
          className="mb-2 h-5 w-5"
          viewBox="0 0 512 512"
        >
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM288 176c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 48.8 46.5 111.6 68.6 138.6c6 7.3 16.8 7.3 22.7 0c22.1-27 68.6-89.8 68.6-138.6zm-112 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
        </svg>
      ),
    },
    {
      text: "좋아요",
      img: (
        <svg
          className="mb-2 h-5 w-5"
          viewBox="0 0 512 512"
        >
          <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
        </svg>
      ),
    },
  ]);

  const onChangeTabMenu = (index) => {
    if (index === tabIndex) {
      return;
    }

    setTabIndex(index);
  };

  const getContent = () => {
    switch (tabIndex) {
      case 0: // 상세 검색
      case 1: {
        // 좋아요
        return (
          <AttractionSearcher
            tabIndex={tabIndex}
            contentList={contentList}
            areaList={areaList}
            subAreaList={subAreaList}
            categoryList={categoryList}
            attractionList={tabIndex === 0 ? attractionList : []}
          />
        );
      }
      default:
        return <div>컨텐츠가 없습니다.</div>;
    }
  };

  return (
    <SideBar
      tabMenu={
        <TabMenu
          contentList={tabMenuListRef.current}
          tabIndex={tabIndex}
          onChangeTabMenu={onChangeTabMenu}
        />
      }
      direction={"left"}
    >
      {getContent()}
    </SideBar>
  );
};

export default SearchSideBar;
