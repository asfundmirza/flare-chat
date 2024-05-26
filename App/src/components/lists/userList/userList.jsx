import React, { useEffect, useState } from "react";
import Avatar from "../../../assets/icons/avatar.png";
import Loader from "react-spinners/BeatLoader";

const userList = () => {
  return (
    <>
      <div className="flex flex-col gap-2 h-full overflow-auto ">
        <div
          className={`flex bg-slate-400/10 hover:bg-slate-500/30   cursor-pointer p-3 rounded-xl gap-3 items-center`}
          // key={friend.uid}
          // onClick={() => activeFriendHandler(friend)}
        >
          <div>
            <img
              src={Avatar}
              alt="userImage"
              className=" object-cover rounded-full w-[40px] h-[40px]"
            />
          </div>
          <div className="flex flex-col  gap-2">
            <div>name</div>
            <div className="text-xs">message</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default userList;
