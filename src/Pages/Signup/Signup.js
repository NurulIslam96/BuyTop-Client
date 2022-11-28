import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setUserToken } from "../../customFunction/setUserToken";
import { AuthContext } from "../../contexts/AuthProvider";

const Signup = () => {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");
  const { createUser, googleSignIn, updateUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.path || "/";

  const handleSignUp = (data) => {
    const role = data.role;
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
        createUser(data.email, data.password)
          .then((result) => {
            const newProfile = {
              email: data.email,
              displayName: data.name,
              photoURL: imageData.data.display_url,
            };
            handleUpdateUserProfile(data.name, imageData.data.display_url);
            setUserToken(newProfile, role);
            toast.success("Registered Succesfully");
            setError("");
            navigate(from, { replace: true });
          })
          .catch((err) => console.log(err));
        reset();
      });
  };

  const handleUpdateUserProfile = (displayName, photoURL) => {
    const profile = {
      displayName: displayName,
      photoURL: photoURL,
    };
    updateUser(profile)
      .then(() => {})
      .catch((e) => console.error(e));
  };

  const handleGoogleLogin = () => {
    googleSignIn().then((result) => {
      toast.success(`Welcome ${result.user.displayName}`);
      const role = "Buyer"
      setUserToken(result.user, role);
    });
    navigate(from, { replace: true });
  };
  return (
    <div className="container mx-auto">
      <section className="min-h-screen">
        <div className="px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 md:block hidden lg:w-6/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt=""
              />
            </div>
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-900 text-gray-100">
              <h1 className="text-2xl font-bold text-center">Sign Up</h1>
              <form
                onSubmit={handleSubmit(handleSignUp)}
                className="space-y-6 ng-untouched ng-pristine ng-valid"
              >
                <div className="space-y-1 text-sm">
                  <label htmlFor="email" className="block text-gray-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    {...register("name", { required: true })}
                    className="w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <label htmlFor="email" className="block text-gray-400">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                    className="w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <label htmlFor="password" className="block text-gray-400">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="******"
                    className="w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
                  />
                </div>
                <div></div>
                <div className="space-y-1 text-sm">
                  <label htmlFor="password" className="block text-gray-400">
                    Select a role
                  </label>
                  <select
                    defaultValue={"Buyer"}
                    className="select select-info w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
                    {...register("role", { required: true })}
                  >
                    <option>Buyer</option>
                    <option>Seller</option>
                  </select>
                </div>
                <div className="space-y-1 text-sm">
                  <label htmlFor="password" className="block text-gray-400">
                    Select Profile photo:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("image", { required: true })}
                  />
                </div>
                {error && <p className="px-3 text-sm text-red-600">{error}</p>}
                <button
                  type="submit"
                  className="block w-full p-3 text-center rounded-sm text-white bg-blue-500"
                >
                  Sign Up
                </button>
              </form>
              <div className="flex items-center pt-4 space-x-1">
                <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
                <p className="px-3 text-sm text-gray-400">
                  Login with social accounts
                </p>
                <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  aria-label="Log in with Google"
                  className="p-3 rounded-sm"
                  onClick={handleGoogleLogin}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                  </svg>
                </button>
              </div>
              <p className="text-xs text-center sm:px-6 text-gray-400">
                Already Have an account?
                <Link to={"/login"} className="underline text-gray-100">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
