import React from "react";
import { UserButton } from "@clerk/nextjs";

const Navbar = ({ userName }) => {
  return (
    <div className="text-white w-full   border-b border-gray-600 p-2">
      <div className="flex items-center py-2 justify-between">
        <div className="justify-start">
          <p className="text-2xl font-semibold px-6">Flare Chat</p>
        </div>

        <div className="flex gap-2 items-center justify-end px-6">
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
