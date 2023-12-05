import React from "react";
import { UserButton } from "@clerk/nextjs";

import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Divider from "@mui/material/Divider";

const Chats = ({ userInfo }) => {
  return (
    <div className="flex flex-col gap-5 py-3 px-6">
      <div className="flex border border-gray-600  items-center gap-3 p-3 rounded-xl w-full bg-slate-800">
        <div>
          <PersonSearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="text-gray-300 outline-none bg-inherit w-full text-lg"
        />
      </div>
      <Divider style={{ backgroundColor: "rgb(75, 85, 99)" }} />

      <div className="flex flex-col gap-3 ">
        <div className="flex border border-gray-600  items-center gap-3 p-5 rounded-xl w-full bg-slate-800">
          <UserButton />
          {userInfo}
        </div>
        <div className="flex border border-gray-600  items-center gap-3 p-5 rounded-xl w-full bg-slate-800">
          <UserButton />
          {userInfo}
        </div>
        <div className="flex border border-gray-600  items-center gap-3 p-5 rounded-xl w-full bg-slate-800">
          <UserButton />
          {userInfo}
        </div>
      </div>
    </div>
  );
};

export default Chats;
