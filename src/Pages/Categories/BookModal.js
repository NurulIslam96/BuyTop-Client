import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

const BookModal = ({ bookDetails }) => {
  const { user } = useContext(AuthContext);
  const { productName, price } = bookDetails;
//   console.log(bookDetails);
const handleSubmitBookForm = (e) => {
    e.preventDefault()
    console.log(e.target.location.value);
}
  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <form onSubmit={(e)=>handleSubmitBookForm(e)} className="relative modal-box  py-8 px-5 md:px-10 bg-white shadow-md rounded">
          <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
            Booking for {productName}
          </h1>
          <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
            Item Name
          </label>
          <input
            name="productName"
            defaultValue={productName}
            disabled
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          />
          <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
            Product Price
          </label>
          <input
          name="price"
            defaultValue={price}
            disabled
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          />
          <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
            Owner Name
          </label>
          <input
          name="displayName"
            defaultValue={user?.displayName}
            disabled
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          />
          <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
            Email Address
          </label>
          <div className="relative mb-5 mt-2">
            <input
            name="email"
              defaultValue={user?.email}
              disabled
              className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center  text-sm pl-3 border-gray-300 rounded border"
            />
          </div>
          <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
            Phone Number
          </label>
          <div className="relative mb-5 mt-2">
            <input
            name="phone"
              type="number"
              className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />
          </div>
          <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
            Meeting Location
          </label>
          <div className="relative mb-5 mt-2">
            <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-info-circle"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <circle cx="12" cy="12" r="9"></circle>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                <polyline points="11 12 12 12 12 16 13 16"></polyline>
              </svg>
            </div>
            <input
            name="location"
              className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />
          </div>
          <div className="flex items-center justify-start w-full">
            <input
              type="submit"
              value={"Submit"}
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
            />
            <label
              htmlFor="my-modal-3"
              className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
            >
              Cancel
            </label>
          </div>
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
        </form>
      </div>
    </>
  );
};

export default BookModal;
