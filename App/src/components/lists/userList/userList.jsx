import React, { useEffect, useState } from "react";
import Avatar from "../../../assets/icons/avatar.png";
import useStore from "../../../../store";
import Loader from "react-spinners/BeatLoader";

const userList = ({ userData }) => {
  const [activeFriendState, setActiveFriendState] = useState(null);
  const { setActiveFriend } = useStore();
  const friendsArray = userData?.friends;

  useEffect(() => {
    if (friendsArray && friendsArray.length > 0) {
      setActiveFriendState(friendsArray[0]);
      setActiveFriend(friendsArray[0]);
    }
  }, [friendsArray]);

  const activeFriendHandler = (friend) => {
    setActiveFriendState(friend);
    setActiveFriend(friend);
  };
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
                className={`flex bg-slate-400/10 hover:bg-slate-500/30 ${
                  activeFriendState === friend ? "bg-slate-500/30" : ""
                }  cursor-pointer p-3 rounded-xl gap-3 items-center`}
                key={friend.uid}
                onClick={() => activeFriendHandler(friend)}
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
