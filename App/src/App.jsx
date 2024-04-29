import React from "react";
import Lists from "./components/lists/Lists";
import Chats from "./components/chats/Chats";
import ReceiverDetail from "./components/receiverDetail/ReceiverDetail";

const App = () => {
  return (
    <div class="flex items-center justify-center h-screen">
      <div class="container mx-auto h-[80vh] bg-black/50  rounded-lg text-white backdrop-blur-sm border border-gray-400/10 ">
        <div className="flex">
          <Lists />
          <Chats />
          <ReceiverDetail />
        </div>
      </div>
    </div>
  );
};

export default App;
