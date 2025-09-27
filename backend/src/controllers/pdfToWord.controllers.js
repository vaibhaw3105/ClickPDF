import multer from "multer";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

const upload = multer({ dest: "uploads/" });

const convertPdfToWord = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    exec(
      `soffice --headless --convert-to docx --outdir ${path.dirname(outputPath)} ${inputPath}`,
      (err) => {
        if (err) reject(err);
        else resolve(outputPath);
      }
    );
  });
};

export const pdfToWord = async (req, res) => {
  try {
    const files = req.files;
    if (!files || !files.length)
      return res.status(400).json({ error: "No PDF files uploaded" });

    const wordPaths = [];
    for (const file of files) {
      const wordPath = path.join("uploads", `${file.filename}.docx`);
      await convertPdfToWord(file.path, wordPath);
      wordPaths.push(wordPath);
    }

    if (wordPaths.length === 1) {
      const wordBytes = fs.readFileSync(wordPaths[0]);
      res.set({
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename=${files[0].originalname.replace(
          /\.pdf$/i,
          ".docx"
        )}`,
      });
      res.send(Buffer.from(wordBytes));
    } else {
      // Multiple files: zip them
      const archiver = (await import("archiver")).default;
      const archive = archiver("zip", { zlib: { level: 9 } });
      res.set({
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=converted_docs.zip",
      });
      archive.pipe(res);
      wordPaths.forEach((wp) => {
        archive.file(wp, { name: path.basename(wp) });
      });
      await archive.finalize();
    }

    // Cleanup
    [...files.map((f) => f.path), ...wordPaths].forEach((p) =>
      fs.unlinkSync(p)
    );
  } catch (err) {
    console.error("Conversion error:", err);
    res.status(500).json({ error: "Conversion failed" });
  }
};

export { upload };
