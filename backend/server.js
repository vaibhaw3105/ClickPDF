
// import dotenv from "dotenv"
// dotenv.config()
// import express from "express";
// import cors from "cors";
// import convertRoutes from "./src/routes/convert.routes.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/convert", convertRoutes);
// app.use();const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import cors from "cors";
// import convertRoutes from "./src/routes/convert.routes.js";
// import splitPdfRoutes from "./src/routes/splitPDF.routes.js"

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/convert", convertRoutes);
// app.use("/api", splitPdfRoutes)

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import cors from "cors";
// import convertRoutes from "./src/routes/convert.routes.js";
// import splitPdfRoutes from "./src/routes/splitPDF.routes.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/convert", convertRoutes);
// app.use("/api", splitPdfRoutes);

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

import express from "express";
import cors from "cors";
import convertRoutes from "./src/routes/convert.routes.js"; // Assuming you have other routes
import splitPdfRoutes from "./src/routes/splitPDF.routes.js"; // Your new split PDF routes
import compressPdfRoutes from "./src/routes/compressPDF.routes.js"
import wordToPDFRoutes from "./src/routes/wordToPDF.routes.js";
import pdfToWordRoutes from "./src/routes/pdfToWord.routes.js";
import pdfToImagesRoutes from "./src/routes/pdfToImages.routes.js";
import compressImage from "./src/routes/compressImage.routes.js";
import pngToJPGRoutes from "./src/routes/pngToJPG.routes.js";


const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable JSON body parsing

// Routes
app.use("/api/convert", convertRoutes); // For other conversion routes
app.use("/api", splitPdfRoutes); // For PDF splitting routes
app.use("/api", compressPdfRoutes); // For PDF Compressing routes
app.use("/api", wordToPDFRoutes);
app.use("/api", pdfToWordRoutes);
app.use("/api", pdfToImagesRoutes);
app.use("/api", compressImage);
app.use("/api", pngToJPGRoutes);

// Basic error handling for routes not found
app.use((req, res, next) => {
  res.status(404).json({ error: "API route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});