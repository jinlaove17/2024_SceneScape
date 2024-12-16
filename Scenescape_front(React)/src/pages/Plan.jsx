import SearchSideBar from "../components/plan/SearchSideBar";
import SideBar from "../components/plan/SideBar";
import KakaoMap from "../components/plan/KakaoMap";

const Plan = () => {
  return (
    <div className="flex relative h-full overflow-hidden">
      <SearchSideBar />
      <KakaoMap />
      <SideBar direction={"right"} />
    </div>
  );
};

export default Plan;
