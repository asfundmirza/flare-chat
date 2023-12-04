import React from "react";
import Message from "./Message";
import Chats from "./Chats";
const Chat = () => {
  return (
    <div className="flex w-full main-content-height">
      <div className="flex-none w-[25%] border-r border-gray-600 h-full">
        <div className="text-white">
          <Chats />
        </div>
      </div>

      <div className="flex-grow text-white h-full">
        <Message />
      </div>
    </div>
  );
};

export default Chat;
