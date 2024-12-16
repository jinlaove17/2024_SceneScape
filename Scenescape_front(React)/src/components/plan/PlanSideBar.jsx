import SideBar from "./SideBar";
import PlanList from "./PlanList";

const planList = [
  {
    title: "JJ의 이태원클라쓰 탐방기",
    overview: "박새로이 빙의하기",
    sceneCount: 10,
    startDate: "2024-12-11",
    endDate: "2024-12-17",
  },
  {
    title: " JJ의 나의아저씨 17화 촬영하기",
    overview: "편안함에 이르렀나",
    sceneCount: 3,
    startDate: "2024-12-11",
    endDate: "2024-12-17",
  },
  {
    title: " JJ의 백승수와 야구 관람",
    overview: "웰메이드 드라마 스토브리그",
    sceneCount: 6,
    startDate: "2024-12-11",
    endDate: "2024-12-17",
  },
];

const PlanSideBar = () => {
  return (
    <SideBar direction={"right"}>
      <PlanList planList={planList} />
    </SideBar>
  );
};

export default PlanSideBar;
