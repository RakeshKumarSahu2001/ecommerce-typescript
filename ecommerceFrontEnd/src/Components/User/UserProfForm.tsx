import { useForm, SubmitHandler } from "react-hook-form";
import { useECommerceStoreSelector } from "../../Hooks/ecommerceStoreHooks";
import { userProfileInfoType } from "../../utils/types";


type UserProfFormProps = {
    submit: SubmitHandler<userProfileInfoType>;
};

function UserProfForm({ submit }: UserProfFormProps) {
    const { handleSubmit, register, formState: { errors } } = useForm<userProfileInfoType>();
    const userInfo = useECommerceStoreSelector((state) => state.FetchUserProfInfoSlice.userProfileInfo);

    return (
        <div className="!w-100 !h-[100vh] flex justify-center items-center !py-96">
            <form
                className="user-info-card grid grid-cols-2 grid-rows-5 gap-2 rounded-md shadow-[6px_10px_8px_12px_rgba(0,_0,_0,_0.1)] px-10 py-5"
                onSubmit={handleSubmit(submit)}
            >
                <div>
                    <label htmlFor="FullName">Full name</label>
                    <br />
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="input input-bordered input-primary w-full max-w-xs"
                        defaultValue={userInfo?.FullName}
                        {...register("FullName", {
                            required: {
                                value: true,
                                message: "Full Name is Required",
                            },
                        })}
                    />
                    {errors.FullName && <p>{errors.FullName.message}</p>}
                </div>
                <div>
                    <label htmlFor="Phone">Phone</label>
                    <br />
                    <input
                        type="text"
                        placeholder="Enter your phone"
                        className="input input-bordered input-primary w-full max-w-xs"
                        defaultValue={userInfo?.Phone}
                        {...register("Phone", {
                            required: {
                                value: true,
                                message: "Phone is Required",
                            },
                        })}
                    />
                    {errors.FullName && <p>{errors.FullName.message}</p>}
                </div>
                <div>
                    <label htmlFor="Street">Street</label>
                    <br />
                    <input
                        type="text"
                        placeholder="Enter Your Street"
                        className="input input-bordered input-primary w-full max-w-xs"
                        defaultValue={userInfo?.Street}
                        {...register("Street", { required: false })}
                    />
                    {errors.FullName && <p>{errors.FullName.message}</p>}
                </div>
                <div>
                    <label htmlFor="PostalCode">Pincode</label>
                    <br />
                    <input
                        type="text"
                        placeholder="Enter Your PostalCode"
                        className="input input-bordered input-primary w-full max-w-xs"
                        defaultValue={userInfo?.PostalCode}
                        {...register("PostalCode", { required: false })}
                    />
                    {errors.FullName && <p>{errors.FullName.message}</p>}
     
                </div>
                <div>
                    <label htmlFor="City">City</label>
                    <br />
                    <input
                        type="text"
                        placeholder="Enter Your City"
                        className="input input-bordered input-primary w-full max-w-xs"
                        defaultValue={userInfo?.City}
                        {...register("City", { required: false })}
                    />
    
                </div>
                <div>
                    <label htmlFor="State">State</label>
                    <br />
                    <input
                        type="text"
                        placeholder="Enter Your State"
                        className="input input-bordered input-primary w-full max-w-xs"
                        defaultValue={userInfo?.State}
                        {...register("State", { required: false })}
                    />
             
                </div>
                <div>
                    <label htmlFor="Country">Country</label>
                    <br />
                    <input
                        type="text"
                        placeholder="Enter Your Country"
                        className="input input-bordered input-primary w-full max-w-xs"
                        defaultValue={userInfo?.Country}
                        {...register("Country", { required: false })}
                    />
                 
                </div>
                <div>
                    <label htmlFor="DateOfBirth">DOB</label>
                    <br />

                    <input
                        type="date"
                        className="input input-bordered input-primary w-full max-w-xs"
                        {...register("DateOfBirth", {
                            required: {
                                value: true,
                                message: "DOB is Required",
                            },
                        })}
                    />
                    {errors.DateOfBirth && <p>{errors.DateOfBirth.message}</p>}

                </div>
                <div>
                    <label htmlFor="Gender">Gender</label>
                    <br />
                    <div className="form-control">
                        <label className="label cursor-pointer justify-normal p-0">
                            <input
                                type="radio"
                                className="radio checked:bg-blue-500 h-4 w-4"
                                {
                                ...register("Gender")
                                }
                                value="male"
                            />
                            <span className="label-text px-4">Male</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-normal p-0">
                            <input
                                type="radio"
                                className="radio checked:bg-blue-500 h-4 w-4"
                                {
                                ...register("Gender")
                                }
                                value="female"
                            />
                            <span className="label-text px-4">Female</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-normal p-0">
                            <input
                                type="radio"
                                className="radio checked:bg-blue-500 h-4 w-4"
                                {
                                ...register("Gender")
                                }
                                value="other"
                            />
                            <span className="label-text px-4">Other</span>
                        </label>
                    </div>

                </div>
                <br />

                <button
                    type="submit"
                    className="inline-flex items-center justify-center px-6 py-3 mt-3 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700"
                >Submit</button>
            </form>
        </div>
    );
}

export default UserProfForm;
