import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { FaUser } from "react-icons/fa";
import SiteLogo from "../../assets/site-logo/site-logo.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [openBar, setOpenBar] = React.useState(false);
  const [profileBar, setProfileBar] = React.useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_api_link}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const activeLink = ({ isActive }) => {
    return {
      boxShadow: isActive ? "inset 0 2px orange" : "",
    };
  };
  const handleSignOut = () => {
    logOut();
    setProfileBar(false);
  };

  return (
    <div className="shadow-md bg-slate-800 text-white">
      <div className="px-4 py-5 container mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <label
            htmlFor="dashboard-drawer"
            tabIndex={3}
            className="btn btn-ghost lg:hidden px-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <NavLink
            to="/"
            aria-label="BuyTop"
            title="BuyTop"
            className="inline-flex items-center"
          >
            <img src={SiteLogo} alt="siteLogo" width={"40px"} />
            <div className="flex flex-col ml-2 transition-colors duration-200">
              <p className="text-3xl text-slate-300 font-semibold">
                Buy<span className="text-yellow-500">Top</span>
              </p>
            </div>
          </NavLink>
          <ul className="hidden items-center space-x-8 lg:flex">
            <li>
              <div className="dropdown dropdown-hover font-medium">
                <label
                  tabIndex={0}
                  className=" m-1 transition-colors duration-300 hover:text-yellow-500"
                >
                  Categories
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-slate-700 rounded-box w-52"
                >
                  {categories &&
                    categories.map((category) => (
                      <li
                        key={category._id}
                        category={category}
                        className="transition-colors duration-300 hover:text-yellow-500"
                      >
                        <Link
                          to={`/category/${category._id}`}
                          className="hover:text-yellow-500 text-slate-200"
                        >
                          {category.Category}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </li>
            <li>
              <NavLink
                style={activeLink}
                to="/blogs"
                aria-label="blogs"
                title="blogs"
                className="font-medium transition-colors duration-300 hover:text-yellow-500"
              >
                Blogs
              </NavLink>
            </li>
            {user?.uid ? (
              <>
                <li>
                  <NavLink
                    style={activeLink}
                    to="/dashboard"
                    className="font-medium transition-colors duration-300 hover:text-yellow-500"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <span className="font-semibold">{user?.displayName}</span>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    style={activeLink}
                    to="/login"
                    aria-label="login"
                    title="login"
                    className="font-medium hover:text-yellow-500 transition-colors duration-300"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    style={activeLink}
                    to="/signup"
                    aria-label="signup"
                    title="signup"
                    className="font-medium hover:text-yellow-500 transition-colors duration-300"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
            {user?.uid ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user?.photoURL} alt="" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52 bg-slate-700"
                >
                  <li>
                    <Link to={'/profile'} className="justify-between hover:text-yellow-500">
                      Your Profile Info
                    </Link>
                  </li>
                  <li>
                    <span className="hover:text-yellow-500">Settings</span>
                  </li>
                  <li>
                    <span
                      className="hover:text-yellow-500"
                      onClick={handleSignOut}
                    >
                      Logout
                    </span>
                  </li>
                </ul>
              </div>
            ) : (
              <FaUser></FaUser>
            )}
          </ul>
          {profileBar && (
            <div className="absolute z-50 mx-0 right-0 w-1/6 lg:block hidden p-2 bg-slate-700  rounded shadow top-0 mt-12">
              <ul className="">
                <li className="cursor-pointer text-slate-200 font-semibold text-md leading-3 tracking-normal py-2 hover:text-yellow-500 focus:text-indigo-700 focus:outline-none">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-user"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <circle cx={12} cy={7} r={4} />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                    <span className="ml-2">My Profile</span>
                  </div>
                </li>
                <li className="cursor-pointer text-slate-200 font-semibold text-md leading-3 tracking-normal mt-2 py-2 hover:text-yellow-500 focus:text-indigo-700 focus:outline-none flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-help"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx={12} cy={12} r={9} />
                    <line x1={12} y1={17} x2={12} y2="17.01" />
                    <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
                  </svg>
                  <span className="ml-2">Help Center</span>
                </li>
                <li className="cursor-pointer text-slate-200 font-semibold text-md leading-3 tracking-normal mt-2 py-2 hover:text-yellow-500 flex items-center focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-settings"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <circle cx={12} cy={12} r={3} />
                  </svg>
                  <button onClick={handleSignOut} className="ml-2">
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-300 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-blue-200"
              onClick={() => setOpenBar(true)}
            >
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {openBar && (
              <div
                data-aos="fade-down"
                className="absolute top-0 left-0 w-full z-50"
              >
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <NavLink to="/" className="inline-flex items-center">
                        <span className="ml-2 text-xl font-bold tracking-wide text-blue-900 uppercase">
                          BuyTop
                        </span>
                      </NavLink>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-300 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setOpenBar(false)}
                      >
                        <svg className="w-5 text-red-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <li>
                        <NavLink
                          to="/dashboard"
                          aria-label="Categories"
                          title="Categories"
                          className="font-medium tracking-wide text-blue-900 transition-colors duration-300 hover:text-yellow-500"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/blogs"
                          aria-label="blogs"
                          title="blogs"
                          className="font-medium tracking-wide text-blue-900 transition-colors duration-300 hover:text-yellow-500"
                        >
                          Blogs
                        </NavLink>
                      </li>
                      {user?.uid ? (
                        <li>
                          <NavLink
                            aria-label="signout"
                            title="signout"
                            className="font-medium tracking-wide text-blue-900 transition-colors duration-300 hover:text-yellow-500"
                            onClick={handleSignOut}
                          >
                            Sign Out
                          </NavLink>
                        </li>
                      ) : (
                        <>
                          <li>
                            <NavLink
                              aria-label="login"
                              title="login"
                              className="font-medium tracking-wide text-blue-900 transition-colors duration-300 hover:text-yellow-500"
                              to={"/login"}
                            >
                              Log In
                            </NavLink>
                          </li>
                        </>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
