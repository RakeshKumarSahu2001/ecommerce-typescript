import { RowDataPacket } from "mysql2";
import dbConnection from "../db/dbConnection";
import uploadOnCloudinary from "../services/cloudinary";
import ApiErrorHandler from "../utils/ApiErrorHandler";
import asyncHandler from "../utils/asyncHandler";


export const addNewProduct = asyncHandler(async (req, res) => {

  const { productName, productDescription, brand, productRating, productPrice, discount, stock } = req.body
  const requiredFields = [productName, productDescription, brand, productRating, productPrice, discount, stock];
  const fieldNames = ['Product Name', 'Product Description', 'Product Rating', 'Product Price', 'Discount', 'Stock'];

  // console.log("fields are ", requiredFields)

  const missingFields = requiredFields
    .map((value, index) => (value?.trim() === "" ? fieldNames[index] : null))
    .filter(field => field !== null);

  // console.log("fields",missingFields)
  if ([productName, productDescription, brand, productRating, productPrice, discount, stock].some((value) => value?.trim() === "")) {
    throw new ApiErrorHandler({
      statusCode: 400,
      errors: [`${missingFields.join(", ")} are nessary`],
      message: "All product information fields are required"
    })
  }

  if (productRating > 5 || productRating < 1) {
    throw new ApiErrorHandler({
      statusCode: 400,
      errors: ["rating can't excid 5"],
      message: "rating must be in the range of 1-5"
    })
  }

  const thumbNailImage = req.files?.thumbNailImage?.[0]?.path;
  const images = req.files?.images?.map((file) => file.path);

  // console.log("files", images?.[0])

  // console.log("mainimage", thumbNailImage)
  if (!thumbNailImage) {
    throw new ApiErrorHandler({ statusCode: 400, errors: ["ThumbNailImage is required"], message: "ThumbNailImage is required" })
  }
  if (images && images?.length > 3) {
    throw new ApiErrorHandler({
      statusCode: 400,
      errors: ["Can send only 3 images"],
      message: "Can send only 3 images"
    })
  }

  // after getting the cloudnairy image links store it in the database
  const pool = await dbConnection();
  const connection = await pool.getConnection();
  if (!connection) {
    throw new ApiErrorHandler({
      statusCode: 500,
      errors: ["Database connection probl7 in the add new prodct section"],
      message: "Database connection error."
    })
  }

  try {
    // extract the secure image urls from the cloudinary response
    const thumbNail = await uploadOnCloudinary(thumbNailImage)
    let productImages = [];
    for (let image of images || []) {
      const imgLink = await uploadOnCloudinary(image)
      productImages.push(imgLink)
    }

    const values = [
      productName,
      productDescription,
      productRating,
      productPrice,
      discount,
      stock,
      brand,
      thumbNail?.secure_url,
      JSON.stringify(productImages.map(img => img?.secure_url))
    ];
    console.log("values are", values)

    //insert product information in the database
    const productInsertQuery = "INSERT INTO products (ProductName, Description, Rating, Price, Discount, StockQuantity, Brand, ThumbnailImage, Images) VALUES (?,?,?,?,?,?,?,?,?)";
    const [result] = await connection.execute<RowDataPacket[]>(productInsertQuery, values);

    console.log("results", result);
    return res.status(200).json({ message: "successfull" })
  } finally {
    connection.release()
  }
})