import { createBrowserRouter } from "react-router-dom";
import { Signup } from "../pages/Signup";
import SignIn from "../pages/SignIn";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/Profile";
import ErrorPage from "./ErrorPage";
import Layout from "./Layout";

export const routes = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/profile",
        element: <ProtectedRoute element={<Profile />} />,
      },
    ],
  },
]);
