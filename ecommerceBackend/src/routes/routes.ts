import { Router } from "express";
import { SignUp } from "../controllers/user.controller";

const route=Router();
//Auth route
route.post("/reg",SignUp);

export default route;