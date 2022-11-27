import React from "react";
import { Outlet } from "react-router-dom";
import DashboardMenu from "./DashboardMenu";

const DashboardLayout = () => {
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
        <div className="drawer-side lg:h-96 font-semibold lg:my-5 my-0 lg:rounded-md">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <DashboardMenu></DashboardMenu>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
