import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      user: undefined,
      setUser: (u) => set(() => ({ user: u })),
      logOut: () => set(() => ({ user: undefined }))
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useStore;
