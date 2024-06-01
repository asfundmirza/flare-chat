import React, { useEffect, useRef, useState } from "react";
import Bg from "../../../assets/icons/bg.jpg";
import { useChatStore } from "../../../../chatStore";
import { useUserStore } from "../../../../userStore";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase";
const msgSection = () => {
  const [chat, setChat] = useState();
  const { chatId } = useChatStore();
  const { currentUser } = useUserStore();
  const endMessgesRef = useRef(null);

  useEffect(() => {
    endMessgesRef.current.scrollIntoView({ behavior: "smooth" });
  });
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  return (
    <>
      <div className="flex flex-col gap-8 py-5 px-3 h-full w-full overflow-auto">
        {/* my own text */}

        {chat?.messages?.map((message, idx) => (
          <div
            key={idx}
            className={`flex max-w-[50%] w-auto ${
              message.senderId === currentUser.id ? "self-end" : ""
            } `}
          >
            <div className="flex flex-col gap-4 bg-purple-500/30 p-2  rounded-lg h-auto">
              <div className="flex flex-col">
                {/* <h2>User name</h2> */}
                {message.img && (
                  <img
                    src={message.img}
                    alt="bg image"
                    className=" object-cover"
                  />
                )}
                <p className="text-xs break-words">{message.text}</p>
              </div>

              <div className="">
                {/* <p className="text-[8px] text-slate-300">{message}</p> */}
              </div>
            </div>
          </div>
        ))}
        <div ref={endMessgesRef} />
      </div>
    </>
  );
};

export default msgSection;
