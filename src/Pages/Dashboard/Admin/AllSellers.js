import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner";

const AllSellers = () => {
  const {
    data: allSellers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allsellers"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_api_link}/allsellers`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("buytop-token")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const handleVerifyUser = (email) => {
    const load = window.confirm(`Do You Want To Verify this ${email}`);
    if (load) {
      fetch(`${process.env.REACT_APP_api_link}/verifyuser/${email}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("buytop-token")}`,
        },
        body: JSON.stringify({ verified: true }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          refetch();
        });
    }
  };

  const handleDeleteUser = (id) => {
    const load = window.confirm("Do you want to delete this user");
    if (load) {
      axios
        .delete(`${process.env.REACT_APP_api_link}/allusers/${id}`, {
          headers: {
            authorization: `bearer ${localStorage.getItem("buytop-token")}`,
          },
        })
        .then(() => {
          toast.success("Delete Successfully");
          refetch();
        });
    }
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      <div className="overflow-x-auto w-full mt-5 px-2">
      <div className="py-6 px-4 md:px-6 2xl:px-0 2xl:mx-auto 2xl:container flex justify-center items-center">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col justify-start items-start">
            <p className="text-sm leading-none text-gray-600">home - All Sellers</p>
            <div className="mt-2 flex flex-row justify-end items-center space-x-3">
              <p className="text-2xl font-semibold leading-normal text-gray-800 ">
                All Sellers
              </p>
              <p className="text-base leading-4 text-gray-600 mt-2">
                ({allSellers?.length} users)
              </p>
            </div>
          </div>
        </div>
      </div>
        {allSellers?.length > 0 ? (
          <table className="table w-full">
            <thead>
              <tr className="text-center">
                <th className="bg-slate-800 text-white">No,</th>
                <th className="bg-slate-800 text-white">User Name</th>
                <th className="bg-slate-800 text-white">Email</th>
                <th className="bg-slate-800 text-white">Role</th>
                <th className="bg-slate-800 text-white">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {allSellers?.map((user,i) => (
                <tr key={user._id} user={user}>
                  <th className="bg-stone-200">
                    <label>
                      {i+1}
                    </label>
                  </th>
                  <td className="bg-stone-200">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user?.photo}
                        alt="User"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-bold">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="bg-stone-200">
                    {user?.email}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {user.verified ? "Verified" : "Not Verified"}
                    </span>
                  </td>
                  <td className="bg-stone-200">{user.role}</td>
                  <th className="flex flex-col bg-stone-200">
                    {user?.verified ? (
                      <button className="btn btn-info text-white btn-xs my-1">
                        Verified
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleVerifyUser(user?.email)}
                          className="btn btn-primary text-white btn-xs my-1"
                        >
                          Verify
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn btn-error text-white btn-xs my-1"
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="text-center">
                <th className="bg-slate-800 text-white">No.</th>
                <th className="bg-slate-800 text-white">Product Name</th>
                <th className="bg-slate-800 text-white">Price</th>
                <th className="bg-slate-800 text-white">Status</th>
                <th className="bg-slate-800 text-white">Action</th>
              </tr>
            </tfoot>
          </table>
        ) : (
          <>
          <div className="p-6 py-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md text-white">
            <div className="container mx-auto">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="space-x-2 text-center py-2 lg:py-0">
                  <span>No Users Register</span>
                  <span className="font-bold text-lg">Go back to Home</span>
                </div>
                <Link
                  to={'/'}
                  className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block dark:bg-gray-50 dark:text-gray-900 dark:border-gray-400"
                >
                  HomePage
                </Link>
              </div>
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllSellers;
