import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostsByFilter } from "../api/board";

import BoardHeader from "../components/board/BoardHeader";

const Board = () => {
  const [filter, setFilter] = useState({
    searchType: "title",
    searchKeyword: "",
    sortType: "created",
    page: 1,
  });

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["posts", filter.page],
    queryFn: () => getPostsByFilter(filter),
    options: {
      keepPreviousData: true,
    },
  });

  const onChangeFilter = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-[80rem] mx-auto">
      <BoardHeader title={"씬 공유 게시판"} />
      {isLoading ? (
        <div>로딩 중입니다.</div>
      ) : (
        <Outlet
          context={{
            data: data.data,
            filter,
            onChangeFilter,
            onSearch: () => refetch(),
          }}
        />
      )}
    </div>
  );
};

export default Board;
