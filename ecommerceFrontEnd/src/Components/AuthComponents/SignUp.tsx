import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"
import { useECommerceStoreDispatch, useECommerceStoreSelector } from "../../Hooks/ecommerceStoreHooks";
import { createNewUserSlice, signUpApi } from "../../EcommerceStore/authOpt/SignUpApi";
import logo from "../../assets/images/logo.png"
import { useEffect, useState } from "react";


type inputData = {
  email: string,
  password: string,
  confirmPassword: string
}


function SignUp() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, reset } = useForm<inputData>();
  const dispatch = useECommerceStoreDispatch()
  const isUserCreated = useECommerceStoreSelector((state) => state.createNewUser.isUserCreated);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<inputData> = async ({ email, password }) => {
    setIsLoading(true)
    await dispatch(signUpApi({ email: email, password: password }))
    setIsLoading(false);
    reset()
  };

  useEffect(() => {
    if (isUserCreated) {
      navigate("/auth/validate-email")
      dispatch(createNewUserSlice.actions.resetUserCreationState())
    }
  }, [isUserCreated, navigate, dispatch])


  return (
      <div className="flex !w-[50%] !h-[100%] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={`${logo}`}
            className="mx-auto h-24 w-auto"

          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create Your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6 w-96" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-100">
              <label
                htmlFor="email"
                className="input input-bordered flex items-center gap-2 w-100"
              >
                Email
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "Please enter a valid email"
                    }
                  })}
                  autoComplete="off"
                  className="grow !focus:outline-none !focus:border-none !border-none !outline-none !border-transparent !ring-0" placeholder="daisy@site.com"
                />
              </label>

              {errors.email && <p className="text-red-500">{`${errors.email.message}`}</p>}
            </div>

            <div className="w-100">
              <label
                htmlFor="password"
                className="input input-bordered flex items-center gap-2 w-100"
              >
                Password
                <input
                  type="text"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters"
                    },
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: "The password must contain at least one upper case latter, one lower case latter,one number and 1 special character"
                    }
                  })}
                  placeholder="Enter Password"
                  autoComplete="off"
                  className="grow !focus:outline-none !focus:border-none !border-none !outline-none !border-transparent !ring-0"
                />
              </label>

              {errors.password && <p className="text-red-500">{`${errors.password.message}`}</p>}
            </div>

            {/* confirm password */}
            <div className="w-100">
              <label
                htmlFor="password"
                className="input input-bordered flex items-center gap-2 w-100"
              >
                Confirm Password
                <input
                  type="text"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: "The password must contain at least one upper case latter, one lower case latter,one number and 1 special character"
                    },
                    validate: (value) => value === watch("password") || "Confirm password must be same as password"
                  })}
                  placeholder="Confirm Your Password"
                  autoComplete="off"
                  className="grow !focus:outline-none !focus:border-none !border-none !outline-none !border-transparent !ring-0"
                />
              </label>

              {errors.confirmPassword && <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>}

            </div>

            <div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {
                  isLoading ? <span className="loading loading-infinity loading-lg"></span> : "Sign Up"
                }

              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an Account?{" "}
            <Link
              to="/auth/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
  );
}

export default SignUp;
