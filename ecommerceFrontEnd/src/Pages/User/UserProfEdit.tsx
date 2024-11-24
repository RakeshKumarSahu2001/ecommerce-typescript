import { SubmitHandler } from "react-hook-form";
import UserProfForm from "../../Components/UserProfForm";
import { EditUserProfInfoById } from "../../EcommerceStore/userProf/AddEditUserProfInfoApi";
import { useECommerceStoreDispatch } from "../../Hooks/ecommerceStoreHooks";
import { useParams } from "react-router-dom";

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

function UserProfEdit() {
    const dispatch = useECommerceStoreDispatch();
    const { id } = useParams();

    if (!id) {
        console.error("User ID is missing from the route parameters.");
        return <div>Error: User ID is required</div>;
    }

    const onSubmit: SubmitHandler<inputDataType> = (formData) => {
        console.log("formdata", formData, id);
        dispatch(EditUserProfInfoById({ data: formData, id })); // 'id' is now guaranteed to be a string
    };

    return (
        <div>
            <UserProfForm submit={onSubmit} />
        </div>
    );
}

export default UserProfEdit;
