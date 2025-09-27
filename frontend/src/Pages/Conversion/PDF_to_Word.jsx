import React, { useState } from "react";
import axios from "axios";
import { ArrowLeft, X } from "lucide-react";

const PDF_to_Word = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);

  // Handle file selection
  const handleFiles = (newFiles) => {
    setFiles([...files, ...Array.from(newFiles)]);
  };

  // Handle drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  // Reset all
  const resetAll = () => {
    setFiles([]);
    setDownloadUrl(null);
    setStatus("");
    setLoading(false);
  };

  // Convert PDF to Word
  const handleConvert = async () => {
    if (!files.length) return;
    setLoading(true);
    setStatus("Converting PDF to Word...");

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const apiUrl = import.meta.env.VITE_API_URL;

      const res = await axios.post(`${apiUrl}/api/pdf-to-word`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      setDownloadUrl(url);
      setStatus("Conversion successful!");
    } catch (err) {
      console.error(err);
      setStatus("Error during conversion.");
    } finally {
      setLoading(false);
    }
  };

  // ------------------- SCREEN 1: Upload -------------------
  if (!files.length && !downloadUrl) {
    return (
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div
          className="bg-gray-100 w-[500px] h-[400px] flex flex-col items-center justify-center rounded-xl shadow-lg p-6"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <h2 className="text-2xl font-bold mb-6">Upload PDF Files</h2>

          <label className="px-8 py-4 bg-blue-700 text-white rounded-lg cursor-pointer hover:opacity-90 mb-4">
            Select PDFs
            <input
              type="file"
              accept=".pdf"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>

          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 w-full h-48 rounded-lg bg-gray-50">
            <p className="text-gray-600 text-center">Or drag and drop files here</p>
          </div>
        </div>
      </div>
    );
  }

  // ------------------- SCREEN 2: Options -------------------
  if (files.length && !downloadUrl) {
    return (
      <div className="bg-white min-h-screen p-6 flex">
        {/* Left Section - File Cards + Drag & Drop */}
        <div className="flex-1 pr-6">
          <div className="p-5 mb-3 flex flex-col">
            <label className="px-8 py-4 bg-blue-700 text-white rounded-xl cursor-pointer hover:opacity-90 mb-4 m-auto">
              Add More PDFs
              <input
                type="file"
                accept=".pdf"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </label>

            <div
              className="flex flex-col items-center justify-center border-2 border-dashed max-w-[70%] m-auto border-gray-400 w-full h-48 rounded-lg bg-gray-50"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <p className="text-gray-600 text-center text-xl ">
                Or drag and drop more files here
              </p>
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-4">Files Uploaded: {files.length}</h2>
          <div className="flex flex-wrap gap-4">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="relative bg-amber-200 p-4 rounded-xl w-[200px] shadow"
              >
                <button
                  onClick={() => setFiles(files.filter((_, i) => i !== idx))}
                  className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
                >
                  <X size={20} />
                </button>

                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                    alt="PDF Icon"
                    className="w-10 h-10"
                  />
                </div>

                <p className="text-sm font-semibold text-gray-800 truncate max-w-[160px]">
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Convert Button */}
        <div className="w-80">
          <div className="sticky top-10 bg-white shadow-xl rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">PDF to Word</h3>

            <button
              onClick={handleConvert}
              className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
            >
              Convert to Word
            </button>

            <div className="text-center mt-4">
              {loading && (
                <div className="flex flex-col items-center mb-2">
                  <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-10 h-10 animate-spin mb-2"></div>
                  <p>Converting...</p>
                </div>
              )}
              <p className="text-gray-500">{status}</p>

              <button
                onClick={resetAll}
                className="mt-6 flex items-center text-blue-600 hover:underline mx-auto"
              >
                <ArrowLeft className="mr-2" /> Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ------------------- SCREEN 3: Download -------------------
  if (downloadUrl) {
    return (
      <div className="bg-gray-200 min-h-screen flex justify-center items-start pt-16">
        <div className="bg-white w-[500px] h-[300px] flex flex-col justify-center items-center gap-4 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Your Word file is Ready!</h2>

          <a
            href={downloadUrl}
            download="merged.docx"
            className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
          >
            Download Word
          </a>

          <button
            onClick={resetAll}
            className="flex items-center mt-4 text-blue-600 hover:underline"
          >
            <ArrowLeft className="mr-2" /> Convert More Files
          </button>
        </div>
      </div>
    );
  }
};

export default PDF_to_Word;
