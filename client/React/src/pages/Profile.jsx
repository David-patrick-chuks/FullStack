import { useNavigate } from "react-router-dom";
import Loader from "../components/preloader/Loader";
import { useState } from "react";

export default function Profile() {
  const Navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userCredentials"));
  if (!userData) {
    return <Loader />;
  }
  const handleSignOut = () => {
    setloading(true);
    setTimeout(() => {
      Navigate("/login");
      localStorage.removeItem("userCredentials");
    }, 2000);
  };
  return (
    <>
      {loading && (
        <div className="absolute top-0 w-full h-full z-50">
          <Loader />
        </div>
      )}
      <div className={`w-full  ${loading && "opacity-15"}`}>
        <div className="shadow w-full rounded-sm capitalize font-bold text-xl p-5 bg-green-100 text-green-500 text-center">
          <h1>welcome, {userData.name}</h1>
          <p>email: {userData.email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="bg-red-100 text-red-500 font-semibold px-3 py-2 mt-2 rounded-md"
        >
          Sign Out
        </button>
      </div>
    </>
  );
}
