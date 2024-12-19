import { Outlet } from "react-router-dom";

import SideBar from "./SideBar";

const PlanSideBar = () => {
  return (
    <SideBar direction={"right"}>
      <Outlet />
    </SideBar>
  );
};

export default PlanSideBar;
