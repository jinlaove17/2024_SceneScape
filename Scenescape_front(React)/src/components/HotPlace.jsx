import HotPlaceItem from "./HotPlaceItem";

const medalList = ["🥇", "🥈", "🥉"];
const dummyData = [
  {
    likeCount: 1036,
    medal: "🥇",
    title: "영진해변",
    sceneTitle: "도깨비",
    contentTypeId: 12,
    address: "강원도 강릉시 주문진읍 해안로 1609",
    overview: "SNS에서 유명한 도깨비 방파제 촬영지",
    img: "http://tong.visitkorea.or.kr/cms/resource/84/3010984_image2_1.jpg",
  },
  {
    likeCount: 946,
    medal: "🥈",
    title: "만휴정",
    sceneTitle: "미스터션샤인",
    contentTypeId: 14,
    address: "경상북도 안동시 길안면 묵계하리길 42",
    overview:
      "6회에서 유진은 도예가 은산의 집에서 기다리며 새로운 적 희성을 생각한다.",
    img: "http://tong.visitkorea.or.kr/cms/resource/85/2031885_image2_1.jpg",
  },
  {
    likeCount: 912,
    medal: "🥉",
    title: "문화마실",
    sceneTitle: "동백꽃 필 무렵",
    contentTypeId: 25,
    address: "경상북도 포항시 남구 구룡포읍 구룡포길 133-1",
    overview: "옹산의 하마 동백이가 운영했던 까멜리아가 있는 곳",
    img: "http://tong.visitkorea.or.kr/cms/resource/70/720470_image2_1.jpg",
  },
];

const HotPlace = () => {
  return (
    <div className="w-[80rem] mx-auto">
      <div className="mb-5">
        <h1 className="text-3xl">
          🔥 지금 <span className="text-rose-500">핫플레이스</span>는
          어디일까요?
        </h1>
        <p className="text-xl text-gray-400 ps-10">
          현재 가장 인기 있는 세 곳을 추천해 드릴게요!
        </p>
      </div>

      <div className="flex justify-center items-center mb-16 p-5 overflow-hidden">
        {dummyData.map((item, index) => (
          <HotPlaceItem
            key={index}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default HotPlace;
