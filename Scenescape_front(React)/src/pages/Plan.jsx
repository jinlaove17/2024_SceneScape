import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import SearchSideBar from "../components/plan/SearchSideBar";
import PlanSideBar from "../components/plan/PlanSideBar";
import KakaoMap from "../components/plan/KakaoMap";

const Plan = () => {
  const [attractionList, setAttractionList] = useState([
    {
      id: 1,
      title: "김밥천국",
      address: "서울특별시 중구 신당동",
      contentId: 39,
      sceneTitle: "이태원클라쓰",
      overview: "참치 김밥이 맛있는 신당동 맛집",
      img: "NoImage.png",
      likeCount: 238,
    },
    {
      id: 2,
      title: "홍콩반점",
      address: "서울특별시 중구 약수동",
      contentId: 39,
      sceneTitle: "나의 아저씨",
      overview: "34년 전통 중국집",
      img: "NoImage.png",
      likeCount: 523,
    },
    {
      id: 3,
      title: "KFC",
      address: "서울특별시 강남구 역삼동",
      contentId: 39,
      sceneTitle: "미생",
      overview: "빠삭한 튀김 옷이 일품인 치킨",
      img: "NoImage.png",
      likeCount: 152,
    },
    {
      id: 4,
      title: "해운대",
      address: "서울특별시 관악구",
      contentId: 39,
      sceneTitle: "해운대",
      overview: "영화 <해운대>에 나온 부산의 그 해변 맞습니다.",
      img: "NoImage.png",
      likeCount: 232,
    },
    {
      id: 5,
      title: "명동교자",
      address: "서울특별시 중구 명동",
      contentId: 39,
      sceneTitle: "스토브리그",
      overview: "70년 전통의 칼국수와 만두 맛집",
      img: "NoImage.png",
      likeCount: 992,
    },
  ]);
  const [planList, setPlanList] = useState([
    {
      id: 1,
      title: "JJ의 이태원클라쓰 탐방기",
      overview: "박새로이 빙의하기",
      startDate: new Date("2024-12-11"),
      endDate: new Date("2024-12-17"),
      attractionList: [],
    },
    {
      id: 2,
      title: " JJ의 나의아저씨 17화 촬영하기",
      overview: "편안함에 이르렀나",
      startDate: new Date("2024-12-11"),
      endDate: new Date("2024-12-17"),
      attractionList: [],
    },
    {
      id: 3,
      title: " JJ의 백승수와 야구 관람",
      overview: "웰메이드 드라마 스토브리그",
      startDate: new Date("2024-12-11"),
      endDate: new Date("2024-12-17"),
      attractionList: [],
    },
  ]);
  const [curPlan, setCurPlan] = useState(null);

  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  const onCreatePlan = () => {
    if (!curPlan) {
      return;
    }

    setPlanList([...planList, curPlan]);

    const queryString = searchParams.toString();
    nav(`/plan/?${queryString}`);
  };

  const onUpdatePlan = () => {
    if (!curPlan) {
      return;
    }

    setPlanList(
      planList.map((item) =>
        parseInt(item.id) === parseInt(curPlan.id) ? curPlan : item
      )
    );

    const queryString = searchParams.toString();
    nav(`/plan/?${queryString}`);
  };

  const onDeletePlan = (id) => {
    setPlanList(planList.filter((item) => parseInt(item.id) !== parseInt(id)));
  };

  return (
    <div className="flex relative h-full overflow-hidden">
      <SearchSideBar
        attractionList={attractionList}
        curPlan={curPlan}
        setCurPlan={setCurPlan}
      />
      <KakaoMap />
      <PlanSideBar
        planList={planList}
        curPlan={curPlan}
        setCurPlan={setCurPlan}
        onCreatePlan={onCreatePlan}
        onUpdatePlan={onUpdatePlan}
        onDeletePlan={onDeletePlan}
      />
    </div>
  );
};

export default Plan;
