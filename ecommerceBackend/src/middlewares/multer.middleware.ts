import multer from "multer"
import fs from "fs";
import path from "path";


const tempDir=path.join(__dirname,"../public/temp")

// Check if the directory exists, and if not, create it
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir)
  },
  filename: function (req, file, cb) {

    // console.log("multer middleware req", req.body)
    // console.log("multer middleware file", file)

    const uniqueSuffix = Date.now() + '-' + file.fieldname + '-' + file.originalname
    cb(null, uniqueSuffix)
  }
})

export const upload = multer({ storage })