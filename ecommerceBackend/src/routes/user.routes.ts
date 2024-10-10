import { Router } from "express";
import { Login, Logout, SignUp } from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router=Router();

router.route("/register").post(SignUp)

router.route("/login").post(Login)
router.route("/logout").post(verifyJWT,Logout)

export default router