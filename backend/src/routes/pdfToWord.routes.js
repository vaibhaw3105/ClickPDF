import express from "express";
import { pdfToWord, upload } from "../controllers/pdfToWord.controllers.js";

const router = express.Router();

// Upload multiple PDFs and convert
router.post("/pdf-to-word", upload.array("files"), pdfToWord);

export default router;
