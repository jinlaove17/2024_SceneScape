import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getPostsByFilter } from "../api/board";

import BoardHeader from "../components/board/BoardHeader";

const Board = () => {
  const [searchFilter, setSearchFilter] = useState({
    searchType: "title",
    searchKeyword: "",
  });
  const [sortType, setSortType] = useState("created");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["posts", searchFilter, sortType, page],
    queryFn: () => getPostsByFilter({ ...searchFilter, sortType, page }),
    options: {
      keepPreviousData: true,
    },
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const onSearch = (newFilter) => {
    setSearchFilter(newFilter);
    // for (const key in newFilter) {
    //   searchParams.set(key, newFilter[key]);
    // }
    setPage(1);
    // searchParams.set("page", 1);
    // setSearchParams(searchParams);
  };

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const onChangePage = (newPage) => {
    setPage(newPage);
    // searchParams.set("page", newPage);
    // setSearchParams(searchParams);
  };

  return (
    <div className="w-[80rem] mx-auto">
      <BoardHeader title={"씬 공유 게시판"} />
      {isLoading ? (
        <div className="text-gray-300 text-lg text-center">로딩 중입니다.</div>
      ) : (
        <Outlet
          context={{
            data: data.data,
            searchFilter,
            sortType,
            page,
            onSearch,
            onChangeSortType,
            onChangePage,
          }}
        />
      )}
    </div>
  );
};

export default Board;
