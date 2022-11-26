import React from "react";

const HomeBanner = () => {
  return (
    <div className="my-7">
      <div className="relative mx-4">
        <img
          src="https://www.funkykit.com/wp-content/uploads/2020/06/ACER-predator-gaming-laptop-banner.jpg"
          alt=""
          className="w-full px-1 h-full hidden lg:block rounded-xl"
        />
        <img
          src="https://i.ibb.co/94jQFsV/bench-accounting-nvzv-OPQW0gc-unsplash-1-1.png"
          alt=""
          className="hidden sm:block lg:hidden w-full h-full"
        />
        <img
          src="https://i.ibb.co/cJz8LZ2/bench-accounting-nvzv-OPQW0gc-unsplash-1-1.png"
          alt=""
          className="sm:hidden w-full h-full"
        />

        <div data-aos="fade-right" className="absolute z-10 top-0 left-0 mx-4 sm:mx-0 mt-36 sm:mt-0 sm:py-20 md:py-28 lg:py-20 xl:py-28 sm:pl-14 flex flex-col sm:justify-start items-start">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white sm:w-8/12">
            Minimalist Furniture Design
          </h1>
          <p className="text-base leading-normal text-slate-100 mt-4 sm:mt-5 sm:w-5/12">
            Find the latest collections that suit your needs and tastes.
          </p>
          <button className="hidden sm:flex bg-gray-800 text-base font-medium text-white mt-8 btn btn-outline btn-warning">
            Explore
          </button>
        </div>
        <button className="absolute bottom-0 sm:hidden py-4 text-base font-medium mt-8 flex justify-center items-center w-full btn btn glass">
          Explore
        </button>
      </div>
    </div>
  );
};

export default HomeBanner;
