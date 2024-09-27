import asyncHandler from "../utils/asyncHandler";
import bcrypt from "bcrypt";
import ApiErrorHandler from "../utils/ApiErrorHandler";
import dbConnection from "../db/dbConnection";
import { RowDataPacket } from "mysql2";


// User Signup
export const SignUp = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // console.log("email and password", email, password);
    if ([email, password].some((value) => value?.trim() === "")) {
        throw new ApiErrorHandler({ statusCode: 400, errors: ["All field are nessary"], message: "All fieldes are required" })
    }

    const pool = await dbConnection()
    const connection = await pool.getConnection()
    if(!connection){
        throw new ApiErrorHandler({statusCode:500,errors:["Database connection not found"],message:"Database connnection error"})
    }

    try{
    //check the user exist or not
    const checkUserExist = 'SELECT email FROM `authtable` WHERE `email` = ?';
    const [rows] = await connection.execute<RowDataPacket[]>(checkUserExist, [email]);
    // console.log("rows=", rows);
    if (rows.length > 0) {
        throw new ApiErrorHandler({ statusCode: 409, errors: ["User already exist."], message: "You have already registered berfore." })
        // return res.status(409).json({ error: "already registered user", message: "User already exists." })
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //insert into database
    const insertQuery = 'INSERT INTO `authtable`(`email`, `password`) VALUES (?, ?)';
    const [result, fields] = await connection.execute(insertQuery, [email,hashedPassword]);

    // console.log("result after insertion",result,fields)

    return res.status(200).json({
        message: "User registered successfully",
        success:true,
        data:result
    })

}finally{
    connection.release()
}
})


// User Login

export const Login=asyncHandler(async(req,res)=>{
    
})



