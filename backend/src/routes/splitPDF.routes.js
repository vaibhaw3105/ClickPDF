import express from "express";
import multer from "multer";
import { splitPDF } from "../controllers/splitPDF.controllers.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/split/pdf", upload.single("pdf"), splitPDF);

export default router;