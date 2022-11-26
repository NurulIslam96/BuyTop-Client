import React, { useEffect, useState } from "react";
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
      <div className="grid grid-cols-3">
        {categories?.map((category) => (
          <CategoryCard category={category} />
        ))}
      </div>
    </div>
  );
};

export default Home;
