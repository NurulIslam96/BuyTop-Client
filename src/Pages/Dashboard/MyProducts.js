import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider";

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
      .delete(`${process.env.REACT_APP_api_link}/myproducts/${id}`)
      .then(() => {
        toast.success("Deleted Successfully");
        refetch();
      });
  };

  const handleAdvertise = (id) => {
    fetch(`${process.env.REACT_APP_api_link}/advertise/${id}`, {
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
          refetch()
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
            refetch()
          }
        })
        .catch((err) => console.log(err));
  }

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
            <th>Product Name</th>
            <th>Price</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {myProducts &&
            myProducts.map((product) => (
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
                <td>{product.status}</td>
                <th className="flex flex-col">
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
                    <button className="btn btn-ghost text-slate-700 btn-xs my-1">
                      Paid
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDeleteItem(product._id)}
                      className="btn btn-error text-white btn-xs my-1"
                    >
                      Delete
                    </button>
                  )}
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
    </div>
  );
};

export default MyProducts;
