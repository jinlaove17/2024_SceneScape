import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [input, setInput] = useState({
    id: "",
    password: "",
  });
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const nav = useNavigate();

  const onClickLoginButton = (event) => {
    event.preventDefault();
  };

  return (
    <div className="mt-12">
      <div className="text-3xl text-center mb-3">로그인</div>

      <form
        className="w-[24rem] mx-auto border-2 rounded-lg p-8"
        onSubmit={onClickLoginButton}
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
            type={isVisiblePassword ? "text" : "password"}
            name="userPwd"
            id="userPwd"
            placeholder=""
            required
            autoComplete="off"
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
          <label
            htmlFor="userPwd"
            className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
          >
            비밀번호
          </label>

          {!isVisiblePassword ? (
            <svg
              className="absolute top-3 right-2 w-5 h-5 fill-gray-300 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              onClick={() => setIsVisiblePassword(true)}
            >
              <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
            </svg>
          ) : (
            <svg
              className="absolute top-3 right-2 w-5 h-5 fill-gray-300 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              onClick={() => setIsVisiblePassword(false)}
            >
              <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
            </svg>
          )}
        </div>

        <div className="text-end">
          <button
            className="w-24 mx-2 mt-3 px-3 py-2 text-sm font-medium text-white bg-main-300 rounded-lg hover:bg-main-400"
            type="button"
            onClick={() => nav("find-password")}
          >
            비밀번호 찾기
          </button>
          <button className="w-24 mx-2 mt-3 px-3 py-2 text-sm font-medium text-white bg-main-300 rounded-lg hover:bg-main-400">
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
