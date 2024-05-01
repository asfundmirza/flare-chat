import React from "react";
import ArrowUp from "../../../assets/icons/arrowUp.png";
import ArrowDown from "../../../assets/icons/arrowDown.png";
import DloadImg from "../../../assets/icons/bg.jpg";
import Downloadicon from "../../../assets/icons/download.png";

const BottomSection = () => {
  return (
    <div className="flex flex-col mt-4  h-full justify-between">
      <div className="flex flex-col gap-3 ">
        <div className="flex justify-between">
          <div>
            <p>Chat Settings</p>
          </div>
          <div className=" bg-slate-400/10 p-2 rounded-full">
            <img src={ArrowUp} className="w-[10px] h-[10px]" />
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <p>Chat Settings</p>
          </div>
          <div className=" bg-slate-400/10 p-2 rounded-full">
            <img src={ArrowUp} className="w-[10px] h-[10px]" />
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <p>Privacy & Policy</p>
          </div>
          <div className=" bg-slate-400/10 p-2 rounded-full">
            <img src={ArrowUp} className="w-[10px] h-[10px]" />
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <p>Shared Files</p>
          </div>
          <div className=" bg-slate-400/10 p-2 rounded-full">
            <img src={ArrowDown} className="w-[10px] h-[10px]" />
          </div>
        </div>

        <div className="flex justify-between px-5 mt-5">
          <div className="flex gap-4">
            <img src={DloadImg} alt="dloadImg" className="w-[20px] h-[20px]" />
            <span className=" text-gray-400 text-xs">photo.png</span>
          </div>
          <div>
            <img
              src={Downloadicon}
              alt="download"
              className="w-[15px] h-[15px]"
            />
          </div>
        </div>
      </div>

      <button className=" justify-center w-full p-2 bg-red-900/50 hover:bg-red-500 text-center">
        Block
      </button>
    </div>
  );
};

export default BottomSection;
