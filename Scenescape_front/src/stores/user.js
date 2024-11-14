import { ref, computed } from "vue";
import { defineStore } from "pinia";
import userAPI from "@/api/user";

export const useUserStore = defineStore(
  "user",
  () => {
    const orgUserInfo = ref({});

    // getter
    const userInfo = computed(() => orgUserInfo.value);

    const login = (user, success, fail) => {
      userAPI.login(
        user,
        ({ data }) => {
          orgUserInfo.value = data.data;

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
      userInfo,
      login,
    };
  },
  {
    persist: true,
  }
);
