import { RowDataPacket } from "mysql2";
import dbConnection from "../db/dbConnection";
import ApiErrorHandler from "../utils/ApiErrorHandler";
import asyncHandler from "../utils/asyncHandler";



export const isAuthenicateToAccessTheRoute=asyncHandler(async(req,res,next)=>{
    const user = req.user
    console.log("user info",user)
    const pool=await dbConnection();
    const connection=await pool.getConnection()
    if(!connection){
        throw new ApiErrorHandler({ statusCode: 500, errors: ["Database connection failed during role validation."], message: "Database connnection error" })
    }
    try {
        const sql = 'SELECT role FROM `authtable` WHERE `id` = ? ';
      
        const [rows, fields] = await connection.execute<RowDataPacket[]>(sql, [user?.id]);
        console.log("on role middleware",rows);
        console.log("on role middleware",fields);
        // if(user?.email=="lucifer@gmail.com"){
        //     throw new ApiErrorHandler({statusCode:400,errors:["hi lucifer u cant access this route"],message:"hi lucifer u cant access this route"})
        // }
        if(rows[0].role!=="admin"){
            throw new ApiErrorHandler({statusCode:400,errors:["Not Autherized to access this route."],message:"Access Denied."})
        }
        next()

      }finally{
        connection.release()
      }

})

