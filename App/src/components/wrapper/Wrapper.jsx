import React from "react";

const Wrapper = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container mx-auto h-[80vh] bg-black/50  rounded-lg text-white backdrop-blur-sm border border-gray-400/10 ">
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
