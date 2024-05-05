import React from "react";
import Avatar from "../../../assets/icons/avatar.png";

const userList = () => {
  return (
    <div className="flex flex-col gap-2 h-full overflow-auto ">
      <div className="flex bg-slate-400/10 hover:bg-slate-500 cursor-pointer p-3 rounded-xl gap-3 items-center">
        <div>
          <img
            src={Avatar}
            alt="userImage"
            className=" object-cover rounded-full w-[40px] h-[40px]"
          />
        </div>
        <div className="flex flex-col  gap-2">
          <div>user name</div>
          <div className="text-xs">message</div>
        </div>
      </div>
      <div className="flex bg-slate-400/10 hover:bg-slate-500 cursor-pointer p-3 rounded-xl gap-3 items-center">
        <div>
          <img
            src={Avatar}
            alt="userImage"
            className=" object-cover rounded-full w-[40px] h-[40px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>user name</div>
          <div className="text-xs">message</div>
        </div>
      </div>{" "}
      <div className="flex bg-slate-400/10 hover:bg-slate-500 cursor-pointer p-3 rounded-xl gap-3 items-center">
        <div>
          <img
            src={Avatar}
            alt="userImage"
            className=" object-cover rounded-full w-[40px] h-[40px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>user name</div>
          <div className="text-xs">message</div>
        </div>
      </div>{" "}
      <div className="flex bg-slate-400/10 hover:bg-slate-500 cursor-pointer p-3 rounded-xl gap-3 items-center">
        <div>
          <img
            src={Avatar}
            alt="userImage"
            className=" object-cover rounded-full w-[40px] h-[40px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>user name</div>
          <div className="text-xs">message</div>
        </div>
      </div>{" "}
      <div className="flex bg-slate-400/10 hover:bg-slate-500 cursor-pointer p-3 rounded-xl gap-3 items-center">
        <div>
          <img
            src={Avatar}
            alt="userImage"
            className=" object-cover rounded-full w-[40px] h-[40px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>user name</div>
          <div className="text-xs">message</div>
        </div>
      </div>{" "}
      <div className="flex bg-slate-400/10 hover:bg-slate-500 cursor-pointer p-3 rounded-xl gap-3 items-center">
        <div>
          <img
            src={Avatar}
            alt="userImage"
            className=" object-cover rounded-full w-[40px] h-[40px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>user name</div>
          <div className="text-xs">message</div>
        </div>
      </div>{" "}
    </div>
  );
};

export default userList;
