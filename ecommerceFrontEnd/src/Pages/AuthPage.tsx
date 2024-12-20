import { Outlet } from "react-router-dom";
import AuthImg from "../Components/AuthComponents/AuthImg";

function AuthPage() {
  return (
    <div className="flex flex-row w-full h-screen">
      <AuthImg />

      <div className="flex-1 flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthPage;
