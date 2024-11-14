import { localAxios } from "@/utils/http-commons";

const userAPI = localAxios();

const signup = (user, success, fail) => {
  userAPI.post("/userRest/join.do", user).then(success).catch(fail);
};

const login = (user, success, fail) => {
  userAPI.post("/userRest/login.do", user).then(success).catch(fail);
};

export default { signup, login };
