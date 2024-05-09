import React from "react";
import Avatar from "../../../assets/icons/avatar.png";
import Phone from "../../../assets/icons/phone.png";
import Video from "../../../assets/icons/video.png";
import Info from "../../../assets/icons/info.png";
import useStore from "../../../../store";
import Loader from "react-spinners/BeatLoader";

const userInfo = () => {
  const { activeFriend } = useStore();
  return (
    <div className="flex justify-between items-center pb-5 border-b border-slate-400/10">
      {activeFriend ? (
        <div className="flex gap-4 items-center">
          <img
            src={activeFriend?.profileImageUrl || Avatar}
            alt="avatar"
            className="rounded-full w-[60px] h-[60px]"
          />
          <div className="flex flex-col ">
            <h2>{activeFriend?.name}</h2>
            <p className=" text-xs text-gray-400/40">user description</p>
          </div>
        </div>
      ) : (
        <div className="flex">
          <Loader color="silver" className="w-12 h-12" />
        </div>
      )}

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
