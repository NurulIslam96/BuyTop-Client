import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const { Category, image } = category;
  return (
    <div className="flex justify-center">
      <div className="card w-96 h-56 bg-base-100 image-full">
        <figure>
          <img src={image} alt="" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{Category}</h2>
          <p>Check Out This Section and Find Your favorite choice at reasonable price</p>
          <div className="card-actions justify-end">
            <Link to={`/category/${category._id}`} className="btn btn-warning hover:bg-yellow-500">Find Out</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
