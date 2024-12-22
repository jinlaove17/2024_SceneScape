import { useState } from "react";
import { useSearchParams, useNavigate, Outlet } from "react-router-dom";

import SideBar from "./SideBar";

const PlanSideBar = () => {
  const [planList, setPlanList] = useState([
    {
      id: 1,
      title: "JJ의 이태원클라쓰 탐방기",
      overview: "박새로이 빙의하기",
      sceneCount: 10,
      startDate: new Date("2024-12-11"),
      endDate: new Date("2024-12-17"),
      attractionList: [
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
      ],
    },
    {
      id: 2,
      title: " JJ의 나의아저씨 17화 촬영하기",
      overview: "편안함에 이르렀나",
      sceneCount: 3,
      startDate: new Date("2024-12-11"),
      endDate: new Date("2024-12-17"),
      attractionList: [
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
      ],
    },
    {
      id: 3,
      title: " JJ의 백승수와 야구 관람",
      overview: "웰메이드 드라마 스토브리그",
      sceneCount: 6,
      startDate: new Date("2024-12-11"),
      endDate: new Date("2024-12-17"),
      attractionList: [],
    },
  ]);
  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  const onCreatePlan = (newPlan) => {
    if (!newPlan) {
      return;
    }

    setPlanList([...planList, newPlan]);

    const queryString = searchParams.toString();
    nav(`/plan/?${queryString}`);
  };

  const onUpdatePlan = (updatedPlan) => {
    if (!updatedPlan) {
      return;
    }

    setPlanList(
      planList.map((item) =>
        parseInt(item.id) === parseInt(updatedPlan.id) ? updatedPlan : item
      )
    );

    const queryString = searchParams.toString();
    nav(`/plan/?${queryString}`);
  };

  const onDeletePlan = (id) => {
    setPlanList(planList.filter((item) => parseInt(item.id) !== parseInt(id)));
  };

  return (
    <SideBar direction={"right"}>
      {/* React Router가 라우트 계층 내에서 데이터를 관리하고 제공하는 방식에 맞추려면 {}객체 방식으로 props(이름은 반드시 context여야 함)를 넘겨주어야 한다. */}
      <Outlet
        context={{ planList, onCreatePlan, onUpdatePlan, onDeletePlan }}
      />
    </SideBar>
  );
};

export default PlanSideBar;
