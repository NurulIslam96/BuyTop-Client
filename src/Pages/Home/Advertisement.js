import React, { useEffect, useState } from "react";
import AdvertisementCard from "./AdvertisementCard";

const Advertisement = () => {
  const [advertisement, setAdvertisement] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_api_link}/alladv`)
      .then((res) => res.json())
      .then((data) => setAdvertisement(data));
  }, []);
  return (
    <>
      {advertisement.length > 0 && (
        <div className="mx-5">
          <div className="flex justify-center pt-16">
            <div>
              <p className="text-gray-500 text-lg text-center font-normal pb-3">
                TODAY'S BEST PICK
              </p>
              <h1 className="xl:text-4xl text-3xl text-center text-gray-800  font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">
                Best used items to pick your interests from our verified sellers
              </h1>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-xl md:px-10 md:py-10 px-2 py-2">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 grid-cols-1 md:mx-0">
              {advertisement?.map((adv) => (
                <AdvertisementCard adv={adv} key={adv._id}></AdvertisementCard>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Advertisement;
