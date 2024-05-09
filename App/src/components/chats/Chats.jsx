import React from "react";
import UserInfo from "./userInfo/userInfo";
import MsgSection from "./msgSection/msgSection";
import BottomChatSection from "./bottomChatSection/bottomSection";
import Loader from "react-spinners/BeatLoader";

const Chats = ({ currentUserData }) => {
  const friendsArray = currentUserData?.friends;
  return (
    <div className="flex flex-col w-1/2 border-l border-slate-400/10 p-5 border-r">
      {friendsArray && friendsArray.length > 0 ? (
        <>
          <UserInfo />
          <MsgSection userData={currentUserData} />
          <BottomChatSection />
        </>
      ) : (
        <div className="flex h-full w-full justify-center items-center">
          {!friendsArray ? (
            <div className="flex w-full items-center justify-center">
              <Loader color="silver" className="w-12 h-12" />
            </div>
          ) : (
            <h1 className="text-2xl">Please Add friends to start a chat</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Chats;
