import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Spinner from "../components/Spinner";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import useSeller from "../Hooks/useSeller";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const [isSeller,isSellerLoading] = useSeller(user?.email);

  if(isAdminLoading || isSellerLoading){
    return <Spinner></Spinner>
  }

  return (
    <div className="container mx-auto flex">
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80">
            {isSeller && (
              <>
                <li>
                  <Link to={"/dashboard/addproduct"}>Add a Product</Link>
                </li>
                <li>
                  <Link to={"/dashboard/myproducts"}>My Products</Link>
                </li>
              </>
            )}
            {isAdmin && (
              <>
                <li>
                  <Link to={"/dashboard/users"}>All Users</Link>
                </li>
                <li>
                  <Link to={"/dashboard/adddoctor"}>Add a Doctor</Link>
                </li>
                <li>
                  <Link to={"/dashboard/managedoctors"}>Manage Doctors</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
