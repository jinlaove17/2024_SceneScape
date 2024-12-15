import { useState, useRef, useEffect } from "react";

import SideBar from "./SideBar";
import TabMenu from "./TabMenu";
import PlaceSearch from "./PlaceSearch";
import FilmingLocationSearch from "./FilmingLocationSearch";
import LikePlace from "./LikePlace";

const SearchSideBar = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [tabContent, setTabContent] = useState(null);
  const tabMenuListRef = useRef([
    {
      text: "장소 검색",
      img: (
        <svg
          className="mb-2 h-5 w-5"
          viewBox="0 0 512 512"
        >
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM288 176c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 48.8 46.5 111.6 68.6 138.6c6 7.3 16.8 7.3 22.7 0c22.1-27 68.6-89.8 68.6-138.6zm-112 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
        </svg>
      ),
      onClick: () => setTabIndex(0),
    },
    {
      text: "촬영지 검색",
      img: (
        <svg
          className="mb-2 h-5 w-5"
          viewBox="0 0 512 512"
        >
          <path d="M48 208l416 0 0 208c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16l0-208zm352-48l-64 0 80-80 32 0c8.8 0 16 7.2 16 16l-64 64zM320 80l-80 80-64 0 80-80 64 0zM160 80L80 160l-32 0 0-32L96 80l64 0zm352 80l0-64c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96l0 64 0 24 0 24L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208 0-24 0-24z" />
        </svg>
      ),
      onClick: () => setTabIndex(1),
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
      onClick: () => setTabIndex(2),
    },
  ]);

  useEffect(() => {
    switch (tabIndex) {
      case 0: // 장소 검색
        setTabContent(<PlaceSearch />);
        break;
      case 1: // 촬영지 검색
        setTabContent(<FilmingLocationSearch />);
        break;
      case 2: // 좋아요
        setTabContent(<LikePlace />);
        break;
    }
  }, [tabIndex]);

  return (
    <SideBar
      tabMenu={
        <TabMenu
          contentList={tabMenuListRef.current}
          tabIndex={tabIndex}
        />
      }
      direction={"left"}
    >
      {tabContent}
    </SideBar>
  );
};

export default SearchSideBar;
