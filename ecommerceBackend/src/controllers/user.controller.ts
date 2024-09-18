import { RowDataPacket } from "mysql2";
import dbConnection from "../dbConnection";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const SignUp = async (req: Request, res: Response) => {
    try {
        // collect user request
        const { email, password } = req.body;
        const connectionPool = await dbConnection();
        const connection = await connectionPool.getConnection()
        if (!connection) {
            return res.status(500).json({ error: "Database not connected yet",msg:"Database Connection error" });
        }
        console.log("Database connection exists");

         //Query to check tables exist or not
        const [tablesRow] = await connection.query<RowDataPacket[]>("SHOW TABLES;")
        if (tablesRow.length === 0) {
            return res.status(500).json({ error: "Table 'authtable' does not exist" });
        }

        // check user has already registered
        let sql = "SELECT authId,email FROM `authtable` WHERE `email` = ?";
        const [isUserExist] = await connection.execute<RowDataPacket[]>(sql, [email]);

        if (isUserExist.length > 0) {
            return res.status(409).json({ error: "already registered user", message: "User already exists." })
        }

        //Hash the password before inserting into the db
        const hash=await bcrypt.hash(password,10)
        let insert="INSERT INTO `authtable` (`email`,`password`) VALUES (?,?)";
        const [result,field]=await connection.execute(insert,[email,hash]);

        return res.status(201).json({data: {result,field}, msg: "Data inserted successfully"})
    } catch (err) {
        // console.error("Error occurred: ", err);
        res.status(500).json({ error: "Failed to register",msg:"Server issue please try again." });
    }
};
