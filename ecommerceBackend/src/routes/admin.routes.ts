import { Router } from "express";
import { addNewProduct, deleteProduct, editProduct } from "../controllers/admin.controller";
import ZodValidator from "../middlewares/ZodValidator.middleware";

const router = Router();


import { upload } from "../middlewares/multer.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { isAuthenicateToAccessTheRoute } from "../middlewares/role.middleware";
import { ZodProductValidation, ZodUpdateProductValidation } from "../ZodValidatorSchemas/ZodAuthValidator";


router.route("/add-new-product").post(verifyJWT,
    isAuthenicateToAccessTheRoute,
    upload.fields([
        {
            name: "thumbNailImage",
            maxCount: 1
        },
        {
            name: "images",
            maxCount: 3
        },
    ]),
    (req, res, next) => {
        const newProductInfo = {
            ...req.body, productRating: Number(req.body.productRating),
            productPrice: Number(req.body.productPrice),
            discount: Number(req.body.discount),
            stock: Number(req.body.stock),
        }
        req.body = newProductInfo;
        next();
    },
    ZodValidator(ZodProductValidation),
    addNewProduct);

//delete product by id
router.route("/delete-product/:id").delete(verifyJWT,
    isAuthenicateToAccessTheRoute,
    deleteProduct
)

//edit product by id
router.route("/edit-product-by-id/:id").put(verifyJWT,
    isAuthenicateToAccessTheRoute,
    (req, res, next) => {
        const newProductInfo = {
            ...req.body, Rating: Number(req.body.Rating),
            Price: Number(req.body.Price),
            Discount: Number(req.body.Discount),
            StockQuantity: Number(req.body.StockQuantity),
        }
        req.body = newProductInfo;
        next();
    },
    ZodValidator(ZodUpdateProductValidation),
    editProduct
)


export default router;