import { v2 as cloudinary } from 'cloudinary';
import ApiErrorHandler from '../utils/ApiErrorHandler';
import fs from "fs";

const uploadOnCloudinary = async (localFilePath: string) => {
    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
    // console.log("localfilepath on cloudinary", localFilePath)
    try {
        if (!localFilePath) {
            return null;
        }

        //if file is present then upload it on cloudinary
        const uploadResult = await cloudinary.uploader
            .upload(localFilePath, {
                resource_type: 'auto'
            })
        fs.unlinkSync(localFilePath)
        // console.log("cloudinary result = ", uploadResult)

        return uploadResult;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        throw new ApiErrorHandler({ statusCode: 500, errors: ["Problem occured during file upload"] })
    }
}


export default uploadOnCloudinary;