import { v2 as cloudinary } from 'cloudinary';
import ApiErrorHandler from '../utils/ApiErrorHandler';
import fs from "fs";


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath){
            return null;
        }

        //if file is present then upload it on cloudinary
        const uploadResult = await cloudinary.uploader
            .upload(localFilePath,{
                 resource_type: 'auto'
            })

            console.log("cloudinary result = ",uploadResult)

            return uploadResult;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        throw new ApiErrorHandler({statusCode:500,errors:["Problem occured during file upload"]})
    }
}