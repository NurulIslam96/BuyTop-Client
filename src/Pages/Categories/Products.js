import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import ProductsDetails from "./ProductsDetails";

const Products = () => {
  const params = useParams();

  const {
    data: { result, category } = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_api_link}/category/${params.id}`
      );
      const data = await res.json();
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [params]);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div>
      <div className="md:px-0 px-4">
        <div className="lg:max-w-[1440px] md:max-w-[744px] max-w-[375px] mx-auto relative md:px-0 px-4 py-7">
          <div className="lg:max-w-[1280px] md:max-w-[696px] max-w-[343px] mx-auto bg-gray-200 rounded-md">
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
                <img
                  src={category.banner}
                  className="w-full h-full rounded-r-md"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductsDetails result={result} refetch={refetch}></ProductsDetails>
    </div>
  );
};

export default Products;
