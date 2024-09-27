import dotenv from "dotenv";
import dbConnection from "./db/dbConnection";
import app from "./app";

dotenv.config({path:"./.env"});

dbConnection()
.then(()=>{
    app.listen(process.env.SERVER_PORT || 3000,()=>{
        console.log("listening port")
    })
})
.catch((err)=>{
    console.log("Database connection error",err)
})
