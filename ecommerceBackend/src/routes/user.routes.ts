import { Router } from "express";
import { addProductToCart, fetchAllProducts, fetchProductById, fetchUserProfileById, insertUserInfoById, Login, Logout, refreshAccessToken, SignUp } from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/register").post(SignUp)

router.route("/login").post(Login)
router.route("/logout").post(verifyJWT, Logout)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/fetch-all-products").get(verifyJWT, fetchAllProducts)

router.route("/fetch-product-by-id/:id").get(verifyJWT, fetchProductById)

router.route("/add-user-profile-info/:id").post(insertUserInfoById)
router.route("/fetch-user-profile-info/:id").get(fetchUserProfileById)

router.route("/add-product-to-cart").post(addProductToCart)

export default router