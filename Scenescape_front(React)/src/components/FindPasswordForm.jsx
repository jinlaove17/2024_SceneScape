import { useState } from "react";

const FindPasswordForm = () => {
  const [input, setInput] = useState({
    id: "",
    password: "",
  });

  const onClickFindButton = (event) => {
    event.preventDefault();
  };

  return (
    <div className="mt-12">
      <div className="text-3xl text-center mb-3">비밀번호 찾기</div>

      <form
        className="w-[24rem] mx-auto border-2 rounded-lg p-8"
        onSubmit={onClickFindButton}
      >
        <div className="relative w-full mb-5">
          <input
            className="block pt-2 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-300 peer"
            type="text"
            name="userId"
            id="userId"
            placeholder=""
            required
            onChange={(e) => setInput({ ...input, id: e.target.value })}
          />
          <label
            htmlFor="userId"
            className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
          >
            아이디
          </label>
        </div>

        <div className="relative z-0 w-full mb-5">
          <input
            className="block pt-2 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-300 peer"
            type="email"
            name="userEmail"
            id="userEmail"
            placeholder=""
            required
            autoComplete="off"
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
          <label
            htmlFor="userEmail"
            className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
          >
            이메일
          </label>
        </div>

        <div className="text-end">
          <button className="w-24 mx-2 mt-3 px-3 py-2 text-sm font-medium text-white bg-main-300 rounded-lg hover:bg-main-400">
            찾기
          </button>
        </div>
      </form>
    </div>
  );
};

export default FindPasswordForm;
