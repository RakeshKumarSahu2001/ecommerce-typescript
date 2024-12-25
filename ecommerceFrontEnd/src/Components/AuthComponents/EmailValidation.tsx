import { SubmitHandler, useForm } from "react-hook-form";
import { useECommerceStoreDispatch, useECommerceStoreSelector } from "../../Hooks/ecommerceStoreHooks";
import { EmailValidation } from "../../EcommerceStore/authOpt/EmailValidationApi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import logo from "../../assets/images/logo.png"

type children = {
  otp: string
}


function Emailvalidation() {
  const dispatch = useECommerceStoreDispatch()
  const user = useECommerceStoreSelector((state) => state.createNewUser.addUserInfo)
  const { register, handleSubmit, formState: { errors } } = useForm<children>();
  const navigate = useNavigate();
  const isEmailVerified = useECommerceStoreSelector((state) => state.EmailValidationSlice.isEmailVerified)

  const submit: SubmitHandler<children> = async ({ otp }) => {
    await dispatch(EmailValidation({ otp: otp, id: user?.id }))
  }

  useEffect(() => {
    if (isEmailVerified) {
      navigate("/auth/login")
    }
  }, [navigate, dispatch, isEmailVerified])

  return (

    <div className="flex flex-col !w-[100%] !h-[100%] justify-center items-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src={`${logo}`}
          className="mx-auto h-24 w-auto"

        />
      </div>
      <form action="post" className="space-y-6 w-96 mt-10" onSubmit={handleSubmit(submit)}>
        <label
          htmlFor="otp"
          className="input input-bordered flex items-center gap-2 w-100"
        >
          OTP
          <input
            type="text"
            className="grow !focus:outline-none !focus:border-none !border-none !outline-none !border-transparent !ring-0"
            {...register("otp", {
              required: {
                value: true,
                message: "otp field is required"
              }
            })}
          />
        </label>
        {errors.otp && <p className="text-red-500">{`${errors.otp.message}`}</p>}
        <button
          type="button"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Emailvalidation