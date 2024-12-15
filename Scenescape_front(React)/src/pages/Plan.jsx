import SearchSideBar from "../components/SearchSideBar";
import SideBar from "../components/SideBar";
import KakaoMap from "../components/KakaoMap";

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
