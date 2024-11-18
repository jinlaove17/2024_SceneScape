import { localAxios } from "@/utils/http-commons";

const userAPI = localAxios();

const signup = (user, success, fail) => {
  userAPI.post("/users/join", user).then(success).catch(fail);
};

const login = (user, success, fail) => {
  userAPI.post("/users/login", user).then(success).catch(fail);
};

const logout = (success, fail) => {
  userAPI.post("/users/logout").then(success).catch(fail);
};

const findPassword = (user, success, fail) => {
  userAPI.post("/users/find", user).then(success).catch(fail);
};

const modifyUser = (user, success, fail) => {
  userAPI.put("/users/modify", user).then(success).catch(fail);
};

const cancelUser = (userId, success, fail) => {
  userAPI.delete(`/users/delete/${userId}`).then(success).catch(fail);
};

export default { signup, login, logout, findPassword, modifyUser, cancelUser };
