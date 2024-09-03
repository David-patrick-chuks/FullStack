import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="grid w-full h-[100dvh] place-content-center bg-gradient-to-tr from-blue-500 to-blue-700">
      <Outlet />
    
    </div>
  );
}
