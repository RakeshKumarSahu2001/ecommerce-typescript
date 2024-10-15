import { Router } from "express";
import { addNewProduct } from "../controllers/admin.controller";


const router=Router();


import { upload } from "../middlewares/multer.middleware";
router.route("/add-new-product").post(upload.fields([
    {
        name:"thumbNailImage",
        maxCount:1
    },
    {
        name:"images",
        maxCount:3
    },
]),
    addNewProduct)


export default router;