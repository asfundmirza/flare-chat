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
  user: null,
  currentUserData: null,
  isLoggedIn: false,
  loading: true,
  addUserComponent: false,
  setAddUserComponent: (value) => set({ addUserComponent: value }),
  resetUserData: () => {
    set({
      user: null,
      currentUserData: null,
      isLoggedIn: false,
    });
  },
  fetchUserData: async () => {
    try {
      auth.onAuthStateChanged(async (currentUser) => {
        if (!currentUser) {
          console.log("No user logged in");
          set({
            user: null,
            currentUserData: null,
            loading: false,
            isLoggedIn: false,
          });
          return; // Return early if no user is logged in
        }
        if (currentUser) {
          // Fetch user data from Firestore using displayName
          const userRef = doc(db, "users", currentUser?.displayName);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            set({
              user: currentUser,
              currentUserData: docSnap?.data(),
              loading: false,
              isLoggedIn: true,
            });
          } else {
            console.log("User data not found in Firestore");
            set({
              user: currentUser,
              currentUserData: null,
              loading: false,
              isLoggedIn: true,
            });
          }
        } else {
          console.log("No user logged in");
          set({
            user: null,
            currentUserData: null,
            loading: false,
            isLoggedIn: false,
          });
        }
      });
    } catch (error) {
      console.log("Error fetching user data", error.message);
      set({ user: null, currentUserData: null, loading: false });
    }
  },
}));
export default useStore;
