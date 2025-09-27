import multer from "multer";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import archiver from "archiver";

export const upload = multer({ dest: "uploads/" });

const gsPath = `"C:\\Program Files\\gs\\gs10.06.0\\bin\\gswin64c.exe"`;


export const pdfToImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded");
    }

    const sessionId = Date.now().toString();
    const sessionDir = path.join("outputs", sessionId);
    fs.mkdirSync(sessionDir, { recursive: true });

    // Convert each PDF
    const conversionPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const pdfName = path.basename(file.originalname, ".pdf");
        const pdfFolder = path.join(sessionDir, pdfName);
        fs.mkdirSync(pdfFolder, { recursive: true });

        // const outputPattern = path.join(pdfFolder, "page_%03d.png");
        const outputPattern = path.join(pdfFolder, "page_%03d.jpg");


        // const gsCommand = `${gsPath} -dNOPAUSE -dBATCH -sDEVICE=png16m -r150 -sOutputFile="${outputPattern}" "${file.path}"`;
        const gsCommand = `${gsPath} -dNOPAUSE -dBATCH -sDEVICE=jpeg -dJPEGQ=95 -r150 -sOutputFile="${outputPattern}" "${file.path}"`;


        exec(gsCommand, (err) => {
          if (err) {
            console.error(`Ghostscript error for ${file.originalname}:`, err);
            return reject(err);
          }

          // Cleanup uploaded PDF
          fs.rmSync(file.path, { force: true });
          resolve();
        });
      });
    });

    // Wait for all PDFs to finish converting
    await Promise.all(conversionPromises);

    // Create ZIP containing all PDF folders
    const zipPath = `${sessionDir}.zip`;
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      res.download(zipPath, "converted_images.zip", (err) => {
        if (err) console.error("Download error:", err);

        // Cleanup session files
        fs.rmSync(sessionDir, { recursive: true, force: true });
        fs.rmSync(zipPath, { force: true });
      });
    });

    archive.pipe(output);
    archive.directory(sessionDir, false);
    archive.finalize();
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};