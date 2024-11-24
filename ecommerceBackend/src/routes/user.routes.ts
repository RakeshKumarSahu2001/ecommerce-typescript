import { Router } from "express";
import { addProductToCart, editUserInfoById, fetchAllProducts, fetchProductById, fetchUserProfileById, insertUserInfoById, Login, Logout, refreshAccessToken, SignUp } from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/register").post(SignUp)

router.route("/login").post(Login)
router.route("/logout").post(verifyJWT, Logout)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/fetch-all-products").get(verifyJWT, fetchAllProducts)

router.route("/fetch-product-by-id/:id").get(verifyJWT, fetchProductById)

router.route("/add-user-profile-info/:id").post(verifyJWT,insertUserInfoById)
router.route("/fetch-user-profile-info/:id").get(verifyJWT,fetchUserProfileById)
router.route("/edit-user-info-by-id/:id").put(verifyJWT,editUserInfoById)

router.route("/add-product-to-cart").post(addProductToCart)

export default router