import React, { useEffect, useState } from "react";
import Avatar from "../../../assets/icons/avatar.png";
import Loader from "react-spinners/BeatLoader";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useUserStore } from "../../../../userStore";
import { useChatStore } from "../../../../chatStore";

const userList = () => {
  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleClick = async (chat) => {
    changeChat(chat.chatId, chat.user);
  };

  return (
    <>
      <div className="flex flex-col gap-2 h-full overflow-auto ">
        {chats?.map((chat) => (
          <div
            onClick={() => handleClick(chat)}
            key={chat.chatId}
            className={`flex bg-slate-400/10 hover:bg-slate-500/30   cursor-pointer p-3 rounded-xl gap-3 items-center`}
          >
            <div>
              <img
                src={chat.user.avatar || Avatar}
                alt="userImage"
                className=" object-cover rounded-full w-[40px] h-[40px]"
              />
            </div>
            <div className="flex flex-col  gap-2">
              <div>{chat.user.username}</div>
              <div className="text-xs">{chat.lastMessage}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default userList;
