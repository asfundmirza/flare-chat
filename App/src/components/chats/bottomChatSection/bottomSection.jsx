import React, { useState } from "react";
import Img from "../../../assets/icons/img.png";
import Camera from "../../../assets/icons/camera.png";
import Mic from "../../../assets/icons/mic.png";
import Emoji from "../../../assets/icons/emoji.png";
import EmojiPicker from "emoji-picker-react";
import { useUserStore } from "../../../../userStore";
import { useChatStore } from "../../../../chatStore";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import upload from "../../../../upload";

const bottomSection = () => {
  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const toggleEmojiPicker = () => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
  };
  const onEmojiClick = (event) => {
    setText((prev) => prev + event.emoji);
    setIsEmojiPickerOpen(false);
  };
  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const messageInputHandler = async () => {
    if (text === "") return;

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setImg({
        file: null,
        url: "",
      });

      setText("");
    }
  };

  return (
    <div className="flex justify-between items-center gap-4 border-t border-slate-400/10 pt-5">
      <div className="flex gap-3 items-center">
        <label htmlFor="file">
          <img
            src={Img}
            alt="img"
            className=" w-[20px] h-[20px] cursor-pointer"
          />
        </label>
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={handleImg}
        />
        <img
          src={Camera}
          alt="camera"
          className=" w-[20px] h-[20px] cursor-pointer"
        />
        <img
          src={Mic}
          alt="mic"
          className=" w-[20px] h-[20px] cursor-pointer"
        />
        {img.file && (
          <img
            src={img.url}
            alt="Selected Image"
            className="w-12 h-12 rounded-full object-cover object-center"
          />
        )}
      </div>
      <div className="flex-1">
        <input
          type="text"
          value={text}
          placeholder="Enter your msg..."
          className="p-3 border-none outline-none bg-slate-400/10 rounded-lg w-full"
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="flex gap-3 items-center">
        <div className="relative">
          <img
            src={Emoji}
            alt="emoji"
            className="  w-[20px] h-[20px] cursor-pointer"
            onClick={() => toggleEmojiPicker()}
          />
          <div className=" absolute bottom-[30px] left-[0px] ">
            <EmojiPicker
              theme="dark"
              open={isEmojiPickerOpen}
              onEmojiClick={onEmojiClick}
            />
          </div>
        </div>
        <button
          onClick={messageInputHandler}
          className="p-2 px-4 bg-purple-500/30 hover:bg-purple-800 rounded-lg text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default bottomSection;
