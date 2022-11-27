import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" bg-gray-900">
      <div className="max-w-2xl mx-auto text-white py-10">
        <div className="text-center">
          <h3 className="text-3xl mb-3"> Download our BuyTop app</h3>
          <p>Best Products in your hands</p>
          <div className="flex justify-center my-10">
            <div className="flex items-center border rounded-lg w-52 px-4 py-2 mx-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                className="w-7 md:w-8"
                alt=""
              />
              <div className="text-left ml-3">
                <p className="text-xs text-gray-200">Download on </p>
                <p className="text-sm md:text-base"> Google Store </p>
              </div>
            </div>
            <div className="flex items-center border  rounded-lg px-4 py-2 w-52 mx-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                className="w-7 md:w-8"
                alt=""
              />
              <div className="text-left ml-3">
                <p className="text-xs text-gray-200">Download on </p>
                <p className="text-sm md:text-base"> Apple Store </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
          <Link to={'/'} className="order-2 md:order-1 mt-8 md:mt-0">
            {" "}
            &copy; BuyTop, 2022.{" "}
          </Link>
          <div className="order-1 md:order-2">
            <Link to={'/blogs'} className="px-2">About us</Link>
            <Link to={'/blogs'} className="px-2 border-l">Contact us</Link>
            <Link to={'/blogs'} className="px-2 border-l">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
