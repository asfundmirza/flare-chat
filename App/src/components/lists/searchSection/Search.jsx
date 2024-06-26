import React, { useState } from "react";
import SearchIcon from "../../../assets/icons/search.png";
import Add from "../../../assets/icons/plus.png";
import Minus from "../../../assets/icons/minus.png";
import useStore from "../../../../store";
import { useChatStore } from "../../../../chatStore";

const Search = () => {
  const { setAddMode, addMode } = useStore();
  const { setSearchInput } = useChatStore();

  const addButtonHandler = () => {
    setAddMode(!addMode);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center gap-3">
        <div className="flex gap-2 bg-slate-400/10 p-2 items-center rounded-lg flex-1">
          <img
            src={SearchIcon}
            alt="searchIcon"
            className="w-[20px] h-[20px]"
          />
          <input
            type="search"
            placeholder="Search"
            className=" bg-transparent border-none outline-none w-full "
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div
          onClick={addButtonHandler}
          className="bg-slate-400/10 p-2 rounded-lg cursor-pointer"
        >
          {addMode ? (
            <img src={Minus} alt="addIcon" className="w-[10px] h-[10px]" />
          ) : (
            <img src={Add} alt="addIcon" className="w-[10px] h-[10px]" />
          )}
        </div>
      </div>
      <span className=" border-b border-b-slate-400/10"></span>
    </div>
  );
};

export default Search;
