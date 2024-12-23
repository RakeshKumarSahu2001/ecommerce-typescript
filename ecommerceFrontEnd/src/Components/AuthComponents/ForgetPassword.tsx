import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import logo from "../../assets/images/logo.png"
import { SendResetPasswordOtpApi, SendResetPasswordOtpSlice } from "../../EcommerceStore/authOpt/SendResetPasswordOtpApi";
import { useECommerceStoreDispatch, useECommerceStoreSelector } from "../../Hooks/ecommerceStoreHooks";

type inputDataType = {
    email: string
}

function ForgetPassword() {
    const { register, handleSubmit, formState: { errors, isSubmitting },watch } = useForm<inputDataType>()
    const dispatch = useECommerceStoreDispatch();
    const isSended = useECommerceStoreSelector((state) => state.SendResetPasswordOtpSlice.isSended);
    const navigate = useNavigate();
    const email=watch("email")
    const [isLoading, setIsLoading] = useState(false)

    const submit: SubmitHandler<inputDataType> = async ({ email }) => {
        setIsLoading(true)
        await dispatch(SendResetPasswordOtpApi({ email }))
        setIsLoading(false)
    }

    useEffect(() => {
        if (isSended) {
            navigate(`/auth/reset-password/${email}`);
            dispatch(SendResetPasswordOtpSlice.actions.resetToPrevState());
        }
    }, [isSended, navigate,email])


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
                    htmlFor="email"
                    className="input input-bordered flex items-center gap-2 w-100"
                >
                    Email
                    <input
                        type="text"
                        className="grow !focus:outline-none !focus:border-none !border-none !outline-none !border-transparent !ring-0"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "email field is required"
                            }
                        })}
                    />
                </label>
                {errors.email && <p className="text-red-500">{`${errors.email.message}`}</p>}
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    { isLoading?<span className="loading loading-infinity loading-lg"></span> :"Submit"}
                </button>
            </form>
        </div>
    )
}

export default ForgetPassword