import express from "express";
import multer from "multer";
import { compressImage } from "../controllers/compressImage.controllers.js";
// import { pdfToImages, upload } from "../controllers/pdfToImages.controllers.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Upload multiple PDFs and convert
router.post("/compress", upload.single("image"), compressImage);

export default router;
