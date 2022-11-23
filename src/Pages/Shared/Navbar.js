import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { FaChevronCircleDown, FaUser } from "react-icons/fa";
import SiteLogo from "../../assets/site-logo/site-logo.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [openBar, setOpenBar] = React.useState(false);
  const [profileBar, setProfileBar] = React.useState(false);

  const activeLink = ({ isActive }) => {
    return {
      boxShadow: isActive ? "inset 0 2px #1865f2" : "",
    };
  };
  const handleSignOut = () => {
    logOut();
    setProfileBar(false);
  };

  return (
    <div className="shadow-md bg-neutral-800">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <NavLink
            to="/"
            aria-label="BuyTop"
            title="BuyTop"
            className="inline-flex items-center"
          >
            <img src={SiteLogo} alt="siteLogo" width={"40px"} />
            <div className="flex flex-col ml-2 transition-colors duration-200">
              <p className="text-3xl text-slate-700 font-semibold">
                Buy<span className="text-blue-500">Top</span>
              </p>
            </div>
          </NavLink>
          <ul className="hidden items-center space-x-8 lg:flex">
            <li>
              <div className="dropdown dropdown-hover font-medium">
                <label
                  tabIndex={0}
                  className=" m-1 transition-colors duration-300 hover:text-blue-600"
                >
                  Categories
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li className="transition-colors duration-300 hover:text-blue-600">
                    <Link>Item 1</Link>
                  </li>
                  <li>
                    <Link>Item 2</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <NavLink
                style={activeLink}
                to="/blogs"
                aria-label="blogs"
                title="blogs"
                className="font-medium transition-colors duration-300 hover:text-blue-600"
              >
                Blogs
              </NavLink>
            </li>
            {user?.uid ? (
              <>
                <li>
                  <NavLink
                    style={activeLink}
                    to="/addservice"
                    aria-label="Add Service"
                    title="Add Service"
                    className="font-medium transition-colors duration-300 hover:text-blue-600"
                  >
                    Add Service
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    style={activeLink}
                    to="/myreviews"
                    aria-label="myreviews"
                    title="myreviews"
                    className="font-medium transition-colors duration-300 hover:text-blue-600"
                  >
                    My Reviews
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
                    className="font-medium hover:text-blue-600 transition-colors duration-300"
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
                    className="font-medium hover:text-blue-600 transition-colors duration-300"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
            {user?.uid ? (
              <li>
                <NavLink
                  style={activeLink}
                  title={user?.displayName}
                  className="rounded-full"
                  onClick={() => setProfileBar(true)}
                >
                  {user?.photoURL ? (
                    <div className="flex items-center gap-2">
                      <div className="relative flex-shrink-0">
                        <img
                          alt=""
                          className="w-10 h-10 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-violet-400 ring-offset-gray-800"
                          src={user?.photoURL}
                        />
                      </div>
                      <FaChevronCircleDown className="hover:text-blue-700"></FaChevronCircleDown>
                    </div>
                  ) : (
                    <FaUser></FaUser>
                  )}
                </NavLink>
              </li>
            ) : (
              <FaUser></FaUser>
            )}
          </ul>
          {profileBar && (
            <div
              data-aos="fade-down"
              className="absolute top-11 z-50 mx-0 right-0 w-1/6 lg:block hidden"
            >
              <div className="p-5 bg-white border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <NavLink
                      to="/myprofile"
                      className="inline-flex items-center"
                    >
                      <span className="text-md font-bold tracking-wide text-blue-900 uppercase">
                        {user?.displayName}
                      </span>
                    </NavLink>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-300 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setProfileBar(false)}
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
                        to="/myprofile"
                        aria-label="profile"
                        title="profile"
                        className="font-medium tracking-wide text-blue-900 transition-colors duration-300 hover:text-blue-600"
                      >
                        Your Profile Info
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        aria-label="signout"
                        title="signout"
                        className="font-medium tracking-wide text-blue-900 transition-colors duration-300 hover:text-blue-600"
                        onClick={handleSignOut}
                      >
                        <p>Sign Out</p>
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
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
                          to="/categories"
                          aria-label="Categories"
                          title="Categories"
                          className="font-medium tracking-wide text-blue-900 transition-colors duration-300 hover:text-blue-600"
                        >
                          Categories
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/blogs"
                          aria-label="blogs"
                          title="blogs"
                          className="font-medium tracking-wide text-blue-900 transition-colors duration-300 hover:text-blue-600"
                        >
                          Blogs
                        </NavLink>
                      </li>
                      {user?.uid ? (
                        <li>
                          <NavLink
                            aria-label="signout"
                            title="signout"
                            className="font-medium tracking-wide text-blue-900 transition-colors duration-300 hover:text-blue-600"
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
                              className="font-medium tracking-wide text-blue-900 transition-colors duration-300 hover:text-blue-600"
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
