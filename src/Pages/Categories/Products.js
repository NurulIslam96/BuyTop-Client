import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductsDetails from "./ProductsDetails";

const Products = () => {
  const { result, category } = useLoaderData();

  return (
    <div>
      <div className="md:px-0 px-4">
        <div className="lg:max-w-[1440px] md:max-w-[744px] max-w-[375px] mx-auto relative lg:px-10 md:px-6 px-4 py-7">
          <div className="lg:max-w-[1280px] md:max-w-[696px] max-w-[343px] mx-auto bg-gray-200  rounded-md">
            <div className="lg:flex md:flex block justify-between items-center">
              <div className="md:p-10 p-4">
                <p className="text-base leading-none text-gray-800">
                  Best {category.Category}
                </p>
                <p className="text-3xl font-semibold leading-9 text-gray-800 py-4">
                  BuyTop
                </p>
                <p className="text-base leading-normal text-gray-600">
                  Place for best second hand items
                </p>
              </div>
              <div>
                <img src={category.banner} className="w-full h-full" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductsDetails result={result}></ProductsDetails>
    </div>
  );
};

export default Products;
