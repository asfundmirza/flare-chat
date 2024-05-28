import React, { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { useUserStore } from "../../../userStore";
import useStore from "../../../store";

import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";

const AddUser = () => {
  const { setAddMode, addMode } = useStore();
  const [friendUserName, setFriendUserName] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser } = useUserStore();
  const cancelButtonHandler = () => {
    setAddMode(!addMode);
  };
  const searchButtonHandler = async () => {
    if (friendUserName === currentUser?.username) {
      setError("You cannot add yourself.");
      setUser(null);
      return;
    }

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", friendUserName));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
        setError("");
        setError("username found");
      } else {
        setUser(null);
        setError("username not found.");
      }
    } catch (err) {
      console.log(err);
      setUser(null);
      setError("An error occurred while searching for the username.");
    }
  };
  const userNameHandler = (e) => {
    setError("");
    setFriendUserName(e.target.value);
  };
  const addUserHandler = async () => {
    setLoading(true);
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });
      setLoading(false);
      setAddMode(!addMode);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-between gap-8 bg-black/90 rounded-lg p-8 border border-gray-400/20 ">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          className=" bg-transparent outline-none border-b border-gray-400 text-white p-2"
          placeholder="Enter Username"
          onChange={userNameHandler}
        />
        {error && <p className="text-xs px-2 text-red-600/80">{error}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-white">
          <button
            onClick={cancelButtonHandler}
            className="p-2 px-4 bg-red-500/30 hover:bg-red-800 rounded-lg text-sm"
          >
            Cancel
          </button>
          <button
            onClick={searchButtonHandler}
            className="p-2 px-4 bg-purple-500/30 hover:bg-purple-800 rounded-lg text-sm"
          >
            Search
          </button>
        </div>

        {error === "username found" && (
          <div className="p-2 px-6 bg-slate-400/20 text-center text-white hover:bg-slate-600 rounded-lg text-sm">
            <button onClick={addUserHandler}>
              {loading ? "Adding" : "Add User"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUser;
