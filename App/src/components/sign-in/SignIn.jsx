import React from "react";
import { Link } from "react-router-dom";
import SignInBG from "../../assets/backgrounds/flare-bg.png";
const SignIn = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${SignInBG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex w-full h-screen items-center justify-center">
        <h1>Sign In</h1>
      </div>
    </div>
  );
};

export default SignIn;
