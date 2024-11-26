import { RowDataPacket } from "mysql2";
import dbConnection from "../db/dbConnection";
import ApiErrorHandler from "../utils/ApiErrorHandler";
import asyncHandler from "../utils/asyncHandler";



export const isAuthenicateToAccessTheRoute = asyncHandler(async (req, res, next) => {
  const user = req.user
  const pool = await dbConnection();
  const connection = await pool.getConnection()
  if (!connection) {
    throw new ApiErrorHandler({
      statusCode: 500,
      errors: ["Database connection failed during role validation."],
      message: "Database connnection error"
    })
  }
  try {
    const sql = 'SELECT Role FROM `authtable` WHERE `ID` = ? ';

    const [rows] = await connection.execute<RowDataPacket[]>(sql, [user?.id]);

    if (rows[0].Role !== "admin") {
      throw new ApiErrorHandler({
        statusCode: 400,
        errors: ["Not Autherized to access this route."],
        message: "Access Denied."
      })
    }
    next()

  } catch (err) {
    throw new ApiErrorHandler({
      statusCode: 401,
      message: "Normal user can't access this route",
      errors: ["Normal user can't access this route"]
    })
  } finally {
    connection.release()
  }

})

