import path from "path";
import express from "express";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const client = new S3Client({
  region: "default",
  endpoint: process.env.LIARA_ENDPOINT,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY,
    secretAccessKey: process.env.LIARA_SECRET_KEY,
  },
});

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

// const bucketStorage = async ({ filename, path }) => {
//   const content = fs.readFileSync(path);

//   const params = {
//     Bucket: process.env.LIARA_BUCKET_NAME,
//     Body: content,
//     Key: filename,
//   };

//   return await client.send(new PutObjectCommand(params));
// };

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (!req.file) {
      return res.status(400).send({ message: "No image file provided" });
    }
    
    if (err) {
      res.status(400).send({ message: err.message });
    } else {
      res.status(200).send({
        message: "Image uploaded successfully",
        image: req.file.filename,
      });
      // store image into server bucket
      // bucketStorage(req.file)
      //   .then((response) => {
      //     res.status(200).send({
      //       message: "Image uploaded successfully",
      //       image: req.file.filename,
      //     });
      //   })
      //   .catch((error) => {
      //     fs.unlink(req.file.path, (err) => {
      //       if (err) {
      //         console.error(`Error removing file: ${err}`);
      //       }
      //       res.status(400).send({ message: "No image file provided" });
      //     });
      //   });      
    }
  });
});

export default router;