import sharp from "sharp";

export const compressImage = async (req, res) => {
    try {
        const targetSizeKB = parseInt(req.body.targetKb); // <-- matches frontend
        const inputBuffer = req.file.buffer;

        const metadata = await sharp(inputBuffer).metadata();
        const originalSizeKB = inputBuffer.length / 1024;

        if (targetSizeKB >= originalSizeKB) {
            res.set({
                "Content-Type": "image/jpeg",
                "Content-Disposition": `attachment; filename="original.jpg"`,
            });
            return res.send(inputBuffer);
        }

        let quality = 80;
        let minQuality = 30;
        let maxQuality = 100;
        let width = metadata.width;
        let height = metadata.height;
        let outputBuffer;

        // Binary search on quality + optional downscale if needed
        for (let i = 0; i < 15; i++) {
            outputBuffer = await sharp(inputBuffer)
                .resize({ width: Math.floor(width) })
                .jpeg({ quality, mozjpeg: true })
                .toBuffer();

            const sizeKB = outputBuffer.length / 1024;

            if (sizeKB > targetSizeKB * 1.05) {
                maxQuality = quality - 1;
                quality = Math.floor((minQuality + maxQuality) / 2);
                // reduce size if quality reaches minimum
                if (quality <= minQuality) width *= 0.9;
            } else if (sizeKB < targetSizeKB * 0.95) {
                minQuality = quality + 1;
                quality = Math.floor((minQuality + maxQuality) / 2);
            } else {
                break; // within ±5%
            }

            if (width < 100) break; // prevent excessive downscale
        }

        res.set({
            "Content-Type": "image/jpeg",
            "Content-Disposition": `attachment; filename="compressed.jpg"`,
        });
        res.send(outputBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send("Compression failed.");
    }
};
