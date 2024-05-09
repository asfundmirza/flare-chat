import React, { useEffect } from "react";
import Avatar from "../../../assets/icons/avatar.png";
import useStore from "../../../../store";
import Loader from "react-spinners/BeatLoader";

const userList = ({ userData }) => {
  const { loading } = useStore();
  const loader = false;
  const friendsArray = userData?.friends;
  // console.log(friendsArray);
  return (
    <>
      {!userData ? (
        <div className="flex h-full justify-center items-center">
          <Loader color="silver" className="w-18 h-18" />
        </div>
      ) : (
        <div className="flex flex-col gap-2 h-full overflow-auto ">
          {friendsArray && friendsArray.length > 0 ? (
            friendsArray.map((friend) => (
              <div
                className="flex bg-slate-400/10 hover:bg-slate-500 cursor-pointer p-3 rounded-xl gap-3 items-center"
                key={friend.uid}
              >
                <div>
                  <img
                    src={friend.profileImageUrl || Avatar}
                    alt="userImage"
                    className=" object-cover rounded-full w-[40px] h-[40px]"
                  />
                </div>
                <div className="flex flex-col  gap-2">
                  <div>{friend.name}</div>
                  <div className="text-xs">message</div>
                </div>
              </div>
            ))
          ) : (
            <span className="flex justify-center w-full items-center">
              No friends
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default userList;
