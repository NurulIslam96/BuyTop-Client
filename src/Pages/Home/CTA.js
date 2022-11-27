import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-6 bg-gray-800 text-gray-50 mx-5 rounded-xl my-10">
        <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
          <h1 className="text-5xl font-bold leading-none text-center">
            Sign up now
          </h1>
          <p className="text-xl font-medium text-center">
            At a assumenda quas cum earum ut itaque commodi saepe rem aspernatur
            quam natus quis nihil quod, hic explicabo doloribus magnam neque,
            exercitationem eius sunt!
          </p>
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-8">
            <Link to={'/signup'} className="text-lg font-semibold rounded btn-warning btn btn-outline text-gray-900">
              Get started
            </Link>
            <Link to={'/blogs'} className="text-lg font-semibold rounded btn-primary btn text-light">
              Learn more
            </Link>
          </div>
        </div>
      </section>
  );
};

export default CTA;
