import { SubmitHandler} from "react-hook-form"
import { useECommerceStoreDispatch, useECommerceStoreSelector } from "../../Hooks/ecommerceStoreHooks"
import { fetchUserProfInfoById } from "../../EcommerceStore/userProf/FetchUserProfInfoApi";
import { useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { AddUserProfInfoById } from "../../EcommerceStore/userProf/AddEditUserProfInfoApi";
import UserProfForm from "./UserProfForm";

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
    const id = useParams<{ id: string }>().id || '';
    const userInfo = useECommerceStoreSelector(state => state.FetchUserProfInfoSlice.userProfileInfo);
    const dispatch = useECommerceStoreDispatch();
    const navigate=useNavigate();

    const submit: SubmitHandler<inputDataType> = (formData) => {
        dispatch(AddUserProfInfoById({ data: formData, id: id }));
    }

    useEffect(() => {
        if(id){
        dispatch(fetchUserProfInfoById(id))
        }
    }, [id])

    const handleRouteToNextPage=()=>{
        navigate(`/shopnow/edit-user-profile/${id}`)
    }
    
    return (
        userInfo ?
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
                        <p>{userInfo?.DateOfBirth ? new Date(userInfo.DateOfBirth).toLocaleDateString() : ''}</p>

                    </div>
                    <div>
                        <label htmlFor="Gender">Gender</label><br />
                        <p>{userInfo?.Gender}</p>
                    </div>
                    <br />
                    <button onClick={handleRouteToNextPage}>Edit</button>
                </div>
            </div> :
            <UserProfForm submit={submit} />
    )
}

export default UserInfo
