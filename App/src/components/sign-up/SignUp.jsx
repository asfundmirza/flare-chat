import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import BeatLoader from "react-spinners/BeatLoader";
import SignInBG from "../../assets/backgrounds/flare-bg.png";
import Minus from "../../assets/icons/minus.png";
import upload from "../../../upload";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [userNameError, setUserNameError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadURL, setDownloadURL] = useState(null);

  const [firebaseError, setFirebaseError] = useState("");
  const [pageLoading, setPageLoading] = useState(false);
  let navigate = useNavigate();

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("flare-chat");

  //   if (storedUser) {
  //     navigate("/dashboard");
  //   } else {
  //     setPageLoading(false);
  //   }
  // }, []);

  const register = async () => {
    try {
      let isUserNameUnique = true;

      // Unique userName check
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot?.forEach((doc) => {
        const data = doc?.data();
        if (data?.username && data?.username === userName) {
          setUserNameError("username already exists");
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
      let imageUrl = "";
      if (selectedFile) {
        imageUrl = await upload(selectedFile);
      }
      await setDoc(doc(db, "users", userCredential?.user?.uid), {
        username: userName,
        email: email,
        id: userCredential?.user?.uid,
        avatar: imageUrl,
        blocked: [],
      });
      await setDoc(doc(db, "userchats", userCredential?.user?.uid), {
        chats: [],
      });

      console.log("account created successfully");
    } catch (error) {
      console.log(error.message);
      setFirebaseError(error.message);
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const removeFile = () => {
    setSelectedFile(null);
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
                    className="w-full p-[15px] border-b-2 bg-inherit mb-4 text-white outline-none placeholder-gray font-sans"
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
                  <div className="flex gap-4 w-full my-4">
                    <div>
                      <input
                        type="file"
                        id="fileInput"
                        className="absolute -top-10 left-0 opacity-0"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                      {selectedFile ? (
                        <div className="flex gap-2 items-center">
                          <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Selected Image"
                            className="w-12 h-12 rounded-full object-cover object-center"
                          />
                          <span className="text-white">
                            {selectedFile.name}
                          </span>
                          <img
                            src={Minus}
                            alt="remove"
                            className="w-4 h-4 cursor-pointer"
                            onClick={removeFile}
                          />
                        </div>
                      ) : (
                        <label
                          htmlFor="fileInput"
                          className="text-white cursor-pointer bg-transparent border p-1 rounded-lg"
                        >
                          Upload Image
                        </label>
                      )}
                    </div>
                  </div>
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
