import multer from "multer";
import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";
import { exec } from "child_process";

// Configure Multer
const upload = multer({ dest: "uploads/" });

// Convert .docx → PDF using LibreOffice and return actual PDF path
const convertDocxToPDF = (inputPath, outputDir) => {
  return new Promise((resolve, reject) => {
    exec(
      `soffice --headless --convert-to pdf --outdir "${outputDir}" "${inputPath}"`,
      (err, stdout, stderr) => {
        if (err) {
          console.error("LibreOffice error:", stderr);
          return reject(err);
        }

        // Determine the generated PDF filename
        const inputBase = path.basename(inputPath, path.extname(inputPath)); // e.g., "abc123"
        const generatedPdf = path.join(outputDir, `${inputBase}.pdf`);

        if (!fs.existsSync(generatedPdf)) {
          return reject(new Error(`PDF not found: ${generatedPdf}`));
        }

        resolve(generatedPdf);
      }
    );
  });
};

// Controller: Convert Word files to a merged PDF
export const wordToPDF = async (req, res) => {
  try {
    const files = req.files;
    if (!files || !files.length) {
      return res.status(400).json({ error: "No Word files uploaded" });
    }

    const pdfPaths = [];

    // Convert each Word file to PDF
    for (const file of files) {
      const outputDir = path.dirname(file.path);
      const pdfPath = await convertDocxToPDF(file.path, outputDir);
      pdfPaths.push(pdfPath);
    }

    // Merge PDFs
    const mergedPdf = await PDFDocument.create();
    for (const pdfPath of pdfPaths) {
      const pdfBytes = fs.readFileSync(pdfPath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const finalPdfBytes = await mergedPdf.save();

    // Send merged PDF to client
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=merged.pdf",
    });
    res.send(Buffer.from(finalPdfBytes));

    // Cleanup temporary files
    [...files.map(f => f.path), ...pdfPaths].forEach((p) => {
      if (fs.existsSync(p)) fs.unlinkSync(p);
    });

  } catch (err) {
    console.error("Conversion error:", err);
    res.status(500).json({ error: "Conversion failed", details: err.message });
  }
};

// Usage in your routes:
// router.post("/api/word-to-pdf", upload.array("files"), wordToPDF);
