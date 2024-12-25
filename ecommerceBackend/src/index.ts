import dotenv from "dotenv";
import dbConnection from "./db/dbConnection";
import app from "./app";
import { availableParallelism } from "os";
import cluster from "cluster"; 

dotenv.config({path:"./.env"});


dbConnection()
.then(()=>{
    const numCpus=availableParallelism();

    if(cluster.isPrimary){
        console.log(`primary ${process.pid} is running`);
        for(let i=0;i<numCpus;i++){
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
            cluster.fork();
          });
    }else{

        app.listen(process.env.SERVER_PORT || 3000,()=>{
            console.log("listening port")
        })
    }
})
.catch((err)=>{
    console.log("Database connection error",err)
    process.exit(1)
})
