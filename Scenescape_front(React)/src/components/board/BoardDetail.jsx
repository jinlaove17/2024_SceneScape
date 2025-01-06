import ReactMarkdownEditorLite from "react-markdown-editor-lite";
import markdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import "./BoardDetail.css";

import { useOutletContext, useParams } from "react-router-dom";

const mdParser = new markdownIt();

const BoardDetail = () => {
  const { postList } = useOutletContext();
  const { id } = useParams();
  const post = postList.find((item) => item.id === parseInt(id));

  return (
    <div className="w-[64rem] mx-auto my-5 p-3 bg-white border border-gray-200 rounded-md">
      {/* <div
          v-if="isLoading"
          className="text-center"
        >
          <div><VSkeleton className="w-full" /></div>
        </div> */}
      <div>
        <div className="flex flex-col justify-center">
          <p className="text-sm text-gray-400">이태원클라쓰 &gt; 녹사평 육교</p>
          <h1 className="text-2xl border-b py-2 border-b-gray-200">
            {post.title}
          </h1>
        </div>

        <div className="flex w-full px-2 py-2 justify-between items-center">
          <div className="flex">
            <svg
              className="w-9 h-9 mt-1 mr-2 fill-gray-300"
              viewBox="-8 0 512 512"
            >
              <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z" />
            </svg>

            <div className="flex flex-col justify-center">
              <p>작성자: JJ</p>
              <p className="text-gray-500 text-sm">작성일: 2025-01-06</p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-3">
            <div className="flex justify-center items-center gap-1">
              <svg
                className="w-4 h-4 fill-gray-500"
                viewBox="0 0 576 512"
              >
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
              </svg>
              <p className="pt-1">854</p>
            </div>

            <div className="flex justify-center items-center gap-1">
              <svg
                className="w-4 h-4 fill-blue-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16l-97.5 0c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8l97.5 0c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32l-64 0z" />
              </svg>
              <p className="pt-1">35</p>
            </div>
          </div>
        </div>

        <ReactMarkdownEditorLite
          value={post.content}
          renderHTML={(text) => mdParser.render(text)}
        />

        <div className="flex justify-center items-center m-3">
          {/* <!--좋아요 버튼--> */}
          <div className="flex flex-col items-center">
            <button
              className="w-16 h-16 m-2 rounded-2xl"
              // :className="
              //   likeStatus === 1
              //     ? 'bg-blue-300 text-white'
              //     : 'bg-gray-200 text-black'
              // "
              // :disabled="likeStatus !== 0"
              // @click="pushLikeButton(1)"
            >
              <div className="flex justify-center items-center">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 512 512"
                >
                  <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16l-97.5 0c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8l97.5 0c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32l-64 0z" />
                </svg>
              </div>
            </button>
            <p className="text-sm">좋아요</p>
          </div>

          {/* <!--싫어요 버튼--> */}
          <div className="flex flex-col items-center">
            <button
              className="w-16 h-16 m-2 rounded-2xl"
              // :className="
              //   likeStatus === -1
              //     ? 'bg-red-300 text-white'
              //     : 'bg-gray-200 text-black'
              // "
              // :disabled="likeStatus !== 0"
              // @click="pushLikeButton(-1)"
            >
              <div className="flex justify-center items-center">
                <svg
                  className="w-8 h-8 transform scale-y-[-1]"
                  viewBox="0 0 512 512"
                >
                  <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16l-97.5 0c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8l97.5 0c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32l-64 0z" />
                </svg>
              </div>
            </button>
            <p className="text-sm">싫어요</p>
          </div>
        </div>

        <div className="text-end">
          <button className="w-24 ml-3 mt-3 py-2 text-sm font-medium text-white bg-main-300 rounded-md hover:bg-main-400">
            수정하기
          </button>

          <button className="w-24 ml-3 mt-3 py-2 text-sm font-medium text-white bg-red-300 rounded-md hover:bg-red-400">
            삭제하기
          </button>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 fill-gray-300 mb-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z" />
            </svg>
            <h1 className="text-xl">댓글 (0)</h1>
          </div>

          {/* <!-- 댓글 입력 영역 --> */}
          <div className="flex items-center space-x-3 mb-4">
            <textarea
              className="flex-1 p-3 border border-gray-300 rounded-md outline-none focus:border-main-300 resize-none"
              placeholder="댓글을 입력하세요..."
              rows="3"
            ></textarea>
            <button className="w-24 ml-3 mt-3 py-2 text-sm font-medium text-white bg-main-300 rounded-md hover:bg-main-400">
              작성하기
            </button>
          </div>

          {/* <!-- 댓글 목록 --> */}
          {/* <ul>
          <VCommentItem
            v-for="comment in commentTree"
            :key="comment.no"
            :author="post.userId"
            :comment="comment"
            @add-reply="(data) => submitComment(data)"
          />
        </ul> */}
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
