import React, { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import useSeller from "../Hooks/useSeller";
import WelcomePage from "../Pages/Dashboard/WelcomePage/WelcomePage";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);

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
        <div className="drawer-side h-[200px] text-xl font-semibold my-5 rounded-md">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-gray-800 bg-gray-100">
            {!isSeller && !isAdmin && (
              <>
                <li>
                  <NavLink to={"/dashboard/myorders"}>My Orders</NavLink>
                </li>
              </>
            )}
            {isSeller && (
              <>
                <li className="rounded-md">
                  <Link to={"/dashboard/addproduct"}>Add a Product</Link>
                </li>
                <li className="rounded-md">
                  <Link to={"/dashboard/myproducts"}>My Products</Link>
                </li>
              </>
            )}
            {isAdmin && (
              <>
                <li>
                  <Link to={"/dashboard/allsellers"}>All Sellers</Link>
                </li>
                <li>
                  <Link to={"/dashboard/allbuyers"}>All Buyers</Link>
                </li>
                <li>
                  <Link to={"/dashboard/reporteditems"}>Reported Items</Link>
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
