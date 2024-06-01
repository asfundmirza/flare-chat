import React from "react";
import Avatar from "../../../assets/icons/avatar.png";

import { useChatStore } from "../../../../chatStore";
import { FaArrowLeft } from "react-icons/fa";

const userInfo = () => {
  const { user, setChatID } = useChatStore();
  return (
    <div className="flex justify-between items-center pb-5 border-b border-slate-400/10">
      <div className="flex gap-4 items-center">
        <div className="md:hidden" onClick={setChatID}>
          <FaArrowLeft className="w-[20px] h-[20px] cursor-pointer" />
        </div>
        <img
          src={user?.avatar || Avatar}
          alt="avatar"
          className="rounded-full w-[60px] h-[60px] object-cover"
        />
        <div className="flex flex-col ">
          <h2>{user?.username}</h2>
          <p className=" text-xs text-gray-400/40">user description</p>
        </div>
      </div>
    </div>
  );
};

export default userInfo;
