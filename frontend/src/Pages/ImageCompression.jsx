import axios from 'axios';
import React, { useState } from 'react';

const ImageCompression = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [targetSize, setTargetSize] = useState(200);
  const [maxSize, setMaxSize] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');

  // --- Step 1: Upload ---
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setDownloadUrl(null);
      setMessage('');

      const fileSizeKB = Math.ceil(selectedFile.size / 1024);
      setMaxSize(fileSizeKB);
      setTargetSize(Math.max(10, Math.floor(fileSizeKB / 2)));

      setStep(2);
    }
  };

  // --- Step 2: Compress ---
  // const handleCompress = async () => {
  //   if (!file) {
  //     setMessage('Please select a file first!');
  //     setMessageType('error');
  //     return;
  //   }

  //   setLoading(true);
  //   setMessage('Compressing image...');
  //   setMessageType('info');

    
  // try {
  //   const formData = new FormData();
  //   formData.append("image", file);
  //   formData.append("targetKb", targetSize);

  //   const apiUrl = import.meta.env.VITE_API_URL;

  //   const response = await axios.post(`${apiUrl}/api/compress`, formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //     responseType: "blob",
  //   });

  //     if (!response.ok) throw new Error(`Server error: ${response.status}`);

  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     setDownloadUrl(url);
  //     setStep(3);
  //     setMessage('Compression completed successfully!');
  //     setMessageType('success');
  //   } catch (error) {
  //     console.error(error);
  //     setMessage('Compression failed! Check server connection.');
  //     setMessageType('error');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleCompress = async () => {
  if (!file) {
    setMessage('Please select a file first!');
    setMessageType('error');
    return;
  }

  setLoading(true);
  setMessage('Compressing image...');
  setMessageType('info');

  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("targetKb", targetSize);

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

    const response = await axios.post(`${apiUrl}/api/compress`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob", // important
    });

    // response.data already contains the Blob
    const url = window.URL.createObjectURL(response.data);
    setDownloadUrl(url);
    setStep(3);
    setMessage('Compression completed successfully!');
    setMessageType('success');
  } catch (error) {
    console.error(error);
    setMessage('Compression failed! Check server connection.');
    setMessageType('error');
  } finally {
    setLoading(false);
  }
};


  // --- Step 3: Download ---
  const handleDownload = () => {
    if (!downloadUrl) {
      setMessage('No file to download!');
      setMessageType('error');
      return;
    }
    const link = document.createElement("a");
    link.href = downloadUrl;
    const originalName = file.name.split('.').slice(0, -1).join('.');
    const fileExtension = file.name.split('.').pop();
    link.setAttribute("download", `compressed_${originalName}.${fileExtension}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleStartOver = () => {
    setFile(null);
    setDownloadUrl(null);
    setMessage('');
    setStep(1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-lg w-full transform transition-all duration-500 ease-in-out scale-95 hover:scale-100">
        <h1 className="text-4xl font-extrabold text-center mb-2 text-violet-400">📷 Image Compressor</h1>
        <p className="text-center text-gray-400 mb-8">Reduce your image file size effortlessly.</p>

        {message && (
          <div className={`p-4 mb-6 rounded-xl border-2 ${messageType === 'info' ? 'bg-blue-900 border-blue-700 text-blue-300' : messageType === 'success' ? 'bg-green-900 border-green-700 text-green-300' : 'bg-red-900 border-red-700 text-red-300'}`}>
            <p className="font-medium text-center">{message}</p>
          </div>
        )}

        {/* STEP 1: Upload */}
        {step === 1 && (
          <div className="flex flex-col items-center space-y-6">
            <label className="w-full h-40 flex flex-col items-center justify-center border-4 border-dashed border-gray-600 rounded-2xl cursor-pointer hover:border-violet-500 transition-colors duration-200">
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 group-hover:text-violet-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <p className="text-gray-400 mt-2">Drag & Drop or <span className="font-semibold text-violet-400">Click to Upload</span></p>
            </label>
            {file && (
              <div className="text-center text-gray-400 text-sm">
                Selected: <span className="font-medium text-white">{file.name}</span> ({Math.ceil(file.size / 1024)} KB)
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Options */}
        {step === 2 && (
          <div className="flex flex-col items-center space-y-8">
            <div className="w-full">
              <label className="flex justify-between items-center text-gray-400 font-medium mb-4">
                <span>Target Size:</span>
                <span className="text-xl font-bold text-violet-400">{targetSize} KB</span>
              </label>
              <input
                type="range"
                min="10"
                max={maxSize}
                value={targetSize}
                onChange={(e) => setTargetSize(e.target.value)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <p className="text-sm text-gray-500 mt-2">
                Range: 10 KB – {maxSize} KB
              </p>
            </div>
            <div className="flex justify-center gap-4 w-full">
              <button onClick={() => setStep(1)} className="flex-1 py-3 px-6 bg-gray-700 text-white rounded-xl font-bold hover:bg-gray-600 transition-colors duration-200">
                Back
              </button>
              <button onClick={handleCompress} disabled={loading} className="flex-1 py-3 px-6 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-700 disabled:text-gray-500 cursor-pointer disabled:cursor-not-allowed">
                {loading ? "Compressing..." : "Compress"}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Download */}
        {step === 3 && (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-green-400 font-medium text-center">
              Compression completed successfully!
            </p>
            <button onClick={handleDownload} className="w-full py-3 px-6 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors duration-200">
              ⬇ Download File
            </button>
            <button onClick={handleStartOver} className="w-full py-3 px-6 bg-gray-700 text-white rounded-xl font-bold hover:bg-gray-600 transition-colors duration-200">
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCompression;
