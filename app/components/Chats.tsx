import React from "react";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Divider from "@mui/material/Divider";

const Chats = () => {
  return (
    <div className="flex flex-col py-3 px-6">
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
      <Divider />
    </div>
  );
};

export default Chats;
