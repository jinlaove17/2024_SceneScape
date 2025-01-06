import { Outlet } from "react-router-dom";

import BoardHeader from "../components/board/BoardHeader";
import { useState } from "react";

const Board = () => {
  const [postList, setPostList] = useState([
    {
      id: 1,
      title: "테스트 게시글입니다.",
      content: "테스트 게시글입니다.",
    },
    {
      id: 2,
      title: "ㅋㅋㅋㅋㅋㅋㅋ",
      content:
        "# ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
    },
    {
      id: 3,
      title: "안녕하세요, 박새로이입니다.",
      content: "안녕하세요, 박새로이입니다.",
    },
    {
      id: 4,
      title: "이태원클라쓰에 나온 육교에서 한 컷",
      content: "## 이태원클라쓰에 나온 육교에서 한 컷",
    },
    {
      id: 5,
      title: "미생에 나온 회사에 취업했습니다.",
      content: "미생에 나온 회사에 취업했습니다.",
    },
    {
      id: 6,
      title: "Life is strange.",
      content: "### Life is strange.",
    },
  ]);

  const onCreatePost = (newPost) => {
    setPostList([...postList, newPost]);
  };

  const onUpdatePost = (post) => {
    setPostList(postList.map((item) => (item.id === post.id ? post : item)));
  };

  const onDeletePost = (id) => {
    setPostList(postList.filter((item) => item.id !== id));
  };

  return (
    <div className="w-[80rem] mx-auto">
      <BoardHeader title={"씬 공유 게시판"} />
      <Outlet
        context={{ postList, onCreatePost, onUpdatePost, onDeletePost }}
      />
    </div>
  );
};

export default Board;
