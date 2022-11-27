import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const { data: myProducts = [], refetch } = useQuery({
    queryKey: ["myproducts"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_api_link}/myproducts/${user?.email}`,
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

  const handleDeleteItem = (id) => {
    axios
      .delete(`${process.env.REACT_APP_api_link}/myproducts/${id}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("buytop-token")}`,
        },
      })
      .then(() => {
        toast.success("Deleted Successfully");
        refetch();
      });
  };

  const handleAdvertise = (id) => {
    fetch(`${process.env.REACT_APP_api_link}/addAdv/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("buytop-token")}`,
      },
      body: JSON.stringify({ status: "Advertised" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Successfully Advertised");
          refetch();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleRemoveAdvertise = (id) => {
    fetch(`${process.env.REACT_APP_api_link}/rmvadvertise/${id}`, {
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
          toast.success("Removed Advertisement");
          refetch();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="overflow-x-auto w-full mt-5 px-2">
      <div className="py-6 px-4 md:px-6 2xl:px-0 2xl:mx-auto 2xl:container flex justify-center items-center">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col justify-start items-start">
            <p className="text-sm leading-none text-gray-600">
              home - My Products
            </p>
            <div className="mt-2 flex flex-row justify-end items-center space-x-3">
              <p className="text-2xl font-semibold leading-normal text-gray-800 ">
                My Products
              </p>
              <p className="text-base leading-4 text-gray-600 mt-2">
                ({myProducts?.length} items)
              </p>
            </div>
          </div>
        </div>
      </div>
      {myProducts?.length > 0 ? (
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th className="bg-slate-800 text-white">No.</th>
              <th className="bg-slate-800 text-white">Product Name</th>
              <th className="bg-slate-800 text-white">Price</th>
              <th className="bg-slate-800 text-white">Status</th>
              <th className="bg-slate-800 text-white">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {myProducts &&
              myProducts.map((product,index) => (
                <tr key={product._id} product={product}>
                  <th className="bg-stone-200">
                    <label>
                      {index+1}
                    </label>
                  </th>
                  <td className="bg-stone-200">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="w-12 h-12">
                          <img
                            src={product?.productPhoto}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{product.productName}</div>
                        <div className="text-sm opacity-50 text-start">
                          {product.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="bg-stone-200">
                    ${product.resalePrice}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {product.category}
                    </span>
                  </td>
                  <td className="bg-stone-200">{product.status}</td>
                  <th className=" bg-stone-200">
                    <div className="flex flex-col">
                    {product?.status === "Available" && (
                      <button
                        onClick={() => handleAdvertise(product._id)}
                        className="btn btn-primary text-white btn-xs my-1"
                      >
                        Advertise
                      </button>
                    )}
                    {product?.status === "Advertised" && (
                      <button
                        onClick={() => handleRemoveAdvertise(product._id)}
                        className="btn btn-warning text-dark btn-xs my-1"
                      >
                        Remove Ad
                      </button>
                    )}
                    {product?.status === "Booked" && (
                      <button className="btn btn-primary text-white btn-xs my-1">
                        Booked
                      </button>
                    )}
                    {product?.status === "Paid" ? (
                      <button className="btn btn-success text-white btn-xs my-1">
                        Sold
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDeleteItem(product._id)}
                        className="btn btn-error text-white btn-xs my-1"
                      >
                        Delete
                      </button>
                    )}
                    </div>
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
                  <span>You Haven't Added Any Products</span>
                  <span className="font-bold text-lg">Go to Add product</span>
                </div>
                <Link
                  to={"/dashboard/addproduct"}
                  className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block dark:bg-gray-50 dark:text-gray-900 dark:border-gray-400"
                >
                  Add Product
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyProducts;
