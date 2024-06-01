import { create } from "zustand";

const useStore = create((set) => ({
  addMode: false,
  setAddMode: (value) => set({ addMode: value }),
}));
export default useStore;
