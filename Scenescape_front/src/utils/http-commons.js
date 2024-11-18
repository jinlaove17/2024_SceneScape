import axios from "axios";

const { VITE_API_BASE_URL } = import.meta.env;

const localAxios = () => {
  const instance = axios.create({
    baseURL: VITE_API_BASE_URL,
    withCredentials: true, // 쿠키 전송 허용
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  return instance;
};

export { localAxios };
