import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import SignInBG from "../../assets/backgrounds/flare-bg.png";
import { useUserStore } from "../../../userStore";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const [firebaseError, setFirebaseError] = useState("");
  const { isLoading } = useUserStore();
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
      setFirebaseError(error.message);
    }
  };
  const emailHandler = async function (event) {
    setEmail(event.target.value);
    setFirebaseError("");
  };
  const passHandler = async (event) => {
    setPassword(event.target.value);
    setFirebaseError("");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login();
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${SignInBG})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex w-full h-screen bg-black/60 backdrop-blur-sm items-center justify-center">
          {isLoading ? (
            <div className="flex w-full min-h-screen justify-center items-center">
              <BeatLoader color={"#FFFFFF"} />
            </div>
          ) : (
            <div className="flex w-full min-h-screen items-center justify-center">
              <div className="flex max-w-[400px] p-[20px] text-center flex-col gap-4">
                <h1 className="text-white text-4xl mb-[50px]">Sign In</h1>
                <form onSubmit={handleSubmit}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoFocus
                    onChange={emailHandler}
                    autoComplete="email"
                    className="w-full p-[15px] border-b-2 bg-inherit mb-4 text-white outline-none placeholder-gray font-sans"
                    placeholder="Email"
                  />
                  <input
                    id="password"
                    name="password"
                    onChange={passHandler}
                    type="password"
                    autoComplete="current-password"
                    required
                    className={`w-full p-[15px] border-b-2 bg-inherit ${
                      firebaseError ? "mb-4" : "mb-8"
                    } text-white outline-none placeholder-gray font-sans`}
                    placeholder="Password"
                  />
                  {firebaseError &&
                  firebaseError.includes("auth/invalid-credential") ? (
                    <span className="text-[10px] text-red-500 flex px-[15px] mb-8">
                      Invalid Credentials
                    </span>
                  ) : (
                    ""
                  )}
                  <div className="w-full justify-center">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-white text-[#060022] rounded-lg"
                    >
                      {loading ? (
                        <BeatLoader size={8} color="#060022" />
                      ) : (
                        "SUBMIT"
                      )}
                    </button>
                  </div>
                </form>
                <div className=" flex justify-center gap-2 text-gray-400  text-sm">
                  <p className="font-sans">Don't have an account?</p>
                  <Link to="/sign-up">
                    <p className=" text-white">Sign Up</p>{" "}
                  </Link>
                </div>
                <div className="flex justify-center">
                  <Link to="/forgot-pass">
                    <p className="text-white font-sans">Forgot Password?</p>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SignIn;
