import { SubmitHandler } from "react-hook-form"
import { useECommerceStoreDispatch, useECommerceStoreSelector } from "../../Hooks/ecommerceStoreHooks"
import { fetchUserProfInfoById } from "../../EcommerceStore/userProf/FetchUserProfInfoApi";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AddUserProfInfoById } from "../../EcommerceStore/userProf/AddEditUserProfInfoApi";
import UserProfForm from "./UserProfForm";
import { userProfileInfoType } from "../../utils/types";


function UserInfo() {
    const id = useParams<{ id: string }>().id || '';
    const userInfo = useECommerceStoreSelector(state => state.FetchUserProfInfoSlice.userProfileInfo);
    const dispatch = useECommerceStoreDispatch();
    const navigate = useNavigate();
    const isProfData = useECommerceStoreSelector((state) => state.manageUserProfInfoSlice.isProfData)

    const submit: SubmitHandler<userProfileInfoType> = async (formData) => {
        await dispatch(AddUserProfInfoById({ data: formData, id: id }));
    }

    useEffect(() => {
        if (id) {
            dispatch(fetchUserProfInfoById(id))
        }
    }, [id, isProfData])

    const handleRouteToNextPage = () => {
        navigate(`/shopnow/edit-user-profile/${id}`)
    }

    return (
        userInfo ?
            <div className="w-100 h-[100vh] grid place-content-center">
                <div className="user-info-card grid grid-cols-1 md:grid-cols-2 md:grid-rows-5 grid-rows-9 gap-2 rounded-md shadow-[6px_10px_8px_12px_rgba(0,_0,_0,_0.1)] px-10 py-5">
                    <div>
                        <label htmlFor="FullName">Full name</label><br />
                        <p className="pr-5 pt-2 border-solid border-b-4 capitalize border-blue-600 hover:border-blue-700">{userInfo?.FullName}</p>
                    </div>
                    <div>
                        <label htmlFor="Phone">Phone</label><br />
                        <p className="pr-5 pt-2 border-solid border-b-4 capitalize border-blue-600 hover:border-blue-700">{userInfo?.Phone}</p>
                    </div>
                    <div>
                        <label htmlFor="Street">Street</label><br />
                        <p className="pr-5 pt-2 border-solid border-b-4 capitalize border-blue-600 hover:border-blue-700">{userInfo?.Street}</p>
                    </div>
                    <div>
                        <label htmlFor="PostalCode">Pincode</label><br />
                        <p className="pr-5 pt-2 border-solid border-b-4 capitalize border-blue-600 hover:border-blue-700">{userInfo?.PostalCode}</p>
                    </div>
                    <div>
                        <label htmlFor="City">City</label><br />
                        <p className="pr-5 pt-2 border-solid border-b-4 capitalize border-blue-600 hover:border-blue-700">{userInfo?.City}</p>
                    </div>
                    <div>
                        <label htmlFor="State">State</label><br />
                        <p className="pr-5 pt-2 border-solid border-b-4 capitalize border-blue-600 hover:border-blue-700">{userInfo?.State}</p>
                    </div>
                    <div>
                        <label htmlFor="Country">Country</label><br />
                        <p className="pr-5 pt-2 border-solid border-b-4 capitalize border-blue-600 hover:border-blue-700">{userInfo?.Country}</p>
                    </div>
                    <div>
                        <label htmlFor="DateOfBirth">DOB</label><br />
                        <p className="pr-5 pt-2 border-solid border-b-4 capitalize border-blue-600 hover:border-blue-700">{userInfo?.DateOfBirth ? new Date(userInfo.DateOfBirth).toLocaleDateString() : ''}</p>

                    </div>
                    <div>
                        <label htmlFor="Gender">Gender</label><br />
                        <p className="pr-5 pt-2 border-solid border-b-4 capitalize border-blue-600 hover:border-blue-700">{userInfo?.Gender}</p>
                    </div>
                    <br />
                    <button
                        onClick={handleRouteToNextPage}
                        className="inline-flex items-center justify-center px-6 py-3 mt-3 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700">
                        Edit</button>
                </div>
            </div> :
            <UserProfForm submit={submit} />
    )
}

export default UserInfo
