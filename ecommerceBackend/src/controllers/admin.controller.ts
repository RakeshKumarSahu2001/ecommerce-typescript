import ApiErrorHandler from "../utils/ApiErrorHandler";
import asyncHandler from "../utils/asyncHandler";

export const addNewProduct=asyncHandler(async(req,res)=>{

    const {productName,productDescription,productRating,productPrice,discount,stock}=req.body
    const requiredFields=[productName,productDescription,productRating,productPrice,discount,stock];
    const fieldNames = ['Product Name', 'Product Description', 'Product Rating', 'Product Price', 'Discount', 'Stock'];

    const missingFields = requiredFields
    .map((value, index) => (value?.trim() === "" ? fieldNames[index] : null))
    .filter(field => field !== null);
      console.log("fields",missingFields)


    if([productName,productDescription,productRating,productPrice,discount,stock].some((value)=>value?.trim()==="")){
        throw new ApiErrorHandler({statusCode:400,errors:[` are nessary`], message: "All product information fields are required"})
    }

    // const mainImage=Object.values(req.files)?.map(element => element[0]?.path);

    // const mainImage=req.files?.mainImage?.[0]?.path

    // console.log("files",req.files)

    // console.log("mainimage",mainImage)
    // if(!mainImage){

    // }


    return res.status(200).json({message:"successfull"})
})