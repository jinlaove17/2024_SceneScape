import { Outlet } from "react-router-dom";

import SideBar from "./SideBar";

const PlanSideBar = ({
  planList,
  curPlan,
  setCurPlan,
  onCreatePlan,
  onUpdatePlan,
  onDeletePlan,
}) => {
  return (
    <SideBar direction={"right"}>
      {/* React Router가 라우트 계층 내에서 데이터를 관리하고 제공하는 방식에 맞추려면 {}객체 방식으로 props(이름은 반드시 context여야 함)를 넘겨주어야 한다. */}
      <Outlet
        context={{
          planList,
          curPlan,
          setCurPlan,
          onCreatePlan,
          onUpdatePlan,
          onDeletePlan,
        }}
      />
    </SideBar>
  );
};

export default PlanSideBar;
