// import sharp from "sharp";

// export const pngToJPG = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send("No file uploaded");
//     }

//     const inputBuffer = req.file.buffer;

//     const outputBuffer = await sharp(inputBuffer)
//       .jpeg({ quality: 90, mozjpeg: true }) // convert to JPEG
//       .toBuffer();

//     res.set({
//       "Content-Type": "image/jpeg",
//       "Content-Disposition": `attachment; filename="${req.file.originalname.split('.').slice(0,-1).join('.')}.jpg"`,
//     });

//     res.send(outputBuffer);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("PNG to JPG conversion failed");
//   }
// };


import sharp from "sharp";

export const pngToJPG = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No file uploaded.");

    const inputBuffer = req.file.buffer;

    const outputBuffer = await sharp(inputBuffer)
      .jpeg({ quality: 90 })
      .toBuffer();

    res.set({
      "Content-Type": "image/jpeg",
      "Content-Disposition": `attachment; filename="converted.jpg"`,
    });
    res.send(outputBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Conversion failed.");
  }
};
