import mysql from "mysql2/promise";
import { authTableCreationQuery, cartTableCreationQuery, dbCreationQuery, productTableCreationQuery } from "../models/user.model";


const dbConnection = async () => {

    try {
        const pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT),
            password: process.env.DB_PASSWORD,
            // waitForConnections: true,

        })

        const connection = await pool.getConnection();
        console.log("database connected successfully");

        // try {
            // Create schema if it doesn't exist
            await connection.query(dbCreationQuery);
            
            // Create table if it doesn't exist
            await connection.query(authTableCreationQuery);

            // Create table if it doesn't exist
            await connection.query(productTableCreationQuery)

            //create Cart table
            await connection.query(cartTableCreationQuery);
        // } finally {
        //     connection.release()
        // }
        return pool;
    } catch (err) {
        console.log("SQL connection Failed", err);
        process.exit()
    }
}

export default dbConnection;