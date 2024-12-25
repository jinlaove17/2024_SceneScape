import { Outlet } from "react-router-dom";

import BoardHeader from "../components/board/BoardHeader";

const Board = () => {
  return (
    <div className="w-[80rem] mx-auto">
      <BoardHeader title={"씬 공유 게시판"} />
      <Outlet />
    </div>
  );
};

export default Board;
