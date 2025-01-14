import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import { useECommerceStoreDispatch, useECommerceStoreSelector } from '../../Hooks/ecommerceStoreHooks';
import { useEffect } from 'react';
import logo from "../../assets/images/logo.png"
import { loginApi } from '../../EcommerceStore/authOpt/LoginApi';

type inputData = {
  email: string,
  password: string
};


function Login() {
  const { register, reset, handleSubmit, formState: { errors, isSubmitting } } = useForm<inputData>();
  const dispatch = useECommerceStoreDispatch();

  const user = useECommerceStoreSelector((state) => state.loginSlice.isUserExist)
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<inputData> = async ({ email, password }) => {
    await dispatch(loginApi({ email: email, password: password }));
    reset();
  }

  useEffect(() => {
    if (user) {
      navigate("/shopnow/allproduct");
    }
  }, [user, navigate]);

  return (
    <div className="flex !w-[50%] !h-[100%] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src={`${logo}`}
          className="mx-auto h-24 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="input input-bordered flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path
                  d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>

              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message: "Please enter a valid email"
                  }
                })}
                placeholder='Email address'
                type="email"
                autoComplete="off"
                className="grow !focus:outline-none !focus:border-none !border-none !outline-none !border-transparent !ring-0"
              />
            </label>
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
          </div>

          <div className="text-sm flex items-center justify-end">
            <Link to="/auth/check-email-valid" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </Link>
          </div>
          <div className="mt-2">
            <label
              htmlFor="password"
              className="input input-bordered flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd" />
              </svg>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must contain at least 8 characters"
                  }
                })}
                placeholder='Enter Password'
                type="password"
                autoComplete="off"
                className="grow !focus:outline-none !focus:border-none !border-none !outline-none !border-transparent !ring-0"
              />
            </label>
            {errors.password && <p className="text-red-600">{errors.password.message}</p>}
          </div>

          <div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isSubmitting ? <span className="loading loading-infinity loading-lg"></span> : "Login"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link to="/auth/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
