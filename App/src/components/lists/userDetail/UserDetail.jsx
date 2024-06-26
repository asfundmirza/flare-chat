import React from "react";
import Avatar from "../../../assets/icons/avatar.png";
import More from "../../../assets/icons/more.png";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { auth } from "../../../../firebase";

import { useUserStore } from "../../../../userStore";
const UserDetail = () => {
  const { currentUser } = useUserStore();
  return (
    <div className="flex justify-between  items-center">
      <div className="flex gap-2 items-center text-xl">
        <img
          src={currentUser.avatar || Avatar}
          alt="avatar"
          className="w-[80px] h-[80px] rounded-full object-cover"
        />

        <h2>{currentUser.username}</h2>
      </div>

      <div className="flex gap-3 ">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <img
              src={More}
              alt="edit"
              className="w-[20px] h-[20px] cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="flex justify-center bg-black text-white outline-none border-none"
              onClick={() => auth.signOut()}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default UserDetail;
