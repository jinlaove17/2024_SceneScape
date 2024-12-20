import SearchSideBar from "../components/plan/SearchSideBar";
import PlanSideBar from "../components/plan/PlanSideBar";
import KakaoMap from "../components/plan/KakaoMap";

// 임시 더미 데이터
const attractionList = [
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
