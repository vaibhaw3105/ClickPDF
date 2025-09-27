
// import { PDFDocument } from "pdf-lib";
// import fs from "fs";
// import sharp from "sharp";

// export const imagesToPdf = async (req, res) => {
//   try {
//     const { orientation = "portrait", pageSize = "A4", margin = "no-margin" } = req.body;
//     const files = req.files;

//     if (!files || files.length === 0) {
//       return res.status(400).json({ error: "No images provided" });
//     }

//     // Create a new PDF
//     const pdfDoc = await PDFDocument.create();

//     // Define page sizes
//     const pageSizes = {
//       A4: { width: 595.28, height: 841.89 }, // A4 in points
//       Letter: { width: 612, height: 792 },   // US Letter
//       fit: null, // adapt to image size
//     };

//     const selectedSize = pageSizes[pageSize] || pageSizes.A4;

//     // Define margins
//     const marginValues = {
//       "no-margin": 0,
//       small: 20,
//       big: 50,
//     };

//     const selectedMargin = marginValues[margin] ?? 0;

//     // Loop through each uploaded image
//     for (const file of files) {
//       let imgBuffer = fs.readFileSync(file.path);

//       // Convert everything to PNG if not JPG/PNG
//       if (file.mimetype === "image/png") {
//         // already PNG
//       } else if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
//         // already JPG
//       } else {
//         // Convert unsupported formats to PNG using sharp
//         imgBuffer = await sharp(imgBuffer).png().toBuffer();
//       }

//       // Embed image into PDF
//       let img;
//       if (file.mimetype === "image/png") {
//         img = await pdfDoc.embedPng(imgBuffer);
//       } else if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
//         img = await pdfDoc.embedJpg(imgBuffer);
//       } else {
//         // after conversion, it’s PNG
//         img = await pdfDoc.embedPng(imgBuffer);
//       }

//       const { width, height } = img.size();

//       // Page dimensions
//       let pageWidth, pageHeight;

//       if (pageSize === "fit") {
//         pageWidth = width + selectedMargin * 2;
//         pageHeight = height + selectedMargin * 2;
//       } else {
//         if (orientation === "landscape") {
//           pageWidth = selectedSize.height;
//           pageHeight = selectedSize.width;
//         } else {
//           pageWidth = selectedSize.width;
//           pageHeight = selectedSize.height;
//         }
//       }

//       // Add a new page
//       const page = pdfDoc.addPage([pageWidth, pageHeight]);

//       // Scale image proportionally
//       const availableWidth = pageWidth - selectedMargin * 2;
//       const availableHeight = pageHeight - selectedMargin * 2;
//       const scale = Math.min(availableWidth / width, availableHeight / height);
//       const scaledWidth = width * scale;
//       const scaledHeight = height * scale;

//       const centerX = (pageWidth - scaledWidth) / 2;
//       const centerY = (pageHeight - scaledHeight) / 2;

//       page.drawImage(img, {
//         x: centerX,
//         y: centerY,
//         width: scaledWidth,
//         height: scaledHeight,
//       });

//       // Cleanup uploaded temp file
//       fs.unlinkSync(file.path);
//     }

//     // Save final PDF
//     const pdfBytes = await pdfDoc.save();

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", "attachment; filename=converted.pdf");
//     res.send(Buffer.from(pdfBytes));
//   } catch (error) {
//     console.error("PDF conversion error:", error);
//     res.status(500).json({ error: "Failed to convert images to PDF" });
//   }
// };



import { PDFDocument } from "pdf-lib";
import fs from "fs";
import sharp from "sharp";

export const imagesToPdf = async (req, res) => {
  try {
    const { orientation = "portrait", pageSize = "A4", margin = "no-margin" } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No images provided" });
    }

    const pdfDoc = await PDFDocument.create();

    // Define page sizes
    const pageSizes = {
      A4: { width: 595.28, height: 841.89 },
      Letter: { width: 612, height: 792 },
      fit: null,
    };
    const selectedSize = pageSizes[pageSize] || pageSizes.A4;

    // Define margins
    const marginValues = {
      "no-margin": 0,
      small: 20,
      big: 50,
    };
    const selectedMargin = marginValues[margin] ?? 0;

    // Loop through each uploaded image
    for (const file of files) {
      let rawBuffer = fs.readFileSync(file.path);

      // 🔑 Always normalize image with sharp
      let normalizedBuffer;
      if (file.mimetype.includes("png")) {
        normalizedBuffer = await sharp(rawBuffer).png().toBuffer();
      } else {
        normalizedBuffer = await sharp(rawBuffer).jpeg().toBuffer();
      }

      // Embed normalized image
      let img;
      if (file.mimetype.includes("png")) {
        img = await pdfDoc.embedPng(normalizedBuffer);
      } else {
        img = await pdfDoc.embedJpg(normalizedBuffer);
      }

      const { width, height } = img.size();

      // Page dimensions
      let pageWidth, pageHeight;
      if (pageSize === "fit") {
        pageWidth = width + selectedMargin * 2;
        pageHeight = height + selectedMargin * 2;
      } else {
        if (orientation === "landscape") {
          pageWidth = selectedSize.height;
          pageHeight = selectedSize.width;
        } else {
          pageWidth = selectedSize.width;
          pageHeight = selectedSize.height;
        }
      }

      // Add a new page
      const page = pdfDoc.addPage([pageWidth, pageHeight]);

      // Scale proportionally
      const availableWidth = pageWidth - selectedMargin * 2;
      const availableHeight = pageHeight - selectedMargin * 2;
      const scale = Math.min(availableWidth / width, availableHeight / height);
      const scaledWidth = width * scale;
      const scaledHeight = height * scale;

      const centerX = (pageWidth - scaledWidth) / 2;
      const centerY = (pageHeight - scaledHeight) / 2;

      page.drawImage(img, {
        x: centerX,
        y: centerY,
        width: scaledWidth,
        height: scaledHeight,
      });

      fs.unlinkSync(file.path);
    }

    const pdfBytes = await pdfDoc.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=converted.pdf");
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error("PDF conversion error:", error);
    res.status(500).json({ error: "Failed to convert images to PDF" });
  }
};
