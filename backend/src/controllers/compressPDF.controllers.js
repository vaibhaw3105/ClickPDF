// import fs  from "fs";
// import path from 'path';
// import { spawnSync } from 'child_process';



// // Mapping quality levels to Ghostscript presets
// const qualityMap = {
//   high: '/prepress',   // best quality, large file
//   medium: '/printer',  // good quality, smaller
//   low: '/ebook',       // medium/low
//   verylow: '/screen'   // smallest, lowest quality
// };


// export const compressPDF = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ error: 'No PDF uploaded' });

//     const inputPath = req.file.path;
//     const quality = req.body.quality || 'medium';

//     if (!qualityMap[quality]) {
//       fs.unlinkSync(inputPath);
//       return res.status(400).json({ error: 'Invalid quality selected' });
//     }

//     const outPath = path.join(uploadDir, `out-${Date.now()}.pdf`);

//     const gsCmd = process.platform === 'win32'
//       ? 'gswin64c'
//       : 'gs';

//     const args = [
//       '-sDEVICE=pdfwrite',
//       '-dCompatibilityLevel=1.4',
//       `-dPDFSETTINGS=${qualityMap[quality]}`,
//       '-dNOPAUSE',
//       '-dQUIET',
//       '-dBATCH',
//       `-sOutputFile=${outPath}`,
//       inputPath
//     ];

//     const spawned = spawnSync(gsCmd, args, { encoding: 'utf8' });

//     if (spawned.error) {
//       fs.unlinkSync(inputPath);
//       return res.status(500).json({
//         error: 'Ghostscript execution failed. Check PATH or install Ghostscript.',
//         details: spawned.error.message
//       });
//     }

//     if (!fs.existsSync(outPath)) {
//       fs.unlinkSync(inputPath);
//       return res.status(500).json({ error: 'Compression failed: no output generated' });
//     }

//     fs.unlinkSync(inputPath);
//     res.setHeader('Content-Disposition', `attachment; filename=compressed-${req.file.originalname}`);
//     return res.sendFile(path.resolve(outPath));

//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Internal server error', details: err.message });
//   }
// };



import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";

// Create uploads folder if it doesn't exist
const uploadDir = path.join(process.cwd(), 'uploads'); // safer for ES modules
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Mapping quality levels to Ghostscript presets
const qualityMap = {
  high: '/prepress',   // best quality, large file
  medium: '/printer',  // good quality, smaller
  low: '/ebook',       // medium/low
  verylow: '/screen'   // smallest, lowest quality
};

export const compressPDF = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No PDF uploaded' });

    const inputPath = req.file.path;
    const quality = req.body.quality || 'medium';

    if (!qualityMap[quality]) {
      fs.unlinkSync(inputPath);
      return res.status(400).json({ error: 'Invalid quality selected' });
    }

    const outPath = path.join(uploadDir, `out-${Date.now()}.pdf`);

    const gsCmd = process.platform === 'win32'
      ? 'gswin64c'
      : 'gs';

    const args = [
      '-sDEVICE=pdfwrite',
      '-dCompatibilityLevel=1.4',
      `-dPDFSETTINGS=${qualityMap[quality]}`,
      '-dNOPAUSE',
      '-dQUIET',
      '-dBATCH',
      `-sOutputFile=${outPath}`,
      inputPath
    ];

    const spawned = spawnSync(gsCmd, args, { encoding: 'utf8' });

    if (spawned.error) {
      fs.unlinkSync(inputPath);
      return res.status(500).json({
        error: 'Ghostscript execution failed. Check PATH or install Ghostscript.',
        details: spawned.error.message
      });
    }

    if (!fs.existsSync(outPath)) {
      fs.unlinkSync(inputPath);
      return res.status(500).json({ error: 'Compression failed: no output generated' });
    }

    fs.unlinkSync(inputPath);
    res.setHeader('Content-Disposition', `attachment; filename=compressed-${req.file.originalname}`);
    return res.sendFile(path.resolve(outPath));

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
};
