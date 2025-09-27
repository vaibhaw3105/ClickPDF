
import express from "express";
import multer from "multer";
import { imagesToPdf } from "../controllers/convert.controllers.js";
// import { convertPdfsToImages } from "../controllers/pdfToImages.controllers.js";
import { log } from "console";
import { mergePDFs } from "../controllers/mergePDF.controllers.js";
import { splitPDF } from "../controllers/splitPDF.controllers.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });
router.post("/images-to-pdf", upload.array("images"), imagesToPdf);


router.post("/merge/pdfs", upload.array("pdfs"), mergePDFs);
router.post("/split/pdf", upload.array("pdf"), splitPDF);


//convertPdfsToImages
export default router;

// http://localhost:5000/api/convert/pdfs-to-images