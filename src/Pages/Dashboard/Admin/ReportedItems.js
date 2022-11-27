import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner";

const ReportedItems = () => {
  const {
    data: reportedItems = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reporteditems"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_api_link}/reporteditems`,
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
  if (isLoading) {
    return <Spinner></Spinner>;
  }

  const handleDeleteItem = (product) => {
    axios
      .delete(
        `${process.env.REACT_APP_api_link}/itemdelete/${product.productId}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("buytop-token")}`,
          },
        }
      )
      .then(() => {
        axios
          .delete(
            `${process.env.REACT_APP_api_link}/reportdelete/${product._id}`,
            {
              headers: {
                authorization: `bearer ${localStorage.getItem("buytop-token")}`,
              },
            }
          )
          .then(() => {
            toast.success("Deleted Item Successfully");
            refetch();
          });
      });
  };

  return (
    <div>
      <div className="overflow-x-auto w-full mt-5 px-2">
        <div className="py-6 px-4 md:px-6 2xl:px-0 2xl:mx-auto 2xl:container flex justify-center items-center">
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col justify-start items-start">
              <p className="text-sm leading-none text-gray-600">
                home - Reported Items
              </p>
              <div className="mt-2 flex flex-row justify-end items-center space-x-3">
                <p className="text-2xl font-semibold leading-normal text-gray-800 ">
                  Reported Items
                </p>
                <p className="text-base leading-4 text-gray-600 mt-2">
                  ({reportedItems?.length} items)
                </p>
              </div>
            </div>
          </div>
        </div>
        {reportedItems?.length > 0 ? (
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
              {reportedItems &&
                reportedItems.map((product,i) => (
                  <tr key={product._id} product={product}>
                    <th className="bg-stone-200">
                      <label>
                        {i+1}
                      </label>
                    </th>
                    <td className="bg-stone-200">
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
                        </div>
                      </div>
                    </td>
                    <td  className="bg-stone-200">
                      ${product?.resalePrice}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {product?.userEmail}
                      </span>
                    </td>
                    <td className="bg-stone-200">Reported</td>
                    <th className="bg-stone-200">
                      <button
                        onClick={() => handleDeleteItem(product)}
                        className="btn btn-error text-white btn-xs my-1"
                      >
                        Delete Item
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
            <div className="p-6 py-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md text-white">
              <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                  <div className="space-x-2 text-center py-2 lg:py-0">
                    <span>No item has been reported</span>
                    <span className="font-bold text-lg">Check Users</span>
                  </div>
                  <Link
                    to={"/dashboard/allsellers"}
                    className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block dark:bg-gray-50 dark:text-gray-900 dark:border-gray-400"
                  >
                    All Sellers
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

export default ReportedItems;
