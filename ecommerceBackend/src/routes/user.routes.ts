import { Router } from "express";
import {
    addProductToCart,
    deleteProductFromCart,
    editUserInfoById,
    fetchAllProducts,
    fetchProductById,
    fetchProductsInCart,
    fetchUserProfileById,
    insertUserInfoById,
    Login,
    Logout,
    refreshAccessToken,
    SignUp,
    validatOTP
} from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import ZodValidator from "../middlewares/ZodValidator.middleware"
import { ZodEmailValidation, ZodLoginValidator, ZodSignupValidator } from "../ZodValidatorSchemas/ZodAuthValidator";


const router = Router();

router.route("/register").post(ZodValidator(ZodSignupValidator), SignUp)
router.route("/verify-otp/:id").post(ZodValidator(ZodEmailValidation), validatOTP)
router.route("/login").post(ZodValidator(ZodLoginValidator), Login)
router.route("/logout").post(verifyJWT, Logout)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/fetch-all-products").get(verifyJWT, fetchAllProducts)
router.route("/fetch-product-by-id/:id").get(verifyJWT, fetchProductById)

router.route("/add-user-profile-info/:id").post(verifyJWT, insertUserInfoById)
router.route("/fetch-user-profile-info/:id").get(verifyJWT, fetchUserProfileById)
router.route("/edit-user-info-by-id/:id").put(verifyJWT, editUserInfoById)

router.route("/add-product-to-cart").post(verifyJWT, addProductToCart)
router.route("/fetch-all-cart-products/:id").get(verifyJWT, fetchProductsInCart)
router.route("/delete-cart-product/:id").delete(verifyJWT, deleteProductFromCart)

export default router