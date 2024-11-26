import { SubmitHandler } from "react-hook-form";
import { EditUserProfInfoById } from "../../EcommerceStore/userProf/AddEditUserProfInfoApi";
import { useECommerceStoreDispatch } from "../../Hooks/ecommerceStoreHooks";
import { useParams } from "react-router-dom";
import UserProfForm from "../../Components/User/UserProfForm";

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

function UserProfEdit() {
    const dispatch = useECommerceStoreDispatch();
    const { id } = useParams();

    if (!id) {
        console.error("User ID is missing from the route parameters.");
        return <div>Error: User ID is required</div>;
    }

    const onSubmit: SubmitHandler<inputDataType> = (formData) => {
        dispatch(EditUserProfInfoById({ data: formData, id }));
    };

    return (
        <div>
            <UserProfForm submit={onSubmit} />
        </div>
    );
}

export default UserProfEdit;
