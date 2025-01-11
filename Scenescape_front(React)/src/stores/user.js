import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      userInfo: null,

      login: (userInfo) => {
        if (userInfo && userInfo.id && userInfo.email) {
          set({ userInfo: { id: userInfo.id, email: userInfo.email } });
        } else {
          console.error("로그인 실패!");
        }
      },

      logout: () => {
        set({ userInfo: null });
      },
    }),
    {
      name: "userInfo",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
