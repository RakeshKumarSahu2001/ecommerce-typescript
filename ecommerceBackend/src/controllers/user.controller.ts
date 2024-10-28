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
    // console.log("email and password", email, password);
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
        // console.log("rows=", rows);
        if (rows.length > 0) {
            throw new ApiErrorHandler({ statusCode: 409, errors: ["User already exist."], message: "You have already registered berfore." })
            // return res.status(409).json({ error: "already registered user", message: "User already exists." })
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
    // console.log("body=", body);

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
        // console.log("user=", user)
        if (user.length === 0) {
            throw new ApiErrorHandler({ statusCode: 404, errors: ["User not found"], message: "User not found" })
        }

        //fetch the records if user exist
        const userInfoQuery = "SELECT * FROM `authtable` WHERE `Email` = ?";
        const [rows] = await connection.query<RowDataPacket[]>(userInfoQuery, [body.email]);
        // console.log("line no 94", rows)
        // Check if user exists
        if (rows.length === 0) {
            throw new ApiErrorHandler({
                statusCode: 404,
                errors: ["User not found"],
                message: "The email provided does not match any user."
            });
        }
        // console.log("row values",rows[0].id)



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
        // console.log("Access and Refresh Token", refreshToken, accessToken)

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
                    email: rows[0].Email
                }
            })

    } finally {
        connection.release()
    }
})

// User Logout
export const Logout = asyncHandler(async (req, res) => {
    console.log("server hello")
    const user = req.user
    console.log("logout", user)
    //update the refreshtoken field
    //delete the cookies
    const pool = await dbConnection();
    const connection = await pool.getConnection();

    if (!connection) {
        throw new ApiErrorHandler({ statusCode: 500, errors: ["Database connection not found while logout"], message: "Database connnection error" })
    }

    try {
        const updateRefreshTokenQuery = "UPDATE `authtable` SET RefreshToken = ? WHERE `ID`=?";
        await connection.execute(updateRefreshTokenQuery, [null, user?.id]);
        const options = {
            httpOnly: true,
            secure: true
        }
        return res.status(200).clearCookie("RefreshToken", options).clearCookie("AccessToken", options).json({ message: "got the res" })
    } finally {
        connection.release()
    }
})


//Update token
export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.RefreshToken || req.header("Authorization")?.split(" ")[1];

    // console.log("incoming refreshtoken", incomingRefreshToken)

    if (!incomingRefreshToken) {
        throw new ApiErrorHandler({ statusCode: 401, errors: ["unautherized request at refresh token"], message: "Unauthorzed request" })
    }

    const info = jwt.verify(incomingRefreshToken, String(process.env.REFRESH_TOKEN_SECRETE))

    // console.log("info", info)

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

        // console.log("rows =", rows[0]?.Email)


        if (!rows || rows[0]?.Email != (info as JwtPayload)?.email) {
            throw new ApiErrorHandler({ statusCode: 401, errors: ["user not exist"], message: "user not exist" })
        }

        const refreshQuery = "SELECT `RefreshToken` FROM `authtable` WHERE `ID` = ?"
        const [dbrefreshtoken] = await connection.execute<RowDataPacket[]>(refreshQuery, [String((info as JwtPayload).id)])
        // console.log("dbrefreshtoken", dbrefreshtoken[0].RefreshToken);

        if (!dbrefreshtoken || dbrefreshtoken.length === 0 || dbrefreshtoken[0].RefreshToken != incomingRefreshToken) {
            throw new ApiErrorHandler({
                statusCode: 401,
                errors: ["invalid user tries to refresh the token.", "Refresh token is expired or used"],
                message: "invalid user tries to refresh the token."
            })
        }

        const { refreshToken, accessToken } = await ServerCookieGenerator((info as JwtPayload).id, (info as JwtPayload).email, (info as JwtPayload).role);
        // console.log("updated token",refreshToken)
        //update refresh token in the database
        const updateRefreshTokenQuery = "UPDATE `authtable` SET `RefreshToken` = ? WHERE `ID` = ?";

        await connection.execute(updateRefreshTokenQuery, [refreshToken, (info as JwtPayload).id])

        return res.cookie("RefreshToken", refreshToken, secureCookieOption)
            .cookie("accessToken", accessToken, secureCookieOption).json({ message: "Token Updated Successfully." })
    } finally {
        connection.release()
    }

})

// Edit user profile
// export const editUserProfile=asyncHandler(async(req,res)=>{

// })


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
        if (allProductRecords.length === 0) {
            throw new ApiErrorHandler({ statusCode: 404, errors: ["No product record present"], message: "No product record present" })
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
        // console.log("line no 296",productId)
        const [rows] = await connection.execute<RowDataPacket[]>(fetchProductUsingIdQuery, [productId])

        // console.log("fetched product details on line no 300", rows)
        if (!rows || rows.length === 0) {
            throw new ApiErrorHandler({
                statusCode: 404,
                errors: ["Product record not found"],
                message: "Product record not found"
            })
        }

        // console.log("rows information=", rows)
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


