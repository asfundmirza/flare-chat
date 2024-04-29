import React from "react";
import Avatar from "../../../assets/icons/avatar.png";
import More from "../../../assets/icons/more.png";
import Video from "../../../assets/icons/video.png";
import Edit from "../../../assets/icons/edit.png";

const UserDetail = () => {
  return (
    <div className="flex justify-between  items-center">
      <div className="flex gap-2 items-center text-xl">
        <img
          src={Avatar}
          alt="avatar"
          className="w-[80px] h-[80px] rounded-full"
        />
        <h2>asfund mirza</h2>
      </div>

      <div className="flex gap-3 ">
        <img
          src={More}
          alt="more"
          className="w-[20px] h-[20px] cursor-pointer"
        />
        <img
          src={Video}
          alt="video"
          className="w-[20px] h-[20px] cursor-pointer"
        />
        <img
          src={Edit}
          alt="edit"
          className="w-[20px] h-[20px] cursor-pointer"
        />
      </div>
    </div>
  );
};

export default UserDetail;
