import React from "react";
import Avatar from "../../../assets/icons/avatar.png";

const TopSection = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2 border-b border-slate-400/10 ">
        <img
          src={Avatar}
          alt="avatar img"
          className="w-[70px] h-[70px] rounded-full object-cover"
        />
        <h2>User Name</h2>
        <p className="text-xs text-gray-400/40 mb-4">User Description</p>
      </div>
    </div>
  );
};

export default TopSection;
