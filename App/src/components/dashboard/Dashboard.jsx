import React from "react";
import Lists from "../lists/Lists";
import ReceiverDetail from "../receiverDetail/ReceiverDetail";
import Chats from "../chats/Chats";

import AddUser from "../addUser/AddUser";
import useStore from "../../../store";
import { useChatStore } from "../../../chatStore";
const Dashboard = () => {
  const { addMode } = useStore();
  const { chatId } = useChatStore();
  console.log(chatId);
  return (
    <>
      <div className="relative flex items-center  bg-black/30 backdrop-blur-sm justify-center h-screen">
        <div className="container p-0 mx-auto flex md:h-[80vh] h-full  bg-black/10  rounded-lg text-white backdrop-blur-sm border border-gray-400/10 ">
          <div className={`${chatId ? "hidden md:flex" : "flex-1"}`}>
            <Lists />
          </div>
          {chatId && <Chats />}

          {chatId && <ReceiverDetail />}
        </div>
        {addMode && (
          <div className="absolute">
            <AddUser />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
