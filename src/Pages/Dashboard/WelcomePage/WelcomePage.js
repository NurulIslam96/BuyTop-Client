import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import useAdmin from "../../../Hooks/useAdmin";
import useSeller from "../../../Hooks/useSeller";

const WelcomePage = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl text-gray-600 leading-relaxed text-center w-4/5">
        {
            !isAdmin && !isSeller &&
            <p>{`Welcome Back ${user?.displayName}`}<br/>Your Orders are waiting for you to pay</p>
        }
        {
            isSeller &&
            <p>{`Welcome Back ${user?.displayName}`}<br/>Sell your products securely in the best Site in town</p>
        }
        {
            isAdmin && 
            <p>Welcome Back Admin<br/>Select from options to see new users</p>
        }
      </h1>
      <div className="flex items-center gap-4">
        <div className="rounded-full w-12 h-12 bg-black overflow-hidden">
          <img src={user?.photoURL} alt=""/>
        </div>
        <div className="flex flex-col tracking-wider">
          <label className="text-gray-600 font-bold text-base">
            {user?.displayName}
          </label>
          <label className="text-gray-400 font-normal text-sm">
            {user?.email}
          </label>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
