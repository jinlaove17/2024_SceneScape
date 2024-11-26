import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import userAPI from "@/api/user";

export const useUserStore = defineStore(
  "user",
  () => {
    const router = useRouter();
    const redirectPath = ref(null);
    const userInfo = ref({
      id: "",
      pwd: "",
      nickname: "",
      email: "",
    });

    const setRedirectPath = (path) => {
      console.log("셋리다");
      redirectPath.value = path;
    };

    const loginUser = (user, success, fail) => {
      userAPI.loginUser(
        user,
        ({ data }) => {
          userInfo.value = data.userInfo;
          if (redirectPath.value) {
            console.log("이값을 봐라", redirectPath.value);
            router.push(redirectPath.value);
            redirectPath.value = null;
          } else {
            router.replace({ name: "main" });
          }

          if (success) {
            success();
          }
        },
        () => {
          if (fail) {
            fail();
          }
        }
      );
    };
    const logoutUser = (success, fail) => {
      userAPI.logoutUser(
        () => {
          reset();
          router.replace({ name: "main" });

          if (success) {
            success();
          }
        },
        () => {
          if (fail) {
            fail();
          }
        }
      );
    };
    const updateUser = (user, success, fail) => {
      userAPI.updateUser(
        user,
        () => {
          userInfo.value = user;
          router.replace({ name: "main" });

          if (success) {
            success();
          }
        },
        () => {
          if (fail) {
            fail();
          }
        }
      );
    };
    const deleteUser = (success, fail) => {
      userAPI.deleteUser(
        userInfo.value.id,
        () => {
          reset();
          router.replace({ name: "main" });

          if (success) {
            success();
          }
        },
        () => {
          if (fail) {
            fail();
          }
        }
      );
    };
    const reset = () => {
      userInfo.value.id = "";
      userInfo.value.pwd = "";
      userInfo.value.nickname = "";
      userInfo.value.email = "";
    };

    return {
      redirectPath,
      setRedirectPath,

      userInfo,
      loginUser,
      logoutUser,
      updateUser,
      deleteUser,
    };
  },
  { persist: true }
);
