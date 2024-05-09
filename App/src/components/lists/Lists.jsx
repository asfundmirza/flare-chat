import React from "react";
import UserDetail from "./userDetail/UserDetail";
import Search from "./searchSection/Search";
import UserList from "./userList/userList";
import "./Lists.css";
import Loader from "react-spinners/BeatLoader";

const Lists = ({ currentUserData }) => {
  return (
    <>
      <div className="flex flex-1 flex-col overflow-auto p-5 h-full gap-[20px]">
        <div>
          <UserDetail userData={currentUserData} />
        </div>
        <div>
          <Search />
        </div>
        <div>
          <UserList userData={currentUserData} />
        </div>
      </div>
    </>
  );
};

export default Lists;
