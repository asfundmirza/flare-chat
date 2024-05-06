import React, { useState, useEffect } from "react";
import Lists from "../lists/Lists";
import ReceiverDetail from "../receiverDetail/ReceiverDetail";
import Chats from "../chats/Chats";
import DashboardBG from "../../assets/backgrounds/flare-bg.png";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  let navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("flare-chat");

    if (!storedUser) {
      navigate("/sign-in");
    }
  }, []);
  return (
    <div
      style={{
        backgroundImage: `url(${DashboardBG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center  bg-black/30 backdrop-blur-sm justify-center h-screen">
        <div className="container p-0 mx-auto flex h-[80vh]  bg-black/10  rounded-lg text-white backdrop-blur-sm border border-gray-400/10 ">
          <Lists />
          <Chats />
          <ReceiverDetail />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
