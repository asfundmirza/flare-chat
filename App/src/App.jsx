import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useUserStore } from "../userStore.js";

import SignIn from "./components/sign-in/SignIn.jsx";
import SignUp from "./components/sign-up/SignUp.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user.uid);
      } else {
        fetchUserInfo(null); // If user is not authenticated, set currentUser to null
      }
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);
  console.log(currentUser);

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading indicator while fetching user info
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            currentUser ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={currentUser ? <Dashboard /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/sign-in"
          element={!currentUser ? <SignIn /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/sign-up"
          element={!currentUser ? <SignUp /> : <Navigate to="/dashboard" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
