// controllers/mergePDF.controllers.js
import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";

export const mergePDFs = async (req, res) => {
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).json({ error: "Please upload at least 2 PDF files." });
    }

    // Create a new PDF
    const mergedPdf = await PDFDocument.create();

    for (const file of req.files) {
      const fileBuffer = fs.readFileSync(file.path); // read uploaded file
      const pdf = await PDFDocument.load(fileBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));

      // Delete temp file after reading
      fs.unlinkSync(file.path);
    }

    const mergedPdfBytes = await mergedPdf.save();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="merged.pdf"',
    });

    return res.send(Buffer.from(mergedPdfBytes));
  } catch (error) {
    console.error("Error merging PDFs:", error);
    res.status(500).json({ error: "Failed to merge PDFs" });
  }
};
