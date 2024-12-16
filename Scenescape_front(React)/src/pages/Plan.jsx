import SearchSideBar from "../components/plan/SearchSideBar";
import PlanSideBar from "../components/plan/PlanSideBar";
import KakaoMap from "../components/plan/KakaoMap";

// 임시 더미 데이터

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

const Plan = () => {
  return (
    <div className="flex relative h-full overflow-hidden">
      <SearchSideBar attractionList={attractionList} />
      <KakaoMap />
      <PlanSideBar />
    </div>
  );
};

export default Plan;
