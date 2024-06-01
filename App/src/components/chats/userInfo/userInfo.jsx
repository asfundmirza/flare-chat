import React from "react";
import Avatar from "../../../assets/icons/avatar.png";
import Phone from "../../../assets/icons/phone.png";
import Video from "../../../assets/icons/video.png";
import Info from "../../../assets/icons/info.png";
import { useChatStore } from "../../../../chatStore";
import { FaArrowLeft } from "react-icons/fa";

const userInfo = () => {
  const { user, setChatID } = useChatStore();
  return (
    <div className="flex justify-between items-center pb-5 border-b border-slate-400/10">
      <div className="flex gap-4 items-center">
        <div onClick={setChatID}>
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

      <div className="flex gap-4 items-center">
        <img
          src={Phone}
          alt="phone"
          className=" w-[20px] h-[20px] cursor-pointer"
        />
        <img
          src={Video}
          alt="video"
          className=" w-[20px] h-[20px] cursor-pointer"
        />
        <img
          src={Info}
          alt="info"
          className=" w-[20px] h-[20px] cursor-pointer"
        />
      </div>
    </div>
  );
};

export default userInfo;
