import { Router } from "express";
import { Login, Logout, refreshAccessToken, SignUp } from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router=Router();

router.route("/register").post(SignUp)

router.route("/login").post(Login)
router.route("/logout").post(verifyJWT,Logout)

router.route("/refresh-token").post(refreshAccessToken)

export default router