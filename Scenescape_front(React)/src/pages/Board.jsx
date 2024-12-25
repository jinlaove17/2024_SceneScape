import BoardHeader from "../components/board/BoardHeader";
import BoardList from "../components/board/BoardList";
import Pagenation from "../components/Pagenation";

const Board = () => {
  return (
    <div className="w-[80rem] mx-auto pb-5">
      <BoardHeader title={"씬 공유 게시판"} />
      <BoardList />
      <Pagenation />
    </div>
  );
};

export default Board;
