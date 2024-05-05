import React from "react";
import Lists from "./components/lists/Lists";
import Chats from "./components/chats/Chats";
import ReceiverDetail from "./components/receiverDetail/ReceiverDetail";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import { Outlet } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

const App = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
// <div class="flex items-center justify-center h-screen">
//   <div class="container mx-auto h-[80vh] bg-black/50  rounded-lg text-white backdrop-blur-sm border border-gray-400/10 ">
//     {user ? (
//       <div className="flex h-full">
//         <Lists />
//         <Chats />
//         <ReceiverDetail />
//       </div>
//     ) : (
//       <div className="flex h-full">
//         <SignIn />
//         <SignUp />
//       </div>
//     )}
//   </div>
// </div>
