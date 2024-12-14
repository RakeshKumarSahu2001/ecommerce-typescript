import { RowDataPacket } from "mysql2";
import dbConnection from "../db/dbConnection";
import uploadOnCloudinary from "../services/cloudinary";
import ApiErrorHandler from "../utils/ApiErrorHandler";
import asyncHandler from "../utils/asyncHandler";

//Fetch product
export const fetchAllProducts = asyncHandler(async (req, res) => {
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
    const selectAllProductQuery = "SELECT * FROM products;";
    const [selectAllProduct] = await connection.execute<RowDataPacket[]>(selectAllProductQuery);
    if (!selectAllProduct || selectAllProduct.length === 0) {
      throw new ApiErrorHandler({
        statusCode: 404,
        errors: ["No product Present."],
        message: "No product Present."
      })
    }

    return res.status(200)
      .json({
        success: true,
        message: "Products fetched successfully.",
        data: selectAllProduct
      })
  } finally {
    connection.release();
  }
})

//Add product
export const addNewProduct = asyncHandler(async (req, res) => {
  const { productName, productDescription, brand, productRating, productPrice, productCategory, discount, stock } = req.body
  const requiredFields = [productName, productDescription, brand, productRating, productPrice, productCategory, discount, stock];
  const fieldNames = ['Product Name', 'Product Description', 'Product Rating', 'Product Price', 'Product Category', 'Discount', 'Stock'];


  const missingFields = requiredFields
    .map((value, index) => (value?.trim() === "" ? fieldNames[index] : null))
    .filter(field => field !== null);

  if ([productName, productDescription, brand, productRating, productPrice, productCategory, discount, stock].some((value) => value?.trim() === "")) {
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



  if (!thumbNailImage) {
    throw new ApiErrorHandler({
      statusCode: 400,
      errors: ["ThumbNailImage is required"],
      message: "ThumbNailImage is required"
    })
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
      parseInt(productPrice),
      productCategory,
      discount,
      stock,
      brand,
      thumbNail?.secure_url,
      JSON.stringify(productImages.map(img => img?.secure_url))
    ];


    //insert product information in the database
    const productInsertQuery = "INSERT INTO products (ProductName, Description, Rating, Price,Category, Discount, StockQuantity, Brand, ThumbnailImage, Images) VALUES (?,?,?,?,?,?,?,?,?,?)";
    await connection.execute<RowDataPacket[]>(productInsertQuery, values);

    return res.status(200)
      .json({ message: "successfull" })
  } finally {
    connection.release()
  }
})

//Delete product
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiErrorHandler({
      statusCode: 400,
      errors: ["params have not sent."],
      message: "params have not sent."
    })
  }

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
    const checkProductPresentInDBQuery = "SELECT * FROM shopnow.products WHERE ProductID = ?;";
    const [checkProductPresentInDB] = await connection.execute<RowDataPacket[]>(checkProductPresentInDBQuery, [id]);


    if (!checkProductPresentInDB || checkProductPresentInDB?.length === 0) {
      throw new ApiErrorHandler({
        statusCode: 404,
        errors: ["Product not found."],
        message: "Product not found."
      })
    }


    const deleteProductQuery = "DELETE FROM shopnow.products WHERE ProductID= ?;";
    const deleteProduct = await connection.execute<RowDataPacket[]>(deleteProductQuery, [id]);
    return res.status(200)
      .json({
        success: true,
        message: "Product deleted successfully.",
        data: deleteProduct
      })

  } finally {
    connection.release()
  }
})

//Edit product
export const editProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { productName = null,
    productDescription = null,
    productRating = null,
    productPrice = null,
    discount = null,
    stock = null,
    brand = null,
    productCategory = null } = req.body;

  if (!id) {
    throw new ApiErrorHandler({
      statusCode: 400,
      errors: ["params have not sent."],
      message: "params have not sent."
    })
  }

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
    const checkProductPresentInDBQuery = "SELECT * FROM products WHERE ProductID= ?;";
    const [checkProductPresentInDB] = await connection.execute<RowDataPacket[]>(checkProductPresentInDBQuery, [id]);
    if (!checkProductPresentInDB || checkProductPresentInDB.length === 0) {
      throw new ApiErrorHandler({
        statusCode: 404,
        errors: ["Product not found."],
        message: "Product not found."
      })
    }

    const updateProductInfoQuery = "UPDATE productS SET ProductName=?, Description=?, Rating=?, Price=?, Discount=?, StockQuantity=?, Brand=?, Category=? WHERE ProductID= ?;";
    const [updateProductInfo] = await connection.execute<RowDataPacket[]>(updateProductInfoQuery, [productName, productDescription, productRating, productPrice, discount, stock, brand, productCategory, id]);

    return res.status(200)
      .json({
        success: true,
        message: "Product information Updated successfully.",
        data: updateProductInfo
      })
  } finally {
    connection.release();
  }
})