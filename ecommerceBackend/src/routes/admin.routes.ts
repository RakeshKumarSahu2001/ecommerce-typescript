import { Router } from "express";
import { addNewProduct } from "../controllers/admin.controller";


const router = Router();


import { upload } from "../middlewares/multer.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { isAuthenicateToAccessTheRoute } from "../middlewares/role.middleware";
router.route("/add-new-product").post(verifyJWT,isAuthenicateToAccessTheRoute,upload.fields([
    {
        name: "thumbNailImage",
        maxCount: 1
    },
    {
        name: "images",
        maxCount: 3
    },
]),
    addNewProduct)


export default router;