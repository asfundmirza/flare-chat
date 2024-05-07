import React from "react";

const AddUser = () => {
  return (
    <div className="flex flex-col justify-between gap-8 bg-black/90 rounded-lg p-8 ">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          className=" bg-transparent outline-none border-b border-gray-400 text-white p-2"
          placeholder="Enter Username"
        />
        <span className="text-xs text-red-500">No user found</span>
      </div>
      <div className="flex justify-between text-white">
        <button className="p-2 px-4 bg-red-500/30 hover:bg-red-800 rounded-lg text-sm">
          Cancel
        </button>
        <button className="p-2 px-6 bg-purple-500/30 hover:bg-purple-800 rounded-lg text-sm">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddUser;
