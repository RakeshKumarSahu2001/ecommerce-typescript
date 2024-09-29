import { Router } from "express";
import { Login, SignUp } from "../controllers/user.controller";

const router=Router();

router.route("/register").post(SignUp)

router.route("/login").post(Login)

export default router