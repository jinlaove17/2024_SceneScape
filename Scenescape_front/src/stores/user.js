import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import userAPI from "@/api/user";

export const useUserStore = defineStore(
  "user",
  () => {
    const orgUserInfo = ref({
      id: "",
      pwd: "",
      nickname: "",
      email: "",
    });
    const router = useRouter();

    // getter
    const userInfo = computed(() => orgUserInfo.value);

    const resetUserInfo = () => {
      orgUserInfo.value.id = "";
      orgUserInfo.value.pwd = "";
      orgUserInfo.value.nickname = "";
      orgUserInfo.value.email = "";
    };
    const login = (user, success, fail) => {
      userAPI.login(
        user,
        ({ data }) => {
          console.log(data);
          orgUserInfo.value = data.userInfo;
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
    const logout = (success, fail) => {
      userAPI.logout(
        () => {
          resetUserInfo();
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
    const modifyUser = (user, success, fail) => {
      userAPI.modifyUser(
        user,
        () => {
          orgUserInfo.value = user;
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
    const cancelUser = (success, fail) => {
      userAPI.cancelUser(
        orgUserInfo.value.id,
        () => {
          resetUserInfo();
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

    return {
      orgUserInfo,
      userInfo,
      login,
      logout,
      modifyUser,
      cancelUser,
    };
  }
  // { persist: true }
);
