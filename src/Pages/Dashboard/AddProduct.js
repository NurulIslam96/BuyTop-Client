import { format } from "date-fns";
import React, { useContext, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const [productImage, setProductImage] = useState("")
  const {user} = useContext(AuthContext)
  const [startDate, setStartDate] = useState(new Date());
  const date = format(startDate, "PP");
  const handleAddProduct = (data) => {
    const purchaseDate = data.date.slice(0,4)
    const url = `https://api.imgbb.com/1/upload?&key=${process.env.REACT_APP_image_key}`;
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {setProductImage(imageData.data.display_url)})
    const productDetails = {
      email: user?.email,
      userPhoto: user?.photoURL,
      userName: user?.displayName,
      productName: data.name,
      purchaseYear: purchaseDate,
      condition: data.condition,
      postDate: date,
      location: data.location,
      phone: data.phone,
      description: data.description,
      productPhoto: productImage,
      price: data.price
    }
    console.log(productDetails)
  }

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
          <div className="mb-5">
            <label
              htmlFor="guest"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Mobile Number
            </label>
            <input
              type="number"
              placeholder="+880"
              {...register("phone", { required: true })}
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="date"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Date of purchase
                </label>
                <input
                  type="date"
                  {...register("date", { required: true })}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
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
            <input
              type="text"
              placeholder="Dhaka, Bangladesh"
              {...register("location", { required: true })}
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
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
          <div className="mb-5">
            <label
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Price
            </label>
            <input
              type="number"
              placeholder="$price"
              {...register("price", { required: true })}
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mb-5">
            <label className="block">
              Select Product photo:
            </label>
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
