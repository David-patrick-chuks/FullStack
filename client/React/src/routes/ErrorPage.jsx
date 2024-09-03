import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  const sendBack = () => {
    navigate("/login");
  };
  return (
    <div className=" w-full h-[100dvh] grid place-content-center bg-blue-100">
      <h1 className="bg-black text-center p-4 text-lg text-red-100 w-full ">
        404{" "}
      </h1>
      <p>Page not found</p>
      <p onClick={sendBack} className="underline text-red-500 mt-5">Go to Homepage </p>
    </div>
  );
}
