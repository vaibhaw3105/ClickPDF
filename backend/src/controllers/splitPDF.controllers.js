// import fs from "fs";
// import { PDFDocument } from "pdf-lib";
// import archiver from "archiver";

// // Helper to split PDF by custom ranges
// const splitByCustomRanges = async (pdfBuffer, ranges) => {
//     const originalPdf = await PDFDocument.load(pdfBuffer);
//     const totalPages = originalPdf.getPages().length;
//     const splittedBuffers = [];

//     for (const range of ranges) {
//         let { from, to } = range; // Use let to potentially modify

//         // Client-side ranges are 1-indexed, so convert to 0-indexed for pdf-lib
//         from = Math.max(1, from); // Ensure minimum is 1
//         to = Math.min(totalPages, Math.max(from, to)); // Ensure to is not less than from, and not > totalPages

//         // Validate range to prevent errors (after adjustment)
//         if (from < 1 || to > totalPages || from > to) {
//             console.error(`Validation failed for range: from ${range.from} to ${range.to} (Adjusted: ${from}-${to}). Total pages: ${totalPages}.`);
//             throw new Error(`Invalid custom range: from ${range.from} to ${range.to}. Please check your ranges.`);
//         }

//         const newPdf = await PDFDocument.create();
        
//         // --- CRITICAL CHANGE HERE ---
//         // Create an array of 0-indexed page numbers to copy
//         // For a 1-indexed range [from, to], the 0-indexed pages are [from-1, to-1]
//         // The count of pages is (to - from + 1)
//         const pageIndicesToCopy = [];
//         for (let i = from - 1; i < to; i++) { // Loop from 0-indexed start to (0-indexed end + 1)
//             pageIndicesToCopy.push(i);
//         }
//         // --- END CRITICAL CHANGE ---

//         const copiedPages = await newPdf.copyPages(originalPdf, pageIndicesToCopy);
        
//         copiedPages.forEach((page) => newPdf.addPage(page));
//         splittedBuffers.push(await newPdf.save());
//     }
//     return splittedBuffers;
// };

// // Helper to split PDF by fixed size
// const splitByFixedSize = async (pdfBuffer, size) => {
//     if (size < 1) {
//         throw new Error("Fixed size must be at least 1 page.");
//     }

//     const originalPdf = await PDFDocument.load(pdfBuffer);
//     const totalPages = originalPdf.getPages().length;
//     const splittedBuffers = [];

//     for (let i = 0; i < totalPages; i += size) { // i is the 0-indexed start of each chunk
//         const newPdf = await PDFDocument.create();
//         const startPageIdx = i; // 0-indexed start
//         const endPageIdx = Math.min(i + size, totalPages); // Exclusive end (0-indexed)

//         // --- CRITICAL CHANGE HERE ---
//         // Create an array of 0-indexed page numbers for this chunk
//         const pageIndicesToCopy = [];
//         for (let j = startPageIdx; j < endPageIdx; j++) {
//             pageIndicesToCopy.push(j);
//         }
//         // --- END CRITICAL CHANGE ---

//         const copiedPages = await newPdf.copyPages(originalPdf, pageIndicesToCopy);
//         copiedPages.forEach((page) => newPdf.addPage(page));
//         splittedBuffers.push(await newPdf.save());
//     }
//     return splittedBuffers;
// };

// // Controller function
// export const splitPDF = async (req, res) => {
//     let uploadedFilePath = null;

//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: "No PDF file uploaded." });
//         }

//         const { mode, ranges, fixedSize } = req.body;
//         const pdfBuffer = req.file.buffer;

//         console.log("--- PDF Split Request ---");
//         console.log("Mode:", mode);
//         console.log("Ranges (raw):", ranges);
//         console.log("Fixed size (raw):", fixedSize);
//         console.log("File original name:", req.file.originalname);
//         console.log("File size:", req.file.size / (1024 * 1024), "MB");

//         let splittedBuffers = [];

//         if (mode === "custom") {
//             let parsedRanges;
//             try {
//                 parsedRanges = JSON.parse(ranges);
//                 if (!Array.isArray(parsedRanges) || parsedRanges.some(r => typeof r.from !== 'number' || typeof r.to !== 'number')) {
//                     throw new Error("Ranges must be an array of objects with 'from' and 'to' numbers.");
//                 }
//                 console.log("Parsed custom ranges:", parsedRanges);
//             } catch (err) {
//                 console.error("Error parsing ranges:", err.message);
//                 return res.status(400).json({ error: `Invalid ranges format: ${err.message}` });
//             }
//             splittedBuffers = await splitByCustomRanges(pdfBuffer, parsedRanges);

//         } else if (mode === "fixed") {
//             const parsedFixedSize = Number(fixedSize);
//             if (isNaN(parsedFixedSize) || parsedFixedSize < 1) {
//                 console.error("Invalid fixedSize received:", fixedSize);
//                 return res.status(400).json({ error: "Invalid fixed size provided. Must be a number >= 1." });
//             }
//             console.log("Parsed fixed size:", parsedFixedSize);
//             splittedBuffers = await splitByFixedSize(pdfBuffer, parsedFixedSize);

//         } else {
//             console.error("Invalid split mode received:", mode);
//             return res.status(400).json({ error: "Invalid split mode. Must be 'custom' or 'fixed'." });
//         }

//         console.log(`Successfully split PDF into ${splittedBuffers.length} part(s).`);

//         if (splittedBuffers.length > 1) {
//             res.setHeader("Content-Type", "application/zip");
//             // Sanitize filename for headers to prevent issues with special characters
//             const sanitizedOriginalName = req.file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
//             res.setHeader("Content-Disposition", `attachment; filename="splitted_${sanitizedOriginalName.replace(".pdf", "")}.zip"`);

//             const archive = archiver("zip", { zlib: { level: 9 } });
//             archive.on('error', (err) => {
//                 console.error("Archiver error:", err);
//                 throw new Error("Failed to create ZIP archive.");
//             });
//             archive.pipe(res);

//             splittedBuffers.forEach((buf, idx) => {
//                 // Sanitize individual PDF names within the zip
//                 archive.append(buf, { name: `split_${idx + 1}_${sanitizedOriginalName}` });
//             });
//             await archive.finalize();
//         } else if (splittedBuffers.length === 1) {
//             res.setHeader("Content-Type", "application/pdf");
//             const sanitizedOriginalName = req.file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
//             res.setHeader("Content-Disposition", `attachment; filename="split_${sanitizedOriginalName}`);
//             res.send(splittedBuffers[0]);
//         } else {
//             return res.status(500).json({ error: "Splitting resulted in no PDF parts. This shouldn't happen." });
//         }

//     } catch (err) {
//         console.error("PDF splitting error caught in controller:", err);
//         // Ensure error response is a consistent JSON object
//         if (!res.headersSent) {
//             res.status(500).json({ error: err.message || "Failed to split PDF due to an unexpected server error." });
//         }
//     } finally {
//         // No explicit unlink needed if using memoryStorage
//         console.log("--- End PDF Split Request ---");
//     }
// };




import { PDFDocument } from 'pdf-lib';

export const splitPDF =  async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No PDF file uploaded.');
    }

    const { start, end } = req.body;
    if (!start || !end) {
        return res.status(400).send('Start and end pages are required.');
    }

    const startPage = parseInt(start, 10);
    const endPage = parseInt(end, 10);

    try {
        const originalPdfBytes = req.file.buffer;
        const pdfDoc = await PDFDocument.load(originalPdfBytes);
        const totalPages = pdfDoc.getPageCount();

        // --- CHANGE #1 START ---
        // If the end page is out of bounds, default to the last page.
        let effectiveEndPage = endPage;
        if (endPage > totalPages) {
            effectiveEndPage = totalPages;
        }

        // Validate the start page and ensure the range is logical.
        if (startPage < 1 || startPage > totalPages || startPage > effectiveEndPage) {
            return res.status(400).send(`Invalid page range. The PDF has ${totalPages} pages.`);
        }
        // --- CHANGE #1 END ---

        const newPdfDoc = await PDFDocument.create();

        const pageIndices = [];
        // Use the 'effectiveEndPage' in the loop.
        for (let i = startPage - 1; i < effectiveEndPage; i++) {
            pageIndices.push(i);
        }

        const copiedPages = await newPdfDoc.copyPages(pdfDoc, pageIndices);
        copiedPages.forEach((page) => newPdfDoc.addPage(page));

        const pdfBytes = await newPdfDoc.save();

        res.setHeader('Content-Type', 'application/pdf');
        // Use 'effectiveEndPage' in the filename for clarity.
        res.setHeader('Content-Disposition', `attachment; filename=split_pages_${startPage}_to_${effectiveEndPage}.pdf`);
        res.send(Buffer.from(pdfBytes));

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while splitting the PDF.');
    }
}

