import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import {
  doc,
  setDoc,
  collection,
  updateDoc,
  getDoc,
  arrayUnion,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import BeatLoader from "react-spinners/BeatLoader";
import SignInBG from "../../assets/backgrounds/flare-bg.png";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [userNameError, setUserNameError] = useState("");

  const [firebaseError, setFirebaseError] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("flare-chat");

    if (storedUser) {
      navigate("/dashboard");
    } else {
      setPageLoading(false);
    }
  }, []);

  const register = async () => {
    try {
      // Flag to indicate if userName is unique
      let isUserNameUnique = true;

      // Unique userName check
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot?.forEach((doc) => {
        const data = doc?.data();
        if (data?.name && data?.name === userName) {
          setUserNameError("Dexhero already exists");
          isUserNameUnique = false;
          return;
        }
      });

      // Stop execution if userName is not unique
      if (!isUserNameUnique) {
        return;
      }

      if (password !== confirmPassword) {
        setConfirmPasswordError("Password does not match");

        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential?.user;
      await updateProfile(user, {
        displayName: userName,
      });

      const newUserRef = doc(collection(db, "users"), user?.displayName);

      // Set new user's document in Firestore
      await setDoc(newUserRef, {
        email: user?.email,
        uid: user?.uid,
        name: user?.displayName,
        createdAt: serverTimestamp(),
      });

      // Additional logic after successful registration
      localStorage.setItem(
        "flare-chat",
        JSON.stringify({
          email: user?.email,
          uid: user?.uid,
          name: user?.displayName,
        })
      );
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
      setFirebaseError(error.message);
    }
  };

  const nameChangeHandler = async (event) => {
    setUserName(event.target.value);
    setUserNameError("");
  };
  const emailHandler = async function (event) {
    setEmail(event.target.value);
    setFirebaseError("");
  };
  const passHandler = async (event) => {
    setPassword(event.target.value);
    setFirebaseError("");
  };

  const confirmPassHandler = async (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await register();
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
          {pageLoading ? (
            <div className="flex w-full min-h-screen justify-center items-center">
              <BeatLoader color={"#FFFFFF"} />
            </div>
          ) : (
            <div className="flex w-full min-h-screen items-center justify-center">
              <div className="flex max-w-[400px] p-[20px] text-center flex-col gap-4">
                <h1 className="text-white text-4xl mb-[50px]">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                  <input
                    className="w-full p-[15px] border-b-2 bg-inherit mb-4 text-white outline-none placeholder-gray font-sans"
                    value={userName}
                    id="username"
                    name="username"
                    onChange={nameChangeHandler}
                    required
                    type="text"
                    placeholder="User Name"
                  />
                  {userNameError && (
                    <span
                      style={{
                        fontSize: "10px",
                        color: "red",
                        display: "flex",
                        paddingLeft: "15px",
                      }}
                    >
                      {userNameError}
                    </span>
                  )}
                  <input
                    className="w-full p-[15px] border-b-2 bg-inherit mb-4 text-white outline-none placeholder-gray font-sans"
                    id="email"
                    name="email"
                    type="email"
                    onChange={emailHandler}
                    autoComplete="email"
                    placeholder="Email"
                    required
                  />
                  {firebaseError &&
                  firebaseError.includes("auth/email-already-in-use") ? (
                    <span
                      style={{
                        fontSize: "10px",
                        color: "red",
                        display: "flex",
                        paddingLeft: "15px",
                      }}
                    >
                      Email already in use
                    </span>
                  ) : firebaseError &&
                    firebaseError.includes("auth/invalid-email") ? (
                    <span
                      style={{
                        fontSize: "10px",
                        color: "red",
                        display: "flex",
                        paddingLeft: "15px",
                      }}
                    >
                      Invalid Email
                    </span>
                  ) : (
                    ""
                  )}
                  <input
                    className="w-full p-[15px] border-b-2 bg-inherit mb-8 text-white outline-none placeholder-gray font-sans"
                    id="password"
                    name="password"
                    type="password"
                    onChange={passHandler}
                    autoComplete="current-password"
                    placeholder="Password"
                    required
                  />{" "}
                  <input
                    className="w-full p-[15px] border-b-2 bg-inherit mb-8 text-white outline-none placeholder-gray font-sans"
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    onChange={confirmPassHandler}
                    autoComplete="current-password"
                    placeholder="Confirm Password"
                    required
                  />
                  {confirmPasswordError ? (
                    <span
                      style={{
                        fontSize: "10px",
                        color: "red",
                        display: "flex",
                        paddingLeft: "15px",
                      }}
                    >
                      Password does not match.
                    </span>
                  ) : (
                    firebaseError &&
                    (firebaseError.includes("auth/weak-password") ? (
                      <span
                        style={{
                          fontSize: "10px",
                          color: "red",
                          display: "flex",
                          paddingLeft: "15px",
                        }}
                      >
                        Password must be at least 6 characters
                      </span>
                    ) : firebaseError.includes("auth/missing-password") ? (
                      <span
                        style={{
                          fontSize: "10px",
                          color: "red",
                          display: "flex",
                          paddingLeft: "15px",
                        }}
                      >
                        Missing Password
                      </span>
                    ) : null)
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
                  <p className="font-sans">Already have an account?</p>
                  <Link to="/sign-in">
                    <p className=" text-white">Sign In</p>{" "}
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

export default SignUp;
