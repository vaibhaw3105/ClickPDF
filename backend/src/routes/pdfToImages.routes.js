import express from "express";
import { pdfToImages, upload } from "../controllers/pdfToImages.controllers.js";

const router = express.Router();

// Upload multiple PDFs and convert
router.post("/pdf-to-jpg", upload.array("pdfs"), pdfToImages);

export default router;
