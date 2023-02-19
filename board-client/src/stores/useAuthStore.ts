import { create } from "zustand";

const useUserStore = create((set) => ({
  user: {},
  setUser: (user: any) => set(() => ({ user })),
}));

export default useUserStore;
