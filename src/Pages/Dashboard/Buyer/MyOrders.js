import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import Spinner from "../../../components/Spinner";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyOrders = () => {
    const {user} = useContext(AuthContext)
    const {data: myOrders = [], isLoading} = useQuery({
        queryKey: ["myorders"],
        queryFn: async()=>{
            const res = await fetch(`${process.env.REACT_APP_api_link}/myorders/${user?.email}`)
            const data = await res.json();
            return data;
        }
    })
    if(isLoading){
        return <Spinner></Spinner>
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
          {myOrders &&
            myOrders.map((product) => (
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
                  {/* {product?.status === "Available" && (
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
                  )} */}
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

export default MyOrders;
