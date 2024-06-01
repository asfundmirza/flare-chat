import React from "react";
import TopSection from "./TopSection/TopSection";
import BottomSection from "./BottomSection/BottomSection";
const ReceiverDetail = () => {
  return (
    <div className="flex-1 hidden md:flex p-5  flex-col h-full">
      <TopSection />
      <BottomSection />
    </div>
  );
};

export default ReceiverDetail;
