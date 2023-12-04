import React from "react";
import { UserButton } from "@clerk/nextjs";

const Navbar = ({ userName }) => {
  return (
    <div className="text-white w-full bg-black rounded-t-lg border-b-2 p-4">
      <div className="flex items-center justify-between">
        <div className="justify-start">
          <p className="text-2xl font-semibold px-5">Flare Chat</p>
        </div>

        <div className="flex gap-2 items-center justify-end">
          <div>{userName}</div>
          <div>
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
