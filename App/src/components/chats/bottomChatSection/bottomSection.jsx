import React, { useState } from "react";
import Img from "../../../assets/icons/img.png";
import Camera from "../../../assets/icons/camera.png";
import Mic from "../../../assets/icons/mic.png";
import Emoji from "../../../assets/icons/emoji.png";
import EmojiPicker from "emoji-picker-react";
const bottomSection = () => {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [messageContent, setMessageContent] = useState("");

  const toggleEmojiPicker = () => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
  };
  const onEmojiClick = (event) => {
    setMessageInput((prev) => prev + event.emoji);
    setIsEmojiPickerOpen(false);
  };
  const messageInputHandler = () => {
    setMessageInput("");
  };

  return (
    <div className="flex justify-between items-center gap-4 border-t border-slate-400/10 pt-5">
      <div className="flex gap-3 items-center">
        <img
          src={Img}
          alt="Image"
          className=" w-[20px] h-[20px] cursor-pointer"
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
      </div>
      <div className="flex-1">
        <input
          type="text"
          value={messageInput}
          placeholder="Enter your msg..."
          className="p-3 border-none outline-none bg-slate-400/10 rounded-lg w-full"
          onChange={(e) => setMessageInput(e.target.value)}
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
