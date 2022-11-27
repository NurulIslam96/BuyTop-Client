import React from "react";

const CustomerReviews = () => {
  return (
    <div>
      <div className="lg:px-20 md:px-6 px-4 py-12">
        <div className="flex flex-col items-center justify-center">
          <h1 className="lg:text-4xl text-3xl font-bold text-center text-gray-800">
            Hear from our Buyers
          </h1>
          <p className="text-base leading-6 mt-4 text-center text-gray-600 2xl:w-2/5 ">
            Here is why you should trust us with your work achievements
          </p>
        </div>
        <div className="w-full lg:flex items-center gap-6 mt-10">
          <div className="lg:w-1/2">
            <div className="bg-white border rounded-md border-gray-200 relative sm:p-10 p-6">
              <div>
                <img
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonials-4-svg1.svg"
                  alt="commas"
                />
              </div>
              <p className="text-base leading-6 text-gray-600 mt-4">
              The service and support is very good. The website is user friendly. The content that is displayed is very genuine and accurate. The information that is provided in this website is described in depth. We can buy and sell anything using this website. All kind of product is available in this website. The seller and buyer can interact using this website about the product. It is the biggest website to sell and buy products.
              </p>
              <div className="absolute bottom-0 -mb-4 ml-10">
                <img
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonials-4-svg2.svg"
                  alt="sharp"
                />
              </div>
            </div>
            <div className="flex items-center mt-7">
              <div className="w-12 h-12 border border-indigo-700 rounded-full flex items-center justify-center">
                <img
                  src="https://i.ibb.co/R6WQhYj/Mask-Group.png"
                  className="w-10 h-10 rounded-full"
                  alt="profile"
                />
              </div>
              <div className="flex flex-col items-start ml-4">
                <p className="text-base font-semibold leading-4 text-gray-800">
                  Alisha Cooper
                </p>
                <p className="text-base leading-4 mt-2 text-center text-gray-600">
                  Buyer
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 lg:mt-0 mt-16">
            <div className="bg-white border rounded-md border-gray-200 relative sm:p-10 p-6">
              <div>
                <img
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonials-4-svg1.svg"
                  alt="commas"
                />
              </div>
              <p className="text-base leading-6 text-gray-600 mt-4">
              The service and support is very good. The website is user friendly. The content that is displayed is very genuine and accurate. The information that is provided in this website is described in depth. We can buy and sell anything using this website. All kind of product is available in this website. The seller and buyer can interact using this website about the product. It is the biggest website to sell and buy products.
              </p>
              <div className="absolute bottom-0 -mb-4 ml-10">
                <img
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonials-4-svg2.svg"
                  alt="sharp"
                />
              </div>
            </div>
            <div className="flex items-center mt-7">
              <div className="w-12 h-12 border border-indigo-700 rounded-full flex items-center justify-center">
                <img
                  src="https://i.ibb.co/C6bwf12/Mask-Group.png"
                  className="w-10 h-10 rounded-full"
                  alt="profile"
                />
              </div>
              <div className="flex flex-col items-start ml-4">
                <p className="text-base font-semibold leading-4 text-gray-800">
                  Henry Jack
                </p>
                <p className="text-base leading-4 mt-2 text-center text-gray-600">
                  Buyer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
