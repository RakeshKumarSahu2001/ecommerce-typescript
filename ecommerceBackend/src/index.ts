import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/routes";

dotenv.config({ path: "./.env" });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use("/ecommerce",route)


const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
