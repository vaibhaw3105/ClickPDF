import express from "express";
import multer from "multer";
import { pngToJPG } from "../controllers/pngToJPG.controllers.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/png-to-jpg", upload.single("image"), pngToJPG);

export default router;
