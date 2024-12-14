import { useForm, SubmitHandler } from "react-hook-form";
import { useECommerceStoreSelector } from "../../Hooks/ecommerceStoreHooks";

// Define the type for form data
interface inputDataType {
    FullName: string;
    Phone: number;
    Street: string;
    PostalCode: number;
    City: string;
    State: string;
    Country: string;
    DateOfBirth: Date;
    Gender: "male" | "female" | "other";
}

// Define the type for the props
type UserProfFormProps = {
    submit: SubmitHandler<inputDataType>;
};

function UserProfForm({ submit }: UserProfFormProps) {
    const { handleSubmit, register } = useForm<inputDataType>(); // Pass form data type to useForm
    const userInfo = useECommerceStoreSelector(
        (state) => state.FetchUserProfInfoSlice.userProfileInfo
    );

    return (
        <div className="w-100 h-[100vh] grid place-content-center">
            <form
                className="user-info-card grid grid-cols-2 grid-rows-5 gap-4"
                onSubmit={handleSubmit(submit)} // handleSubmit expects a callback with form data
            >
                <div>
                    <label htmlFor="FullName">Full name</label>
                    <br />
                    <input
                        placeholder="Enter Your Full Name"
                        type="text"
                        defaultValue={userInfo?.FullName}
                        {...register("FullName", {
                            required: {
                                value: true,
                                message: "Full Name is Required",
                            },
                        })}
                    />
                </div>
                <div>
                    <label htmlFor="Phone">Phone</label>
                    <br />
                    <input
                        placeholder="Enter Your Phone"
                        type="number"
                        defaultValue={userInfo?.Phone}
                        {...register("Phone", {
                            required: {
                                value: true,
                                message: "Phone is Required",
                            },
                        })}
                    />
                </div>
                <div>
                    <label htmlFor="Street">Street</label>
                    <br />
                    <input
                        placeholder="Enter Your Street"
                        type="text"
                        defaultValue={userInfo?.Street}
                        {...register("Street", { required: false })}
                    />
                </div>
                <div>
                    <label htmlFor="PostalCode">Pincode</label>
                    <br />
                    <input
                        placeholder="Enter Your PostalCode"
                        type="number"
                        defaultValue={userInfo?.PostalCode}
                        {...register("PostalCode", { required: false })}
                    />
                </div>
                <div>
                    <label htmlFor="City">City</label>
                    <br />
                    <input
                        placeholder="Enter Your City"
                        type="text"
                        defaultValue={userInfo?.City}
                        {...register("City", { required: false })}
                    />
                </div>
                <div>
                    <label htmlFor="State">State</label>
                    <br />
                    <input
                        placeholder="Enter Your State"
                        type="text"
                        defaultValue={userInfo?.State}
                        {...register("State", { required: false })}
                    />
                </div>
                <div>
                    <label htmlFor="Country">Country</label>
                    <br />
                    <input
                        placeholder="Enter Your Country"
                        type="text"
                        defaultValue={userInfo?.Country}
                        {...register("Country", { required: false })}
                    />
                </div>
                <div>
                    <label htmlFor="DateOfBirth">DOB</label>
                    <br />
                    <input
                        type="date"
                        {...register("DateOfBirth", {
                            required: {
                                value: true,
                                message: "DOB is Required",
                            },
                        })}
                    />
                </div>
                <div>
                    <label htmlFor="Gender">Gender</label>
                    <br />
                    <select
                        {...register("Gender", {
                            required: {
                                value: true,
                                message: "Gender is Required",
                            },
                        })}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <br />
                <button 
                type="submit"
                className="inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700"
                >Submit</button>
            </form>
        </div>
    );
}

export default UserProfForm;
