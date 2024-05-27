import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import SignIn from "./components/sign-in/SignIn.jsx";
import SignUp from "./components/sign-up/SignUp.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";

const user = false; // This will be updated by your own logic

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  return user ? element : <Navigate to="/sign-in" />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route
          index
          element={<Navigate to={user ? "/dashboard" : "/sign-in"} />}
        />
        <Route
          path="/sign-in"
          element={user ? <Navigate to="/dashboard" /> : <SignIn />}
        />
        <Route
          path="/sign-up"
          element={user ? <Navigate to="/dashboard" /> : <SignUp />}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
