import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const HomeBanner = () => {
  return (
    <div className="my-7">
      <div className="relative mx-4">
      <Swiper
      modules={[ Autoplay]}
      slidesPerView={1}
      autoplay={{ delay: 4000 }}
    >
      <SwiperSlide>
        <img
          src="https://i.ibb.co/P4qFW67/ACER-predator-gaming-laptop-banner.jpg"
          alt=""
          className="w-full px-1 h-full hidden lg:block rounded-xl"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://i.ibb.co/jJs98Kt/186546318-2938806966335664-5307418322522093854-n-2.jpg"
          alt=""
          className="w-full px-1 h-full hidden lg:block rounded-xl"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://i.ibb.co/VvSZgYW/bc-sd-newegg-hero4.jpg"
          alt=""
          className="w-full px-1 h-full hidden lg:block rounded-xl"
        />
      </SwiperSlide>
    </Swiper>
        <img
          src="https://images.moneycontrol.com/static-mcnews/2022/10/Nitro5-AN515-57-Hero-Banner-1.jpg?impolicy=website&width=770&height=431"
          alt=""
          className="hidden sm:block lg:hidden w-full h-full rounded-xl"
        />
        <img
          src="https://i.ibb.co/KjyXSVP/dell-g5-15-gaming-laptop-with-doom-eternal.jpg"
          alt=""
          className="sm:hidden w-full h-full rounded-xl"
        />

        <div data-aos="fade-right" className="absolute z-10 top-0 left-0 mx-4 sm:mx-0 mt-36 sm:mt-0 sm:py-20 md:py-28 lg:py-20 xl:py-28 sm:pl-14 flex flex-col sm:justify-start items-start">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white sm:w-8/12">
            Best Resale Laptops in town
          </h1>
          <p className="text-base leading-normal text-slate-100 mt-4 sm:mt-5 sm:w-5/12">
            Find the latest collections that suit your needs and tastes.
          </p>
          <button className="hidden sm:flex bg-gray-800 text-base font-medium text-white mt-8 btn btn-outline btn-warning">
            Explore
          </button>
        </div>
        <button className="absolute bottom-0 sm:hidden text-base font-medium mt-8 flex justify-center items-center w-full btn btn-warning">
          Explore
        </button>
      </div>
    </div>
  );
};

export default HomeBanner;
