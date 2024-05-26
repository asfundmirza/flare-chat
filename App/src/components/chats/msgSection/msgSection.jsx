import React, { useEffect, useRef } from "react";
import Bg from "../../../assets/icons/bg.jpg";
const msgSection = () => {
  const endMessgesRef = useRef(null);

  useEffect(() => {
    endMessgesRef.current.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <>
      <div className="flex flex-col gap-8 py-5 px-3 h-full w-full overflow-auto">
        <div className="flex max-w-[50%] w-auto">
          <div className="flex flex-col gap-4 bg-purple-500/30 p-2  rounded-lg h-auto">
            <div className="flex flex-col">
              <h2>User name</h2>
              <p className="text-xs break-words">
                message content message content message message message message
                message message message
              </p>
            </div>

            <div className="">
              <p className="text-[8px] text-slate-300">1:20 AM</p>
            </div>
          </div>
        </div>
        {/* my own text */}

        <div className="flex max-w-[50%] w-auto self-end ">
          <div className="flex flex-col  gap-4 bg-slate-500/30 p-2  rounded-lg h-auto">
            <div className="flex flex-col">
              <h2>Me</h2>
              <p className="text-xs break-words">
                message content message content message contentmessage
                contentmessage contentmessage content message content message
                content message content message content message content message
                content message content message content message content content
                content content content content content content
              </p>
            </div>

            <div className="">
              <p className="text-[8px] text-slate-300">1:20 AM</p>
            </div>
          </div>
        </div>

        <div className="flex max-w-[50%] w-auto">
          <div className="flex flex-col gap-4 bg-purple-500/30 p-2  rounded-lg h-auto">
            <div className="flex flex-col">
              <h2>User name</h2>
              <img src={Bg} alt="bg image" className=" object-cover" />
            </div>

            <div className="">
              <p className="text-[8px] text-slate-300">1:20 AM</p>
            </div>
          </div>
        </div>
        <div ref={endMessgesRef} />
      </div>
    </>
  );
};

export default msgSection;
