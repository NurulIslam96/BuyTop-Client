import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error)
  return (
    <div className="bg-blue-100 relative overflow-hidden">
      <div className="min-w-screen container mx-auto min-h-screen flex items-center p-5 lg:p-20 overflow-hidden relative">
        <div className="container mx-auto flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
          <div className="w-full md:w-1/2">
            <div className="mb-10 md:mb-20 text-gray-600 font-light">
              <h1 className="font-black uppercase text-3xl lg:text-5xl text-yellow-500 mb-10">
                You seem to be lost!
              </h1>
              <p>The page you're looking for isn't available.</p>
              <p>Try searching again or use the Go Back button below.</p>
              <p className="text-yellow-500 text-2xl font-semibold">Error Message: {error.statusText}</p>
              <p className="text-yellow-500 text-2xl font-semibold">Error Code: {error.status}</p>
            </div>
            <div className="mb-20 md:mb-0">
              <Link to={'/'} className="text-xl font-semibold outline-none focus:outline-none transform transition-all hover:scale-150 text-yellow-500 hover:text-yellow-600">
                <i className="mdi mdi-arrow-left mr-2"></i>Go Back
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-end text-center">
            <img
              src="https://i.ibb.co/GW4RTKR/4660894-2456051.jpg"
              className="h-96"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform"></div>
      <div className="w-96 h-full bg-yellow-200 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform"></div>
    </div>
  );
};

export default ErrorPage;
