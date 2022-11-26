import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import ProductBanner from "./ProductBanner";
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
      <ProductBanner category={category}></ProductBanner>
      <ProductsDetails result={result} refetch={refetch}></ProductsDetails>
    </div>
  );
};

export default Products;
