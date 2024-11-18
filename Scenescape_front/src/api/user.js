import { localAxios } from "@/utils/http-commons";

const userAPI = localAxios();

const signup = (user, success, fail) => {
  userAPI.post("/userRest/join.do", user).then(success).catch(fail);
};

const login = (user, success, fail) => {
  userAPI.post("/userRest/login.do", user).then(success).catch(fail);
};

const logout = (success, fail) => {
  userAPI.post("/userRest/logout.do").then(success).catch(fail);
};

const findPassword = (user, success, fail) => {
  userAPI.post("/userRest/find.do", user).then(success).catch(fail);
};

const modifyUser = (user, success, fail) => {
  userAPI.put("/userRest/modify.do", user).then(success).catch(fail);
};

const cancelUser = (userId, success, fail) => {
  userAPI.delete(`/userRest/delete.do/${userId}`).then(success).catch(fail);
};

export default { signup, login, logout, findPassword, modifyUser, cancelUser };
