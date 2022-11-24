import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setUserToken } from "../../customFunction/setUserToken";
import { AuthContext } from "../../contexts/AuthProvider";

const Login = () => {
  const { register, handleSubmit, reset} = useForm();
  const {signIn,googleSignIn} = useContext(AuthContext);
  const location = useLocation()
  const navigate = useNavigate()
  const from = location?.state?.from?.path || "/";

  const handleEmailSignIn = (data) => {
    signIn(data.email, data.password)
    .then(result=>{
      setUserToken(result.user)
      reset()
      navigate(from, {replace: true})
    })
    .catch(err=>console.log(err))
  }
  const handleGoogleLogin = () => {
    googleSignIn()
    .then(result => {
      const role = "Seller"
      setUserToken(result.user, role)
      toast.success(`Welcome ${result.user.displayName}`)
      navigate(from, {replace: true})
    })
  }
  return (
    <div className="container mx-auto">
      <section>
        <div className="px-6 py-12">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 md:block hidden lg:w-6/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt=""
              />
            </div>
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-900 text-gray-100">
              <h1 className="text-2xl font-bold text-center">Login</h1>
              <form
                onSubmit={handleSubmit(handleEmailSignIn)}
                className="space-y-6 ng-untouched ng-pristine ng-valid"
              >
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
                    {...register("password", {required:true})}
                    placeholder="******"
                    className="w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
                  />
                  <div className="flex justify-end text-xs text-gray-400">
                    <Link href="#">Forgot Password?</Link>
                  </div>
                </div>
                <button type="submit" className="block w-full p-3 text-center rounded-sm text-white bg-blue-500">
                  Sign in
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
                Don't have an account?
                <Link
                  to={'/signup'}
                  className="underline text-gray-100"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
