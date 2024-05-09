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
      set({
        addingFriendsLoading: true,
      });
      const userExists = (
        await getDoc(doc(db, "users", friendUsername))
      ).exists();
      if (!userExists) {
        console.log("User not found");
        set({
          addingFriendsLoading: false,
          addUserComponent: true,
          addingUserError: "User not found",
        });
        return;
      }
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
          const friendAlreadyExists = currentUserDocSnap
            ?.data()
            ?.friends?.some((friend) => friend?.name === friendUsername);

          if (friendAlreadyExists) {
            console.log("Friend already exists");
            set({
              addingFriendsLoading: false,
              addUserComponent: true,
              addingUserError: "Friend already exists",
            });
            return;
          }

          const updatedFriends = [
            ...currentUserData.friends,
            friendsDocSnap.data(),
          ];
          await updateDoc(currentUserRef, { friends: updatedFriends });
          console.log(currentUserDocSnap.data());
          console.log(friendsDocSnap.data());

          console.log(`Friend "${friendUsername}" added successfully!`);
          set((state) => ({
            ...state,
            currentUserData: {
              ...state.currentUserData,
              friends: updatedFriends,
            },
            addingFriendsLoading: false,
            addUserComponent: false,
          }));
          return;
        }
      });
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  },
}));
export default useStore;
