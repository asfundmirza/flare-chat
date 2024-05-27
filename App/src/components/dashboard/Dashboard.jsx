import React, { useState, useEffect } from "react";
import Lists from "../lists/Lists";
import ReceiverDetail from "../receiverDetail/ReceiverDetail";
import Chats from "../chats/Chats";
import DashboardBG from "../../assets/backgrounds/flare-bg.png";
import { useNavigate } from "react-router-dom";
import Loader from "react-spinners/BeatLoader";
import AddUser from "../addUser/AddUser";
import useStore from "../../../store";
const Dashboard = () => {
  const { addMode } = useStore();
  return (
    <>
      {/* <div className="flex w-full min-h-screen justify-center items-center bg-black">
          <Loader color="silver" className="w-18 h-18" />
        </div> */}

      <div
        style={{
          backgroundImage: `url(${DashboardBG})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative flex items-center  bg-black/30 backdrop-blur-sm justify-center h-screen">
          <div className="container p-0 mx-auto flex h-[80vh]  bg-black/10  rounded-lg text-white backdrop-blur-sm border border-gray-400/10 ">
            <Lists />

            <Chats />
            <ReceiverDetail />
          </div>
          {addMode && (
            <div className="absolute">
              <AddUser />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
