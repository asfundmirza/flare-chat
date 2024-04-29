import React from "react";
import UserDetail from "./userDetail/UserDetail";
import Search from "./searchSection/Search";
import UserList from "./userList/userList";
const Lists = () => {
  return (
    <div className="flex flex-1 flex-col p-5 h-full overflow-auto gap-[20px]">
      <div>
        <UserDetail />
      </div>
      <div>
        <Search />
      </div>
      <div>
        <UserList />
      </div>
    </div>
  );
};

export default Lists;
