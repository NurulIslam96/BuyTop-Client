import { format } from "date-fns";
import React, { useContext, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import useVerify from "../../../Hooks/useVerify";

const AddProduct = () => {
  const { register, handleSubmit, reset, errors } = useForm();
  const { user } = useContext(AuthContext);
  const [isVerified] = useVerify(user?.email);
  const [startDate] = useState(new Date());
  const date = format(startDate, "PP");
  const navigate = useNavigate();
  const handleAddProduct = (data) => {
    const url = `https://api.imgbb.com/1/upload?&key=${process.env.REACT_APP_image_key}`;
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const productDetails = {
          email: user?.email,
          userPhoto: user?.photoURL,
          userName: user?.displayName,
          productName: data.name,
          purchaseYear: data.purchaseYear,
          condition: data.condition,
          postDate: date,
          location: data.location,
          phone: data.phone,
          description: data.description,
          productPhoto: imageData.data.display_url,
          originalPrice: data.originalPrice,
          resalePrice: data.resalePrice,
          status: "Available",
          category: data.category,
          isVerified,
        };
        fetch(`${process.env.REACT_APP_api_link}/addproduct`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${localStorage.getItem("buytop-token")}`,
          },
          body: JSON.stringify(productDetails),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              toast.success("Product Added Successfully");
              reset();
              navigate("/dashboard/myproducts");
            }
          });
      });
  };

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={handleSubmit(handleAddProduct)}>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Product Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Product name"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Product Category
                </label>
                <select
                  className="select select-info w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  {...register("category", { required: true })}
                >
                  <option>Elitebook</option>
                  <option>Ultrabook</option>
                  <option>Gaming Laptop</option>
                </select>
              </div>
            </div>
          </div>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Mobile Number
                </label>
                <input
                  type="number"
                  placeholder="+880"
                  {...register("phone", { required: true })}
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Condition
                </label>
                <select
                  className="select select-info w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  {...register("condition", { required: true })}
                >
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                </select>
              </div>
            </div>
          </div>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="date"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Year of purchase
                </label>
                <input
                  type="number"
                  {...register("purchaseYear", {
                    required: true,
                    min: 2010,
                    max: 2023,
                  })}
                  placeholder="2010-2023"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                {errors?.purchaseYear && (
                  <p className="text-red-500">
                    Please enter valid year between 2010-2023
                  </p>
                )}
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Date of posting
                </label>
                <ReactDatePicker
                  disabled
                  selected={startDate}
                  className="w-full rounded-md border border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="guest"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Location
            </label>
            <select
              className="select select-info w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              {...register("location", { required: true })}
            >
              <option>Dhaka</option>
              <option>Chittagong</option>
              <option>Sylhet</option>
              <option>Rangpur</option>
              <option>Comilla</option>
              <option>Barishal</option>
              <option>Khulna</option>
              <option>Rajshahi</option>
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="guest"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Product Description
            </label>
            <input
              type="text"
              placeholder="Description"
              {...register("description", { required: true })}
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Original Price
                </label>
                <input
                  type="number"
                  placeholder="$originalPrice"
                  {...register("originalPrice", { required: true })}
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Resale Price
                </label>
                <input
                  type="number"
                  placeholder="$resalePrice"
                  {...register("resalePrice", { required: true })}
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <div className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mb-5">
            <label className="block">Select Product photo:</label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: true })}
            />
          </div>
          <div>
            <button
              type="submit"
              className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
