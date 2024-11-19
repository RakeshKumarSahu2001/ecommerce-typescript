import { SubmitHandler, useForm } from "react-hook-form"
import { useECommerceStoreDispatch, useECommerceStoreSelector } from "../Hooks/ecommerceStoreHooks"
import { AddUserProfInfoById, fetchUserProfInfoById } from "../EcommerceStore/ManageUserProfInfoApi";
import { useEffect, useState } from "react";

enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

interface inputDataType {
    FullName: string,
    Phone: number,
    Street: string,
    PostalCode: number,
    City: string,
    State: string,
    Country: string,
    DateOfBirth: Date,
    Gender: Gender
}

function UserInfo() {
    const [userInfoExist, setUserInfoExist] = useState<boolean>(false)
    const { handleSubmit, register } = useForm<inputDataType>()
    const user = useECommerceStoreSelector((state) => state.authSlice.loggedInUser)
    // console.log("user info on line 28", user);
    const userInfo = useECommerceStoreSelector(state => state.AddUserProfInfoSlice.userProfileInfo);
    console.log("user info", userInfo);
    const dispatch = useECommerceStoreDispatch();

    const onSubmit: SubmitHandler<inputDataType> = (formData) => {
        dispatch(AddUserProfInfoById({ data: formData, id: user?.id }));
        setUserInfoExist(false)
    }

    useEffect(() => {
        dispatch(fetchUserProfInfoById(user?.id))
    }, [])

    return (
        userInfoExist ?
            <div className="w-100 h-[100vh] grid place-content-center">
                <form
                    className="user-info-card grid grid-cols-2 grid-rows-5 gap-4"
                    onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="FullName">Full name</label><br />
                        <input
                            placeholder="Enter Your Full Name"
                            type="text"
                            value={userInfo?.FullName}
                            {
                            ...register("FullName", {
                                required: {
                                    value: true,
                                    message: "Full Name is Required"
                                }
                            })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="Phone">Phone</label><br />
                        <input
                            placeholder="Enter Your Phone"
                            type="number"
                            value={userInfo?.Phone}
                            {
                            ...register("Phone", {
                                required: {
                                    value: true,
                                    message: "Phone is Required"
                                }
                            })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="Street">Street</label><br />
                        <input
                            placeholder="Enter Your Street"
                            type="text"
                            value={userInfo?.Street}
                            {
                            ...register("Street", {
                                required: false
                            })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="PostalCode">Pincode</label><br />
                        <input
                            placeholder="Enter Your PostalCode"
                            type="number"
                            value={userInfo?.PostalCode}
                            {
                            ...register("PostalCode", {
                                required: false
                            })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="City">City</label><br />
                        <input
                            placeholder="Enter Your City"
                            type="text"
                            value={userInfo?.City}
                            {
                            ...register("City", {
                                required: false
                            })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="State">State</label><br />
                        <input
                            placeholder="Enter Your State"
                            type="text"
                            value={userInfo?.State}
                            {
                            ...register("State", {
                                required: false
                            })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="Country">Country</label><br />
                        <input
                            placeholder="Enter Your Country"
                            type="text"
                            value={userInfo?.Country}
                            {
                            ...register("Country", {
                                required: false
                            })
                            } />
                    </div>
                    <div>
                        <label htmlFor="DateOfBirth">DOB</label><br />
                        <input
                            type="date"
                            {
                            ...register("DateOfBirth", {
                                required: {
                                    value: true,
                                    message: "DOB is Required"
                                }
                            })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="Gender">Gender</label><br />
                        <select
                            {
                            ...register("Gender", {
                                required: {
                                    value: true,
                                    message: "Gender is Required"
                                }
                            })
                            }>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div> :
            <div className="w-100 h-[100vh] grid place-content-center">
                <div className="user-info-card grid grid-cols-2 grid-rows-5 gap-4">
                    <div>
                        <label htmlFor="FullName">Full name</label><br />
                        <p>{userInfo?.FullName}</p>
                    </div>
                    <div>
                        <label htmlFor="Phone">Phone</label><br />
                        <p>{userInfo?.Phone}</p>
                    </div>
                    <div>
                        <label htmlFor="Street">Street</label><br />
                        <p>{userInfo?.Street}</p>
                    </div>
                    <div>
                        <label htmlFor="PostalCode">Pincode</label><br />
                        <p>{userInfo?.PostalCode}</p>
                    </div>
                    <div>
                        <label htmlFor="City">City</label><br />
                        <p>{userInfo?.City}</p>
                    </div>
                    <div>
                        <label htmlFor="State">State</label><br />
                        <p>{userInfo?.State}</p>
                    </div>
                    <div>
                        <label htmlFor="Country">Country</label><br />
                        <p>{userInfo?.Country}</p>
                    </div>
                    <div>
                        <label htmlFor="DateOfBirth">DOB</label><br />
                        <p>{userInfo?.DateOfBirth}</p>
                    </div>
                    <div>
                        <label htmlFor="Gender">Gender</label><br />
                        <p>{userInfo?.Gender}</p>
                    </div>
                    <br />
                    <button onClick={() => setUserInfoExist(true)}>Edit</button>
                </div>
            </div>
    )
}

export default UserInfo
