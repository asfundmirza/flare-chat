import React, { useState } from "react";
import Img from "../../../assets/icons/img.png";

import Emoji from "../../../assets/icons/emoji.png";
import EmojiPicker from "emoji-picker-react";
import { useUserStore } from "../../../../userStore";
import { useChatStore } from "../../../../chatStore";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import upload from "../../../../upload";
import BeatLoader from "react-spinners/BeatLoader";

const bottomSection = () => {
  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
      setLoading(false);
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
          disabled={isCurrentUserBlocked || isReceiverBlocked}
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "you cannot send messges "
              : "Type your message ...."
          }
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
            onClick={
              !(isCurrentUserBlocked || isReceiverBlocked)
                ? () => toggleEmojiPicker()
                : null
            }
            disabled={isCurrentUserBlocked || isReceiverBlocked}
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
          className={`p-2 px-4 bg-purple-500/30 ${
            isCurrentUserBlocked || isReceiverBlocked
              ? ""
              : "hover:bg-purple-800"
          }  rounded-lg text-sm`}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          {loading ? <BeatLoader size={4} color="#060022" /> : "Send"}
        </button>
      </div>
    </div>
  );
};

export default bottomSection;
