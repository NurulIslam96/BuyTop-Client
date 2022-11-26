import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
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
    axios.delete(`${process.env.REACT_APP_api_link}/itemdelete/${product.productId}`,{
        headers:{
            authorization:`bearer ${localStorage.getItem("buytop-token")}`
        }
    })
    .then(()=>{
        axios.delete(`${process.env.REACT_APP_api_link}/reportdelete/${product._id}`,{
            headers:{
                authorization:`bearer ${localStorage.getItem("buytop-token")}`
            }  
        })
        .then(()=>{
            toast.success("Deleted Item Successfully")
            refetch()
        })
    })
  };

  return (
    <div>
      <p className="text-base leading-4 text-gray-600 mt-2">
        ({reportedItems?.length} items)
      </p>
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reportedItems &&
              reportedItems.map((product) => (
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
                      </div>
                    </div>
                  </td>
                  <td>
                    ${product?.resalePrice}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {product?.userEmail}
                    </span>
                  </td>
                  <td>Reported</td>
                  <th>
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
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ReportedItems;
