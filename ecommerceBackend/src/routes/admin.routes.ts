import { Router } from "express";
import { addNewProduct } from "../controllers/admin.controller";


const router=Router();


import { upload } from "../middlewares/multer.middleware";
router.route("/add-new-product").post(upload.fields([
    {
        name:"mainImage",
        maxCount:1
    },
    {
        name:"image1",
        maxCount:1
    },
    {
        name:"image2",
        maxCount:1
    },
    {
        name:"image3",
        maxCount:1
    }
]),
    addNewProduct)


export default router;