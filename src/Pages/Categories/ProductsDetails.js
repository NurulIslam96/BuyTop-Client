import React from "react";
import { FaListAlt, FaDollarSign } from "react-icons/fa";

const ProductsDetails = ({ result }) => {
  console.log(result);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {result?.map((product) => (
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
                    <div class="absolute flex justify-center bottom-0 mb-3">
                      <div class="flex bg-white px-4 py-1 space-x-5 rounded-lg overflow-hidden shadow">
                        <p class="flex items-center font-medium text-gray-800">
                          <FaDollarSign class="w-5 h-5 fill-current mr-2" />
                          {product.price}
                        </p>
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
                <p
                  className="mt-2 text-sm text-gray-800 line-clamp-1"
                  title="New York, NY 10004, United States"
                >
                  {product.location}
                </p>
              </div>
              <p className="mt-2 text-gray-800">
                <FaListAlt />
                <span className="mt-2 xl:mt-0">
                  {product.description.slice(0, 120) + "..."}
                </span>
              </p>
              <div className="w-full flex justify-between gap-4 mt-4">
                <p className="inline-flex flex-col text-gray-800">
                  Purchase Year:
                  <span className="mt-2 xl:mt-0">{product?.purchaseYear}</span>
                </p>
                <p className="inline-flex flex-col text-gray-800">
                  Date of Posting
                  <span className="mt-2 xl:mt-0">{product?.postDate}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 mt-8">
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={product?.userPhoto}
                      className="rounded-full w-6 h-6 md:w-8 md:h-8 bg-gray-200"
                      alt=""
                    />
                  </div>
                  <p className="ml-2 text-gray-800 line-clamp-1">
                    {product?.userName}
                  </p>
                </div>

                <div className="flex justify-end">
                  <p className="inline-block font-semibold text-primary whitespace-nowrap leading-tight rounded-xl">
                    {product.status === "Available" || product.status === "Advertised" ? (
                      <label className="mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-blue-500 text-sm font-medium text-white select-none">
                        Book Now
                      </label>
                    ) : (
                        <span className="mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-gray-500 text-sm font-medium text-white select-none">
                        {product?.status}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsDetails;
