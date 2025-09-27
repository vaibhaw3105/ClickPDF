import express from "express";
import multer from "multer";
import { wordToPDF } from "../controllers/wordToPDF.controllers.js";

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Route for Word → PDF
router.post("/word-to-pdf", upload.array("files"), wordToPDF);

export default router;
