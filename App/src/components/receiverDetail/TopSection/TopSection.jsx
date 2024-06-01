import React from "react";
import Avatar from "../../../assets/icons/avatar.png";
import { useChatStore } from "../../../../chatStore";
import { useUserStore } from "../../../../userStore";

const TopSection = () => {
  const { user } = useChatStore();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2 border-b border-slate-400/10 ">
        <img
          src={user?.avatar || Avatar}
          alt="avatar img"
          className="w-[70px] h-[70px] rounded-full object-cover"
        />
        <h2>{user?.username}</h2>
        <p className="text-xs text-gray-400/40 mb-4">User Description</p>
      </div>
    </div>
  );
};

export default TopSection;
