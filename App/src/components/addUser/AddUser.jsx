import React, { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import useStore from "../../../store";
const AddUser = () => {
  const { setAddMode, addMode } = useStore();
  const [friendUserName, setFriendUserName] = useState("");
  const cancelButtonHandler = () => {
    setAddMode(!addMode);
  };
  const addButtonHandler = () => {};
  const userNameHandler = (e) => {
    setAddingUserError("");
    setFriendUserName(e.target.value);
  };
  return (
    <div className="flex flex-col justify-between gap-8 bg-black/90 rounded-lg p-8 border border-gray-400/20 ">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          className=" bg-transparent outline-none border-b border-gray-400 text-white p-2"
          placeholder="Enter Username"
          onChange={userNameHandler}
        />
      </div>
      <div className="flex justify-between text-white">
        <button
          onClick={cancelButtonHandler}
          className="p-2 px-4 bg-red-500/30 hover:bg-red-800 rounded-lg text-sm"
        >
          Cancel
        </button>
        <button
          onClick={addButtonHandler}
          className="p-2 px-6 bg-purple-500/30 hover:bg-purple-800 rounded-lg text-sm"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddUser;
