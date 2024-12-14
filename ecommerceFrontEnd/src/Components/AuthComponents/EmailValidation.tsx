import { SubmitHandler, useForm } from "react-hook-form";
import { useECommerceStoreDispatch, useECommerceStoreSelector } from "../../Hooks/ecommerceStoreHooks";
import { EmailValidation } from "../../EcommerceStore/authOpt/EmailValidationApi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type children = {
  otp: string
}
function Emailvalidation() {
  const dispatch = useECommerceStoreDispatch()
  const user = useECommerceStoreSelector((state) => state.createNewUser.addUserInfo)
  const { register, handleSubmit, formState: { errors } } = useForm<children>();
  const navigate = useNavigate();
  const isEmailVerified = useECommerceStoreSelector((state) => state.EmailValidationSlice.isEmailVerified)

  const submit: SubmitHandler<children> = ({ otp }) => {
    dispatch(EmailValidation({ otp: otp, id: user?.id }))
  }

  useEffect(() => {
    if (isEmailVerified) {
      navigate("/shopnow/login")
    }
  }, [navigate, dispatch, isEmailVerified])

  return (
    <div className="w-100" >
      <form action="post" onSubmit={handleSubmit(submit)}>
        <input
          type="text"
          {...register("otp", {
            required: {
              value: true,
              message: "otp field is required"
            }
          })}
        />
        {errors.otp && <p className="text-red-500">{`${errors.otp.message}`}</p>}
        <button
          type="button">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Emailvalidation