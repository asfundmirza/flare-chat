import React, { useEffect, useState } from "react";
import Avatar from "../../../assets/icons/avatar.png";
import More from "../../../assets/icons/more.png";
import Video from "../../../assets/icons/video.png";
import Edit from "../../../assets/icons/edit.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import useStore from "../../../../store";
import Loader from "react-spinners/BeatLoader";

const UserDetail = ({ userData }) => {
  const { resetUserData } = useStore();

  const navigate = useNavigate();
  const signOutHandler = () => {
    localStorage.removeItem("flare-chat");
    resetUserData();
    navigate("/sign-in");
  };
  return (
    <div className="flex justify-between  items-center">
      {userData ? (
        <div className="flex gap-2 items-center text-xl">
          <img
            src={userData?.profileImageUrl || Avatar}
            alt="avatar"
            className="w-[80px] h-[80px] rounded-full object-cover"
          />

          <h2>{userData?.name}</h2>
        </div>
      ) : (
        <div className="flex">
          <Loader color="silver" className="w-12 h-12" />
        </div>
      )}

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
              onClick={signOutHandler}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <img
          src={Video}
          alt="video"
          className="w-[20px] h-[20px] cursor-pointer"
        />

        <img
          src={Edit}
          alt="edit"
          className="w-[20px] h-[20px] cursor-pointer"
        />
      </div>
    </div>
  );
};

export default UserDetail;
