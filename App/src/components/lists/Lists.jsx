import React from "react";
import UserDetail from "./userDetail/UserDetail";
import Search from "./searchSection/Search";

const Lists = () => {
  return (
    <div className="flex flex-1 flex-col p-5 gap-[20px]">
      <div>
        <UserDetail />
      </div>
      <div>
        <Search />
      </div>
      <div>List section</div>
    </div>
  );
};

export default Lists;
