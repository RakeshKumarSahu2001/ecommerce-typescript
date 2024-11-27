import asyncHandler from "../utils/asyncHandler";
import bcrypt from "bcrypt";
import ApiErrorHandler from "../utils/ApiErrorHandler";
import dbConnection from "../db/dbConnection";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import jwt, { Algorithm, JwtPayload } from "jsonwebtoken";


const secureCookieOption = { secure: true, httpOnly: true, }

// User Signup
export const SignUp = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if ([email, password].some((value) => value?.trim() === "")) {
        throw new ApiErrorHandler({ statusCode: 400, errors: ["All field are nessary for signup"], message: "For Signup You Have To Add Your Email and Password In The Input Field" })
    }

    const pool = await dbConnection()
    const connection = await pool.getConnection()
    if (!connection) {
        throw new ApiErrorHandler({ statusCode: 500, errors: ["Database connection not found while signup"], message: "Database connnection error" })
    }

    try {
        //check the user exist or not
        const checkUserExist = 'SELECT Email FROM `authtable` WHERE `Email` = ?';
        const [rows] = await connection.execute<RowDataPacket[]>(checkUserExist, [email]);

        if (rows.length > 0) {
            throw new ApiErrorHandler({
                statusCode: 409,
                errors: ["User already exist."],
                message: "You have already registered berfore."
            })
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //insert into database
        const insertQuery = 'INSERT INTO `authtable`(`Email`, `Password`) VALUES (?, ?)';
        const [result] = await connection.execute<ResultSetHeader>(insertQuery, [email, hashedPassword]);

        return res.status(200).json({
            message: "User registered successfully",
            success: true,
            data: { id: result.insertId, email: email }
        })

    } finally {
        connection.release()
    }
})

//generate cookie
async function ServerCookieGenerator(id: string, email: string, role: string) {
    try {
        const refreshToken = await jwt.sign({ id: id, email: email, role: role },
            String(process.env.REFRESH_TOKEN_SECRETE),
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY, algorithm: process.env.TOKEN_ALGO_TYPE as Algorithm })

        const accessToken = await jwt.sign({ id: id, email: email }, String(process.env.ACCESS_TOKEN_SECRETE), { expiresIn: process.env.REFRESH_TOKEN_EXPIRY, algorithm: process.env.TOKEN_ALGO_TYPE as Algorithm })

        return { refreshToken, accessToken }
    } catch (err) {
        throw new ApiErrorHandler({ statusCode: 500, errors: ["Error in Access and Refresh token generation"], message: "Token Generation error" })
    }
}

// User Login
export const Login = asyncHandler(async (req, res) => {
    const body = req.body;

    //check email and password is present or not
    if (body.email?.trim() === "" || body.password.trim() === "") {
        throw new ApiErrorHandler({
            statusCode: 400,
            errors: ["all fields are required for login"],
            message: "For Login You Have To Add Your Email and Password In The Input Field"
        })
    }
    const pool = await dbConnection();
    const connection = await pool.getConnection();
    if (!connection) {
        throw new ApiErrorHandler({
            statusCode: 500,
            errors: ["Database connection not found while login"],
            message: "Database connnection error"
        })
    }

    try {
        //Check user exist or not
        const checkUserExist = "SELECT Email FROM `authtable` WHERE `Email` = ?";
        const [user] = await connection.query<RowDataPacket[]>(checkUserExist, [body.email]);

        if (!user || user.length === 0) {
            throw new ApiErrorHandler({
                statusCode: 404,
                errors: ["User not found"],
                message: "User not found"
            })
        }

        //fetch the records if user exist
        const userInfoQuery = "SELECT * FROM `authtable` WHERE `Email` = ?";
        const [rows] = await connection.query<RowDataPacket[]>(userInfoQuery, [body.email]);

        // Check if user exists
        if (rows.length === 0) {
            throw new ApiErrorHandler({
                statusCode: 404,
                errors: ["User not found"],
                message: "The email provided does not match any user."
            });
        }



        //Check the user validation
        const isValid = await bcrypt.compare(body.password, String(rows[0].Password))
        if (!isValid) {
            throw new ApiErrorHandler({
                statusCode: 401,
                errors: ["Invalid user"],
                message: "Invalid username and password"
            })
        }

        // generate cookie
        const { refreshToken, accessToken } = await ServerCookieGenerator(rows[0].ID, rows[0].Email, rows[0].Role)

        //insert refresh token in db
        const tokenInsertionQuery = "UPDATE authtable SET RefreshToken = ? WHERE Email = ?"
        await connection.query<ResultSetHeader>(tokenInsertionQuery, [refreshToken, rows[0].Email])

        return res.cookie("RefreshToken", refreshToken, secureCookieOption)
            .cookie("AccessToken", accessToken, secureCookieOption)
            .status(200)
            .json({
                success: true,
                message: "user found",
                data: {
                    id: rows[0].ID,
                    email: rows[0].Email,
                    Role: rows[0].Role
                }
            })

    } finally {
        connection.release()
    }
})

// User Logout
export const Logout = asyncHandler(async (req, res) => {
    const user = req.user
    //update the refreshtoken field
    //delete the cookies
    const pool = await dbConnection();
    const connection = await pool.getConnection();

    if (!connection) {
        throw new ApiErrorHandler({
            statusCode: 500,
            errors: ["Database connection not found while logout"],
            message: "Database connnection error"
        })
    }

    try {
        const updateRefreshTokenQuery = "UPDATE `authtable` SET RefreshToken = ? WHERE `ID`=?";
        await connection.execute(updateRefreshTokenQuery, [null, user?.id]);
        const options = {
            httpOnly: true,
            secure: true
        }
        return res.status(200)
            .clearCookie("RefreshToken", options)
            .clearCookie("AccessToken", options)
            .json({ message: "got the res" })
    } finally {
        connection.release()
    }
})

//Update token
export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.RefreshToken || req.header("Authorization")?.split(" ")[1];

    if (!incomingRefreshToken) {
        throw new ApiErrorHandler({ statusCode: 401, errors: ["unautherized request at refresh token"], message: "Unauthorzed request" })
    }

    const info = jwt.verify(incomingRefreshToken, String(process.env.REFRESH_TOKEN_SECRETE))

    if (!info) {
        throw new ApiErrorHandler({ statusCode: 401, errors: ["unautherized request at refresh token"], message: "Cant generate token no user info" })
    }

    const pool = await dbConnection();
    const connection = await pool.getConnection();
    if (!connection) {
        throw new ApiErrorHandler({ statusCode: 500, errors: ["Database connection failed while refreshing the tokens."], message: "Database connection failed while refreshing the tokens." })
    }


    try {
        const userFindQuery = "SELECT `Email` FROM `authtable` WHERE ID=?"
        const [rows] = await connection.execute<RowDataPacket[]>(userFindQuery, [String((info as JwtPayload).id)])

        if (!rows || rows[0]?.Email != (info as JwtPayload)?.email) {
            throw new ApiErrorHandler({ statusCode: 401, errors: ["user not exist"], message: "user not exist" })
        }

        const refreshQuery = "SELECT `RefreshToken` FROM `authtable` WHERE `ID` = ?"
        const [dbrefreshtoken] = await connection.execute<RowDataPacket[]>(refreshQuery, [String((info as JwtPayload).id)])

        if (!dbrefreshtoken || dbrefreshtoken.length === 0 || dbrefreshtoken[0].RefreshToken != incomingRefreshToken) {
            throw new ApiErrorHandler({
                statusCode: 401,
                errors: ["invalid user tries to refresh the token.", "Refresh token is expired or used"],
                message: "invalid user tries to refresh the token."
            })
        }

        const { refreshToken, accessToken } = await ServerCookieGenerator((info as JwtPayload).id, (info as JwtPayload).email, (info as JwtPayload).role);

        //update refresh token in the database
        const updateRefreshTokenQuery = "UPDATE `authtable` SET `RefreshToken` = ? WHERE `ID` = ?";

        await connection.execute(updateRefreshTokenQuery, [refreshToken, (info as JwtPayload).id])

        return res.cookie("RefreshToken", refreshToken, secureCookieOption)
            .cookie("accessToken", accessToken, secureCookieOption)
            .json({ message: "Token Updated Successfully." })
    } finally {
        connection.release()
    }

})

// Fetch all products
export const fetchAllProducts = asyncHandler(async (req, res) => {
    const pool = await dbConnection();
    const connection = await pool.getConnection();
    if (!connection) {
        throw new ApiErrorHandler({
            statusCode: 500,
            errors: ["Database connection not found while signup"],
            message: "Database connnection error"
        })
    }

    try {
        const fetchAllProductRecordQuery = "SELECT * FROM `products`;";
        const [allProductRecords] = await connection.execute<RowDataPacket[]>(fetchAllProductRecordQuery)
        if (!allProductRecords || allProductRecords.length === 0) {
            throw new ApiErrorHandler({
                statusCode: 404,
                errors: ["No product record present"],
                message: "No product record present"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Products records fetched successfully",
            data: {
                products: allProductRecords
            }
        })
    } finally {
        connection.release()
    }
})

// Fetch product by id
export const fetchProductById = asyncHandler(async (req, res) => {
    const params = req.params
    if (!params) {
        throw new ApiErrorHandler({ statusCode: 400, errors: ["Params is not present."], message: "Params is not present." })
    }
    const pool = await dbConnection();
    const connection = await pool.getConnection();
    if (!connection) {
        throw new ApiErrorHandler({
            statusCode: 500,
            errors: ["Database connection not found while signup"],
            message: "Database connnection error"
        });
    }

    try {
        const fetchProductUsingIdQuery = "SELECT * FROM `products` WHERE `ProductID`=?;"
        const productId = params.id
        const [rows] = await connection.execute<RowDataPacket[]>(fetchProductUsingIdQuery, [productId])

        if (!rows || rows.length === 0) {
            throw new ApiErrorHandler({
                statusCode: 404,
                errors: ["Product record not found"],
                message: "Product record not found"
            })
        }

        return res.status(200)
            .json({
                success: true,
                message: "Product record found.",
                data: {
                    product: rows
                }
            })
    } finally {
        connection.release()
    }
})

// insert user profile
export const insertUserInfoById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { FullName, Phone, Street, PostalCode, City, State, Country, DateOfBirth, Gender } = req.body;

    const pool = await dbConnection();
    const connection = await pool.getConnection();

    if (!connection) {
        throw new ApiErrorHandler({
            statusCode: 500,
            errors: ["Database connection not found while fetching the user information."],
            message: "Database connnection error"
        })
    }

    try {
        const checkUserHasProfInfoQuery = "SELECT `FullName`,`Phone`,`Street`,`City`,`State` FROM `user` WHERE AuthID = ?;";
        const [checkUserHasProfInfo] = await connection.execute<RowDataPacket[]>(checkUserHasProfInfoQuery, [id])
        // update user profile info if user already exist

        if (checkUserHasProfInfo.length > 0) {
            throw new ApiErrorHandler({
                statusCode: 400,
                errors: ["User info alredy exist."],
                message: "User info alredy exist."
            })
        }

        const updateUserInfo = "INSERT INTO `user` (`FullName`,`Phone`,`Street`,`City`,`State`,`Country`,`PostalCode`,`DateOfBirth`,`Gender`,`AuthID`) VALUES (?,?,?,?,?,?,?,?,?,?);";
        await connection.execute<RowDataPacket[]>(updateUserInfo, [FullName, Phone, Street, City, State, Country, PostalCode, DateOfBirth, Gender, id]);

        return res.status(200)
            .json({
                message: "Data inserted successfully",
                success: true,
                data: { FullName, Phone, Street, City, State, Country, PostalCode, DateOfBirth, Gender }
            })
    } finally {
        connection.release()
    }

})

// Fetch user profile
export const fetchUserProfileById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiErrorHandler({
            statusCode: 403,
            errors: ["Params is not present."],
            message: "Params is not present."
        })
    }

    const pool = await dbConnection();
    const connection = await pool.getConnection()
    if (!connection) {
        throw new ApiErrorHandler({
            statusCode: 500,
            errors: ["Database connection not found while fetching the user information."],
            message: "Database connnection error"
        })
    }

    try {
        const fetchUserProfileUsingForeignKey = "SELECT UserID,FullName,Phone,State,Street,City,Country,Gender,PostalCode,DateOfBirth FROM user  INNER JOIN authtable ON user.AuthID=authtable.ID WHERE authtable.ID=?;";
        const [rows] = await connection.execute<RowDataPacket[]>(fetchUserProfileUsingForeignKey, [id])

        if (!rows || rows.length == 0) {
            throw new ApiErrorHandler({
                statusCode: 404,
                errors: ["User record not found"],
                message: "User record not found"
            })
        }
        return res.status(200)
            .json({
                success: true,
                message: "User record found.",
                data: rows[0]
            })
    } finally {
        connection.release()
    }
})

//Edit user info by id
export const editUserInfoById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
        FullName,
        Phone = null,
        Street = null,
        PostalCode = null,
        City = null,
        State = null,
        Country = null,
        DateOfBirth = null,
        Gender = null } = req.body;

    if (!id) {
        throw new ApiErrorHandler({
            statusCode: 403,
            errors: ["Params is not present."],
            message: "Params is not present."
        })
    }

    const pool = await dbConnection();
    const connection = await pool.getConnection()
    if (!connection) {
        throw new ApiErrorHandler({
            statusCode: 500,
            errors: ["Database connection not found while fetching the user information."],
            message: "Database connnection error"
        })
    }
    try {
        const fetchUserInfoByIdQuery = "SELECT * FROM shopnow.user WHERE UserID=?;";
        const [userInfo] = await connection.execute<RowDataPacket[]>(fetchUserInfoByIdQuery, [id]);
        if (!userInfo) {
            throw new ApiErrorHandler({
                statusCode: 404,
                errors: ["User profile information not found."],
                message: "User profile information not found."
            })
        }

        const updateUserInfoByIdQuery = "UPDATE shopnow.user SET FullName=?,Phone=?,Street=?,City=?,State=?,Country=?,PostalCode=?,DateOfBirth=?,Gender=? WHERE AuthID=?";
        await connection.execute<RowDataPacket[]>(updateUserInfoByIdQuery, [FullName, Phone, Street, City, State, Country, PostalCode, DateOfBirth, Gender, id]);

        return res.status(200)
            .json({
                success: true,
                message: "Successfully updated the user info.",
                data: userInfo
            })

    } finally {
        connection.release();
    }
})

//add product to cart
export const addProductToCart = asyncHandler(async (req, res) => {
    const { productID, quantity, AuthID } = req.body;

    if (!productID || !quantity || !AuthID) {
        throw new ApiErrorHandler({
            statusCode: 404,
            message: "All fields are required",
            errors: ["All fields are required"]
        })
    }

    const pool = await dbConnection();
    const connection = await pool.getConnection()
    if (!connection) {
        throw new ApiErrorHandler({
            statusCode: 500,
            errors: ["Database connection not found while adding the product into the cart."],
            message: "Database connnection error"
        })
    }

    try {
        const theProductExistInUserCartQuery = "SELECT * FROM cart WHERE ProductID=? AND AuthID=?;";
        const [theProductExistInUserCart] = await connection.execute<RowDataPacket[]>(theProductExistInUserCartQuery, [productID, AuthID]);

        if (theProductExistInUserCart.length > 0) {
            //change quantity or throw error
            const updateCartProductQuantityQuery = "UPDATE cart SET Quantity=? WHERE ProductID=? AND AuthID=?;";
            await connection.execute<RowDataPacket[]>(updateCartProductQuantityQuery, [theProductExistInUserCart[0]?.Quantity + 1, productID, AuthID]);

            return res.status(200).json({
                success: true,
                message: "Cart updated successfully",
                data: { productID }
            });
        }

        const addProductToCartQuery = "INSERT INTO cart (Quantity,ProductID,AuthID) VALUES (?,?,?);";
        await connection.execute<RowDataPacket[]>(addProductToCartQuery, [quantity, productID, AuthID]);


        res.status(200)
            .json({
                success: true,
                message: "Data fetched successfullt.",
                data: {}
            })
    } finally {
        connection.release();
    }

})

//fetch all cart product
export const fetchProductsInCart = asyncHandler(async (req, res) => {
    const AuthID  = req.params.id;

    if (!AuthID) {
        throw new ApiErrorHandler({
            statusCode: 404,
            message: "Auth id is required.",
            errors: ["Auth id is required."]
        })
    }
    const pool = await dbConnection();
    const connection = await pool.getConnection()
    if (!connection) {
        throw new ApiErrorHandler({
            statusCode: 500,
            errors: ["Database connection not found while adding the product into the cart."],
            message: "Database connnection error"
        })
    }

    try {
        const fetchAllCartProductQuery = "SELECT CartID,Quantity,ProductName,Rating,Price,Category,Discount,Brand,ThumbnailImage FROM shopnow.cart INNER JOIN shopnow.authtable ON authtable.ID=cart.AuthID INNER JOIN shopnow.products ON cart.ProductID=products.ProductID WHERE cart.AuthID=?;"
        const [fetchAllCartProduct] = await connection.execute<RowDataPacket[]>(fetchAllCartProductQuery, [AuthID]);
        
        if(!fetchAllCartProduct || fetchAllCartProduct.length===0){
            throw new ApiErrorHandler({
                statusCode:404,
                message:"No record is present in the cart.",
                errors:["No record is present in the cart."]
            })
        }

        return res.status(200)
            .json({
                message: "Cart data fetched successfully.",
                success: true,
                data: fetchAllCartProduct
            })
    } finally {
        connection.release();
    }
})

//delete product from cart
export const deleteProductFromCart = asyncHandler(async (req, res) => {
    const {id} = req.params;
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
        const productPresentInCartQuery = "SELECT * FROM cart WHERE CartID=?;";
        const [productPresentInCart] = await connection.execute<RowDataPacket[]>(productPresentInCartQuery, [id]);
        if (!productPresentInCart || productPresentInCart.length === 0) {
            throw new ApiErrorHandler({
                statusCode: 404,
                errors: ["Product is not present in cart."],
                message: "Product is not present in cart."
            })
        }

        const deleteProductFromCartQuery = "DELETE FROM cart WHERE CartID=?;";
        const [deleteProductFromCart] = await connection.execute<RowDataPacket[]>(deleteProductFromCartQuery, [id]);
        return res.status(200)
            .json({
                success: true,
                message: "Product is deleted successfully.",
                data: deleteProductFromCart
            })
    } finally {
        connection.release();
    }
})



