// import axios from 'axios';
// import React, { useState } from 'react';

// const PNG_to_JPG = () => {
//   const [step, setStep] = useState(1);
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [downloadUrl, setDownloadUrl] = useState(null);
//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState('info');

//   // --- Step 1: Upload ---
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       if (selectedFile.type !== "image/png") {
//         setMessage("Please upload a PNG file!");
//         setMessageType("error");
//         return;
//       }
//       setFile(selectedFile);
//       setDownloadUrl(null);
//       setMessage('');
//       setStep(2);
//     }
//   };

//   // --- Step 2: Convert ---
//   const handleConvert = async () => {
//     if (!file) {
//       setMessage('Please select a PNG file first!');
//       setMessageType('error');
//       return;
//     }

//     setLoading(true);
//     setMessage('Converting to JPG...');
//     setMessageType('info');

//     try {
//       const formData = new FormData();
//       formData.append("image", file);

//       const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

//       const response = await axios.post(`${apiUrl}/api/png-to-jpg`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         responseType: "blob",
//       });

//       const url = window.URL.createObjectURL(response.data);
//       setDownloadUrl(url);
//       setStep(3);
//       setMessage('Conversion completed successfully!');
//       setMessageType('success');
//     } catch (error) {
//       console.error(error);
//       setMessage('Conversion failed! Check server connection.');
//       setMessageType('error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Step 3: Download ---
//   const handleDownload = () => {
//     if (!downloadUrl) {
//       setMessage('No file to download!');
//       setMessageType('error');
//       return;
//     }
//     const link = document.createElement("a");
//     link.href = downloadUrl;
//     const originalName = file.name.split('.').slice(0, -1).join('.');
//     link.setAttribute("download", `${originalName}.jpg`);
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//   };

//   const handleStartOver = () => {
//     setFile(null);
//     setDownloadUrl(null);
//     setMessage('');
//     setStep(1);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
//       <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-lg w-full transform transition-all duration-500 ease-in-out scale-95 hover:scale-100">
//         <h1 className="text-4xl font-extrabold text-center mb-2 text-violet-400">🖼 PNG → JPG Converter</h1>
//         <p className="text-center text-gray-400 mb-8">Convert PNG images to JPG effortlessly.</p>

//         {message && (
//           <div className={`p-4 mb-6 rounded-xl border-2 ${
//             messageType === 'info' ? 'bg-blue-900 border-blue-700 text-blue-300' :
//             messageType === 'success' ? 'bg-green-900 border-green-700 text-green-300' :
//             'bg-red-900 border-red-700 text-red-300'
//           }`}>
//             <p className="font-medium text-center">{message}</p>
//           </div>
//         )}

//         {/* STEP 1: Upload */}
//         {/* {step === 1 && (
//           <div className="flex flex-col items-center space-y-6">
//             <label className="w-full h-40 flex flex-col items-center justify-center border-4 border-dashed border-gray-600 rounded-2xl cursor-pointer hover:border-violet-500 transition-colors duration-200">
//               <input type="file" accept="image/png" onChange={handleFileChange} className="hidden" />
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 group-hover:text-violet-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//               </svg>
//               <p className="text-gray-400 mt-2">Drag & Drop or <span className="font-semibold text-violet-400">Click to Upload PNG</span></p>
//             </label>
//           </div>
//         )} */}
              
//               {step === 1 && (
//   <div
//     className={`w-full h-40 flex flex-col items-center justify-center border-4 border-dashed rounded-2xl cursor-pointer transition-colors duration-200 ${
//       isDragging ? 'border-violet-500 bg-gray-700' : 'border-gray-600'
//     }`}
//     onDragOver={handleDragOver}
//     onDragLeave={handleDragLeave}
//     onDrop={handleDrop}
//   >
//     <input type="file" accept="image/png" onChange={handleFileChange} className="hidden" />
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//     </svg>
//     <p className="text-gray-400 mt-2">
//       Drag & Drop PNG here or <span className="font-semibold text-violet-400">Click to Upload</span>
//     </p>
//     {file && (
//       <div className="text-center text-gray-400 text-sm mt-2">
//         Selected: <span className="font-medium text-white">{file.name}</span>
//       </div>
//     )}
//   </div>
// )}


//         {/* STEP 2: Convert */}
//         {step === 2 && (
//           <div className="flex flex-col items-center space-y-8">
//             <div className="flex justify-center gap-4 w-full">
//               <button onClick={() => setStep(1)} className="flex-1 py-3 px-6 bg-gray-700 text-white rounded-xl font-bold hover:bg-gray-600 transition-colors duration-200">Back</button>
//               <button onClick={handleConvert} disabled={loading} className="flex-1 py-3 px-6 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-700 disabled:text-gray-500 cursor-pointer disabled:cursor-not-allowed">
//                 {loading ? "Converting..." : "Convert"}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* STEP 3: Download */}
//         {step === 3 && (
//           <div className="flex flex-col items-center space-y-4">
//             <p className="text-green-400 font-medium text-center">Conversion completed successfully!</p>
//             <button onClick={handleDownload} className="w-full py-3 px-6 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors duration-200">⬇ Download JPG</button>
//             <button onClick={handleStartOver} className="w-full py-3 px-6 bg-gray-700 text-white rounded-xl font-bold hover:bg-gray-600 transition-colors duration-200">Start Over</button>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default PNG_to_JPG;


import axios from "axios";
import React, { useState } from "react";

const PNG_to_JPG = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [isDragging, setIsDragging] = useState(false);

  // --- Step 1: File upload ---
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "image/png") {
      setFile(selectedFile);
      setDownloadUrl(null);
      setStep(2);
      setMessage("");
    } else {
      setMessage("Please select a PNG file!");
      setMessageType("error");
    }
  };

  // Drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "image/png") {
      setFile(droppedFile);
      setDownloadUrl(null);
      setStep(2);
      setMessage("");
    } else {
      setMessage("Please drop a PNG file!");
      setMessageType("error");
    }
  };

  // --- Step 2: Convert ---
  const handleConvert = async () => {
    if (!file) return;

    setLoading(true);
    setMessage("Converting PNG to JPG...");
    setMessageType("info");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await axios.post(`${apiUrl}/api/png-to-jpg`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "image/jpeg" });
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      setStep(3);
      setMessage("Conversion completed successfully!");
      setMessageType("success");
    } catch (err) {
      console.error(err);
      setMessage("Conversion failed! Check server connection.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // --- Step 3: Download ---
  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement("a");
    const originalName = file.name.split(".").slice(0, -1).join(".");
    link.href = downloadUrl;
    link.setAttribute("download", `${originalName}.jpg`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleStartOver = () => {
    setFile(null);
    setDownloadUrl(null);
    setMessage("");
    setStep(1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-lg w-full transform transition-all duration-500 ease-in-out scale-95 hover:scale-100">
        <h1 className="text-4xl font-extrabold text-center mb-2 text-violet-400">📷 PNG → JPG</h1>
        <p className="text-center text-gray-400 mb-8">Convert your PNG images to JPG effortlessly.</p>

        {message && (
          <div className={`p-4 mb-6 rounded-xl border-2 ${
            messageType === "info" ? "bg-blue-900 border-blue-700 text-blue-300" :
            messageType === "success" ? "bg-green-900 border-green-700 text-green-300" :
            "bg-red-900 border-red-700 text-red-300"
          }`}>
            <p className="font-medium text-center">{message}</p>
          </div>
        )}

        {/* STEP 1: Upload */}
        {/* {step === 1 && (
          <div
            className={`w-full h-40 flex flex-col items-center justify-center border-4 border-dashed rounded-2xl cursor-pointer transition-colors duration-200 ${
              isDragging ? "border-violet-500 bg-gray-700" : "border-gray-600"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input type="file" accept="image/png" onChange={handleFileChange} className="hidden" />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <p className="text-gray-400 mt-2">Drag & Drop PNG here or <span className="font-semibold text-violet-400">Click to Upload</span></p>
            {file && <div className="text-center text-gray-400 text-sm mt-2">{file.name}</div>}
          </div>
        )} */}
              
              {/* STEP 1: Upload */}
{step === 1 && (
  <label
    htmlFor="png-upload"
    className={`w-full h-40 flex flex-col items-center justify-center border-4 border-dashed rounded-2xl cursor-pointer transition-colors duration-200 ${
      isDragging ? "border-violet-500 bg-gray-700" : "border-gray-600"
    }`}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
  >
    <input
      id="png-upload"
      type="file"
      accept="image/png"
      onChange={handleFileChange}
      className="hidden"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12 text-gray-500 transition-colors duration-200"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
      />
    </svg>
    <p className="text-gray-400 mt-2">
      Drag & Drop PNG here or{" "}
      <span className="font-semibold text-violet-400">Click to Upload</span>
    </p>
    {file && (
      <div className="text-center text-gray-400 text-sm mt-2">{file.name}</div>
    )}
  </label>
)}


        {/* STEP 2: Convert */}
        {step === 2 && (
          <div className="flex flex-col items-center space-y-8">
            <button onClick={() => setStep(1)} className="w-full py-3 px-6 bg-gray-700 text-white rounded-xl font-bold hover:bg-gray-600 transition-colors duration-200">Back</button>
            <button onClick={handleConvert} disabled={loading} className="w-full py-3 px-6 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-700 disabled:text-gray-500">
              {loading ? "Converting..." : "Convert"}
            </button>
          </div>
        )}

        {/* STEP 3: Download */}
        {step === 3 && (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-green-400 font-medium text-center">Conversion completed successfully!</p>
            <button onClick={handleDownload} className="w-full py-3 px-6 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors duration-200">⬇ Download JPG</button>
            <button onClick={handleStartOver} className="w-full py-3 px-6 bg-gray-700 text-white rounded-xl font-bold hover:bg-gray-600 transition-colors duration-200">Start Over</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PNG_to_JPG;
