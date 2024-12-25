import { useState } from "react";

import ReactMarkdownEditorLite from "react-markdown-editor-lite";
import markdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";

import SearchDropdown from "../SearchDropdown";

const mdParser = new markdownIt();

const contentList = [
  "전체",
  "이태원클라쓰",
  "미생",
  "스토브리그",
  "나의 아저씨",
  "아는 와이프",
  "무브 투 헤븐 : 나는 유품 정리사입니다.",
  "오징어게임",
];
const attractionTitleList = ["영진해변", "만휴정", "구룡포", "문화마실"];

const BoardForm = () => {
  const [filter, setFilter] = useState({
    sceneTitle: "",
    attractionTitle: "",
    title: "",
    content: "",
  });

  const onChangeFilter = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col w-[60rem] mx-auto gap-3 my-5 p-3 border border-gray-200">
      <div className="flex gap-5">
        <SearchDropdown
          title={"컨텐츠"}
          selected={filter.sceneTitle}
          itemList={contentList}
          onSelectItem={(item) => {
            onChangeFilter({
              target: {
                name: "sceneTitle",
                value: item,
              },
            });
          }}
        />

        <SearchDropdown
          title={"장소"}
          selected={filter.attractionTitle}
          itemList={attractionTitleList}
          onSelectItem={(item) => {
            onChangeFilter({
              target: {
                name: "attractionTitle",
                value: item,
              },
            });
          }}
        />
      </div>

      <input
        className="block flex-1 px-4 min-h-9 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-main-300"
        type="text"
        name="title"
        placeholder="제목을 입력해 주세요."
        onChange={onChangeFilter}
      />

      <ReactMarkdownEditorLite
        className="h-[30rem]"
        value={filter.content}
        onChange={({ text }) => {
          onChangeFilter({
            target: {
              name: "content",
              value: text,
            },
          });
        }}
        renderHTML={(text) => mdParser.render(text)}
      />

      <div className="text-end">
        <button
          className="w-24 ml-3 py-2 text-sm font-medium text-white bg-main-300 rounded-md hover:bg-main-400"
          type="button"
          onClick={() => {}}
        >
          작성하기
        </button>
      </div>
    </div>
  );
};

export default BoardForm;
