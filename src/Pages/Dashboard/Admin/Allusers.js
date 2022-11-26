import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner";

const Allusers = () => {
  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allusers"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_api_link}/allusers`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("buytop-token")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });
  console.log(allUsers);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

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
  return (
    <div className="overflow-x-auto w-full mt-5 px-2">
      <table className="table w-full">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>User Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map(
            (user) =>
              user?.role !== "Admin" && (
                <tr key={user._id} user={user}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <img
                        src={user?.photo}
                        alt="User"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-50">
                          {user.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user?.email}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {user.verified ? "Verified" : "Not Verified"}
                    </span>
                  </td>
                  <td>{user.role}</td>
                  <th className="flex flex-col">
                    {
                      user?.verified ? <button
                      className="btn btn-info text-white btn-xs my-1"
                    >
                      Verified
                    </button>
                    :
                    <>
                    <button
                      onClick={() => handleVerifyUser(user?.email)}
                      className="btn btn-primary text-white btn-xs my-1"
                    >
                      Verify
                    </button>
                    </>
                    }
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn btn-error text-white btn-xs my-1"
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              )
          )}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Status</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Allusers;
