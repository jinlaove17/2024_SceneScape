import BoardHeader from "../components/board/BoardHeader";
import BoardList from "../components/board/BoardList";

const Board = () => {
  return (
    <div className="w-[80rem] mx-auto">
      <BoardHeader title={"씬 공유 게시판"} />
      <BoardList />
    </div>
  );
};

export default Board;
