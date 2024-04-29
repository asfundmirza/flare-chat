import React from "react";
import UserInfo from "./userInfo/userInfo";
import MsgSection from "./msgSection/msgSection";
import BottomChatSection from "./bottomChatSection/bottomSection";

const Chats = () => {
  return (
    <div className="flex flex-col w-1/2 border-l border-slate-400/10 p-5 border-r">
      <UserInfo />
      <MsgSection />
      <BottomChatSection />
    </div>
  );
};

export default Chats;
