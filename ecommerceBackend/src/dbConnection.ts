import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { authTableCreationQuery, dbCreationQuery } from "./models/user.model";
dotenv.config({ path: "./.env" });

async function dbConnection() {
    try {
        const pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT),
            password: process.env.DB_PASSWORD,
        });

        const connection = await pool.getConnection();
        console.log("Database connected successfully");

        // Create schema if it doesn't exist
        await connection.query(dbCreationQuery);

        // Create table if it doesn't exist
        await connection.query(authTableCreationQuery);

        // Release the connection back to the pool
        connection.release();

        return pool;
    } catch (err) {
        console.error("Failed to connect to the database or create schema/table:", err);
        throw err;
    }
}

export default dbConnection;
