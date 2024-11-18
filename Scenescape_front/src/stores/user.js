import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import userAPI from "@/api/user";

export const useUserStore = defineStore(
  "user",
  () => {
    const router = useRouter();
    const orgUserInfo = ref({
      id: "",
      pwd: "",
      nickname: "",
      email: "",
    });

    // getter
    const userInfo = computed(() => orgUserInfo.value);

    const loginUser = (user, success, fail) => {
      userAPI.loginUser(
        user,
        ({ data }) => {
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
    const deleteUser = (success, fail) => {
      userAPI.deleteUser(
        orgUserInfo.value.id,
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
      orgUserInfo.value.id = "";
      orgUserInfo.value.pwd = "";
      orgUserInfo.value.nickname = "";
      orgUserInfo.value.email = "";
    };

    return {
      orgUserInfo,
      userInfo,
      loginUser,
      logoutUser,
      updateUser,
      deleteUser,
    };
  }
  // { persist: true }
);
