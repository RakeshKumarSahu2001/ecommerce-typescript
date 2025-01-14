import { useForm, SubmitHandler } from "react-hook-form";
import { useECommerceStoreDispatch, useECommerceStoreSelector } from "../../Hooks/ecommerceStoreHooks";
import { useEffect, useState } from "react";

import logo from "../../assets/images/logo.png"
import { useNavigate, useParams } from "react-router-dom";
import { VerifyResetOtpApi, VerifyResetOtpSlice } from "../../EcommerceStore/authOpt/VerifyResetOtpApi";

type inputDataType = {
    email: string,
    password: string,
    otp: string
}

function ResetPassword() {
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<inputDataType>();
    const dispatch = useECommerceStoreDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const isReseted=useECommerceStoreSelector((state)=>state.VerifyResetOtpSlice.isReseted)
    const navigate=useNavigate();
    const { email } = useParams();

    const onSubmit: SubmitHandler<inputDataType> = async ({ password, otp }) => {
        setIsLoading(true)
        const data={
            email:email,
            password:password,
            otp:otp
        }
        await dispatch(VerifyResetOtpApi(data))
        setIsLoading(false)
    }

    useEffect(()=>{
        if(isReseted){
            navigate("/auth/login");
            dispatch(VerifyResetOtpSlice.actions.setToInitValue())
        }
    },[isReseted,navigate])

    return (
        <div className="flex !w-[50%] !h-[100%] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src={`${logo}`}
                    className="mx-auto h-24 w-auto"

                />
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6 w-96" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-100">
                        <label
                            htmlFor="otp"
                            className="input input-bordered flex items-center gap-2 w-100"
                        >
                            OTP
                            <input
                                type="number"
                                {...register("otp", {
                                    required: "OTP is required"
                                })}
                                autoComplete="off"
                                className="grow !focus:outline-none !focus:border-none !border-none !outline-none !border-transparent !ring-0"
                                placeholder="Enter OTP"
                            />
                        </label>

                        {errors.otp && <p className="text-red-500">{`${errors.otp.message}`}</p>}
                    </div>

                    <div className="w-100">
                        <label
                            htmlFor="password"
                            className="input input-bordered flex items-center gap-2 w-100"
                        >
                            Password
                            <input
                                type="password"
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
                                type="password"
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
                                isLoading ? <span className="loading loading-infinity loading-lg"></span> : "Reset Password"
                            }

                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default ResetPassword