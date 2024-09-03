import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element }) {
  
    const user = JSON.parse(localStorage.getItem("userCredentials"));
    return user ? element : <Navigate to={"/login"} />;
  };