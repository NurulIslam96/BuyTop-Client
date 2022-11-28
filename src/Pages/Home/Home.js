import React, { useEffect, useState } from "react";
import Advertisement from "./Advertisement";
import CategoryCard from "./CategoryCard";
import CTA from "./CTA";
import HomeBanner from "./HomeBanner";
import CustomerReviews from "./CustomerReviews";
import SiteFeatures from "./SiteFeatures";
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
      <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:gap-0 gap-5 grid-cols-1 md:mx-0 lg:px-0 md:px-3 px-1 mx-3">
        {categories?.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
      <Advertisement></Advertisement>
      <SiteFeatures></SiteFeatures>
      <CustomerReviews></CustomerReviews>
      <CTA></CTA>
    </div>
  );
};

export default Home;
