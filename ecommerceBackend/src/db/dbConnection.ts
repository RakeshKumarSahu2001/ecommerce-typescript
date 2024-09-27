import mysql from "mysql2/promise";
import { authTableCreationQuery, dbCreationQuery } from "../models/user.model";

const dbConnection = async () => {
    try {
        const pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT),
            password: process.env.DB_PASSWORD
        })
        const connection = await pool.getConnection();
        console.log("database connected successfully");

        // Create schema if it doesn't exist
        await connection.query(dbCreationQuery);

        // Create table if it doesn't exist
        await connection.query(authTableCreationQuery);

        // relese the connection
        connection.release()
        return pool;
    } catch (err) {
        console.log("SQL connection Failed", err);
        process.exit()
    }
}

export default dbConnection;