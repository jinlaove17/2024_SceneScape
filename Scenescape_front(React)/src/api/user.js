import getInstance from "../utils/http-commons";

const userAPI = getInstance();

const registerUser = async (user) => {
  return await userAPI.post("/user", user);
};

const loginUser = async (user) => {
  return await userAPI.post("/user/login", user);
};

const logoutUser = async () => {
  return await userAPI.post("/user/logout");
};

export { registerUser, loginUser, logoutUser };
