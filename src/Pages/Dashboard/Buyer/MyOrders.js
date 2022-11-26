import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const {
    data: myOrders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myorders"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_api_link}/myorders/${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("buytop-token")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });
  console.log(myOrders);
  if (isLoading) {
    return <Spinner></Spinner>;
  }

  const handleCancelBooking = (id) => {
    fetch(`${process.env.REACT_APP_api_link}/myorders/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("buytop-token")}`,
      },
      body: JSON.stringify({ status: "Available" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Cancelled Booking");
          refetch();
        }
      });
  };

  return (
    <div className="overflow-x-auto w-full px-2">
      <div className="py-6 px-4 md:px-6 2xl:px-0 2xl:mx-auto 2xl:container flex justify-center items-center">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col justify-start items-start">
            <p className="text-sm leading-none text-gray-600">home - My Orders</p>
            <div className="mt-2 flex flex-row justify-end items-center space-x-3">
              <p className="text-2xl font-semibold leading-normal text-gray-800 ">
                My Orders
              </p>
              <p className="text-base leading-4 text-gray-600 mt-2">
                ({myOrders?.length} items)
              </p>
            </div>
          </div>
        </div>
      </div>
      {myOrders?.length > 0 ? (
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {myOrders?.map((product) => (
              <tr key={product._id} product={product}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="">
                      <div className="w-12 h-12">
                        <img
                          src={product?.productPhoto}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product.productName}</div>
                      <div className="text-sm opacity-50">
                        {product.location}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  ${product.price}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {product.category}
                  </span>
                </td>
                <td>Booked</td>
                <th className="flex flex-col">
                  <button className="btn btn-primary text-white btn-xs my-1">
                    Advertise
                  </button>
                  <button
                    onClick={() => handleCancelBooking(product.productId)}
                    className="btn btn-error text-white btn-xs my-1"
                  >
                    Cancel Order
                  </button>
                </th>
              </tr>
            ))}
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
      ) : (
        <>
          <div className="p-6 py-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md text-white">
            <div className="container mx-auto">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="space-x-2 text-center py-2 lg:py-0">
                  <span>You Have 0 Items in your Inventory:</span>
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
  );
};

export default MyOrders;
