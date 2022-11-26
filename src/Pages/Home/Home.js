import React, { useEffect, useState } from "react";
import Advertisement from "./Advertisement";
import CategoryCard from "./CategoryCard";
import HomeBanner from "./HomeBanner";

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_api_link}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="container mx-auto">
      <HomeBanner></HomeBanner>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:gap-0 gap-2 grid-cols-1 md:mx-0 mx-3">
        {categories?.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
      <Advertisement></Advertisement>
    </div>
  );
};

export default Home;
