import React from "react";
import DashboardBG from "../../assets/backgrounds/flare-bg.png";

const Wrapper = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${DashboardBG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center bg-black/30 backdrop-blur-sm justify-center h-screen">
        <div className="container mx-auto flex  h-[80vh]  bg-black/10  rounded-lg text-white backdrop-blur-sm border border-gray-400/10 ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
