import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaListAlt, FaDollarSign, FaCheckCircle } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthProvider";
import useAdmin from "../../Hooks/useAdmin";
import useSeller from "../../Hooks/useSeller";
import BookModal from "./BookModal";

const ProductsDetails = ({ result, refetch }) => {
  const [bookDetails, setBookDetails] = useState(null);
  const { user } = useContext(AuthContext);
  const [isSeller] = useSeller(user?.email);
  const [isAdmin] = useAdmin(user?.email);

  const handleReportItem = (product) => {
    const reportedItem = {
      productId: product._id,
      productName: product.productName,
      resalePrice: product.resalePrice,
      productPhoto: product.productPhoto,
      userEmail: product.email,
    };
    fetch(`${process.env.REACT_APP_api_link}/reported/${product._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("buytop-token")}`,
      },
      body: JSON.stringify(reportedItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.upsertedCount > 0) {
          toast.success("Reported Successfully");
        } else {
          toast.error("Already Reported");
        }
      });
  };

  return (
    <div
      data-aos="zoom-in"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
    >
      {result?.map(
        (product) =>
          product?.status !== "Sold" && (
            <div
              key={product._id}
              product={product}
              className="relative mx-auto w-full"
            >
              <div className="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                <div className="shadow p-4 rounded-lg bg-white">
                  <div className="flex justify-center relative rounded-lg overflow-hidden h-52">
                    <div className="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                      <div className="flex justify-center">
                        <img
                          src={product.productPhoto}
                          className="md:w-56"
                          alt=""
                        />
                        <div className="absolute flex justify-center bottom-0 mb-3">
                          <div className="flex bg-white px-4 py-1 space-x-5 rounded-lg overflow-hidden shadow">
                            <h2 className="flex items-center font-medium text-gray-800">
                              <FaDollarSign className="w-5 h-5 fill-current mr-2" />
                              {product.resalePrice}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-red-500 text-sm font-medium text-white select-none">
                      {product?.status}
                    </span>
                  </div>
                  <div className="mt-4">
                    <h2
                      className="font-medium text-base md:text-lg text-gray-800 line-clamp-1"
                      title="New York"
                    >
                      {product.productName}
                    </h2>
                    <h2
                      className="mt-2 text-sm text-gray-800 line-clamp-1"
                      title="New York, NY 10004, United States"
                    >
                      {product.location}
                    </h2>
                  </div>
                  <h2 className="mt-2 text-gray-800">
                    <FaListAlt />
                    <span className="mt-2 xl:mt-0">
                      {product.description.slice(0, 110) + "..."} <a></a>
                    </span>
                  </h2>
                  <div className="w-full flex justify-between gap-4 mt-4">
                    <h2 className="inline-flex flex-col text-gray-800">
                      Purchase Year:
                      <span className="mt-2 xl:mt-0">
                        {product?.purchaseYear}
                      </span>
                    </h2>
                    <h2 className="inline-flex flex-col text-gray-800">
                      Date of Posting
                      <span className="mt-2 xl:mt-0">{product?.postDate}</span>
                    </h2>
                  </div>
                  <div className="w-full flex justify-between gap-4 mt-4">
                    <h2 className="inline-flex flex-col text-gray-800">
                      Original Price:
                      <span className="mt-2 xl:mt-0">
                        ${product?.originalPrice}
                      </span>
                    </h2>
                    <h2 className="inline-flex flex-col text-gray-800">
                      Phone Number
                      <span className="mt-2 xl:mt-0">
                        +{product?.phone.slice(0, 11)}
                      </span>
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 mt-8 items-center">
                    <div className="grid col-span-2">
                      <div className="flex items-center">
                        <div className="relative grid col-span-1">
                          <img
                            src={product?.userPhoto}
                            className="rounded-full w-6 h-6 md:w-8 md:h-8 bg-gray-200"
                            alt=""
                          />
                        </div>
                        <h2 className="ml-2 text-gray-800">
                          {product?.userName}
                        </h2>
                        {product?.isVerified && (
                          <FaCheckCircle
                            title="Verified User"
                            className="mx-1 text-blue-500"
                          />
                        )}
                      </div>
                    </div>
                    <div className="grid col-span-2">
                      <h2 className="inline-block w-full whitespace-nowrap leading-tight rounded-xl">
                        {!isSeller && !isAdmin ? (
                          <>
                            {product?.status === "Available" ? (
                              <div className="flex text-center w-full">
                                <label
                                  htmlFor="booking-modal"
                                  onClick={() => setBookDetails(product)}
                                  className="mt-3 w-1/2 py-2 rounded-lg z-10 bg-blue-500 text-sm font-medium text-white select-none"
                                >
                                  Book Now
                                </label>
                                <label
                                  onClick={() => handleReportItem(product)}
                                  className="mt-3 ml-3 w-1/2 py-2 rounded-lg z-10 bg-red-500 text-sm font-medium text-white select-none"
                                >
                                  Report Now
                                </label>
                              </div>
                            ) : (
                              <div className="flex flex-col text-center items-center justify-center">
                                <label className="mt-3 w-full py-2 rounded-lg z-10 bg-green-500 text-sm font-medium text-white select-none">
                                  {product?.status}
                                </label>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex flex-col text-center items-center justify-center">
                            <label className="mt-3 w-full py-2 rounded-lg z-10 bg-slate-500 text-sm font-medium text-white select-none">
                              Only for Buyers
                            </label>
                          </div>
                        )}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
      )}
      {bookDetails && (
        <BookModal
          bookDetails={bookDetails}
          setBookDetails={setBookDetails}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default ProductsDetails;
