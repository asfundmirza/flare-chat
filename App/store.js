import { create } from "zustand";
import { auth, db } from "./firebase";
import {
  getDoc,
  getDocs,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
const useStore = create((set) => ({
  addMode: false,
  setAddMode: (value) => set({ addMode: value }),

  user: null,
  currentUserData: null,
  isLoggedIn: false,
  loading: true,
  friendsList: null,
  addUserComponent: false,
  addingFriendsLoading: false,
  addingUserError: null,
  activeFriend: null,
  setActiveFriend: (value) => set({ activeFriend: value }),
  setAddingUserError: (value) => set({ addingUserError: value }),
  setAddUserComponent: (value) => set({ addUserComponent: value }),
  resetUserData: () => {
    set({
      user: null,
      currentUserData: null,
      isLoggedIn: false,
      addUserComponent: false,
      activeFriend: null,
    });
  },
}));
export default useStore;
