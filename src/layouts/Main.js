import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer";
import Navbar from "../Pages/Shared/Navbar";

const Main = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen overflow-x-hidden">
      <div>
        <Navbar></Navbar>
        <div className="container mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
