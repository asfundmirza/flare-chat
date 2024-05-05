import React from "react";
import Lists from "../lists/Lists";
import ReceiverDetail from "../receiverDetail/ReceiverDetail";
import Wrapper from "../wrapper/Wrapper";

const Dashboard = () => {
  return (
    <Wrapper>
      <Lists />
      <Chats />
      <ReceiverDetail />
    </Wrapper>
  );
};

export default Dashboard;
