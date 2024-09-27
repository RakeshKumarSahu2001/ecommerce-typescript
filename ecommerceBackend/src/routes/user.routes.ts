import { Router } from "express";
import { SignUp } from "../controllers/user.controller";

const router=Router();

router.route("/register").post(SignUp)

export default router