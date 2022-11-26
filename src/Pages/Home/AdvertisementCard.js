import React from "react";

const AdvertisementCard = ({ adv }) => {
  return (
    <div className="flex justify-center">
      <div
        className="flex flex-col justify-between card md:w-96 md:h-96 h-56 bg-white bg-center text-gray-800 shadow-md overflow-hidden cursor-pointer"
        style={{ backgroundImage: `url(${adv.productPhoto})`, backgroundSize: "contain", backgroundRepeat: "no-repeat" }}
      >
        <div className="flex justify-between items-center ml-4 pr-8">
          <div className="bg-yellow-600 text-white bg-opacity-95 shadow px-2 py-1 flex items-center font-bold text-xs rounded">
            Today's Hot Deals
          </div>
          <div className="bg-red-600 w-10 h-12 shadow flex flex-col-reverse p-2 text-center font-bold text-white rounded-b-full">
            8%
          </div>
        </div>
        <div className="bg-white bg-opacity-95 shadow-md rounded-r-xl p-4 flex flex-col mr-24 mb-8">
          <h3 className="text-xl font-bold pb-2">{adv?.productName}</h3>
          <p className="truncate text-gray-500 text-sm">{adv?.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-xs">{adv?.location}</span>
          </div>
          <div className="flex justify-between mt-2">
            <div className="flex items-center pr-2 rounded-full bg-gray-300  h-8 line-height-username1">
              <img
                className="rounded-full float-left h-full"
                src={adv?.userPhoto}
                alt=""
              />
              <span className="ml-2">{adv?.userName}</span>
            </div>
            <button className="btn btn-warning btn-sm">
              ${adv?.resalePrice}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementCard;
