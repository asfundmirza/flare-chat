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
      addUserComponent: false,
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
  addFriend: async (friendUsername, currentUserData) => {
    try {
      //   if (user && isLoggedIn) {
      //     const userRef = doc(db, "users", user?.displayName);
      //   }
      // Query Firestore collection for user with the entered username
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot?.forEach(async (document) => {
        const userData = document?.data();
        if (userData?.name === friendUsername) {
          const currentUserRef = doc(
            collection(db, "users"),
            currentUserData?.name
          );
          const friendsRef = doc(collection(db, "users"), friendUsername);
          const currentUserDocSnap = await getDoc(currentUserRef);
          const friendsDocSnap = await getDoc(friendsRef);

          console.log(currentUserDocSnap.data());
          console.log(friendsDocSnap.data());

          console.log(`Friend "${friendUsername}" added successfully!`);
          return;
        }
      });
      console.log("user not found");
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  },
}));
export default useStore;
