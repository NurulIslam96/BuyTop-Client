import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import { AuthContext } from "../contexts/AuthProvider";
import useBuyer from "../Hooks/useBuyer";

const BuyerRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
  const location = useLocation();
  if (isBuyerLoading) {
    return <Spinner></Spinner>;
  }
  if (user && isBuyer) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default BuyerRoute;
