// // src/App.jsx
// import React, { useState, useRef } from 'react';
// import axios from 'axios';
// import { ArrowLeft, X } from 'lucide-react';

// export default function CompressPDF() {
//   const [file, setFile] = useState(null);
//   const [origKb, setOrigKb] = useState(null);
//   const [status, setStatus] = useState('');
//   const [downloadUrl, setDownloadUrl] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [selectedQuality, setSelectedQuality] = useState(null);

//   const dropRef = useRef(null);

//   const handleFile = (f) => {
//     if (f && f.type === 'application/pdf') {
//       setFile(f);
//       setOrigKb(Math.round(f.size / 1024));
//       setDownloadUrl('');
//       setStatus('');
//     }
//   };

//   const handleFiles = (e) => {
//     const f = e.target.files[0];
//     handleFile(f);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const f = e.dataTransfer.files[0];
//     handleFile(f);
//   };

//   const handleDragOver = (e) => e.preventDefault();

//   const resetAll = () => {
//     setFile(null);
//     setOrigKb(null);
//     setStatus('');
//     setDownloadUrl('');
//     setLoading(false);
//     setSelectedQuality(null);
//   };

//   const handleCompress = async (quality) => {
//     if (!file) return alert('Choose a PDF first');
//     setLoading(true);
//     setStatus(`Compressing (${quality} quality)...`);
//     setDownloadUrl('');

//     const formData = new FormData();
//     formData.append('pdf', file);
//     formData.append('quality', quality);

//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;

//       const resp = await axios.post(
//         `${apiUrl}/api/compress/pdf`,
//         formData,
//         { responseType: 'blob' }
//       );

//       const blob = new Blob([resp.data], { type: 'application/pdf' });
//       const url = URL.createObjectURL(blob);
//       setDownloadUrl(url);
//       setStatus('Compression Done!');
//       setLoading(false);

//       // auto-download
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `compressed-${file.name}`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       const message =
//         err.response?.data?.error || err.message || 'Compression failed';
//       setStatus('Error: ' + message);
//       setLoading(false);
//     }
//   };

//   // 1. Upload screen
//   if (!file) {
//     return (
//       <div className="bg-gray-200 min-h-screen p-10 flex flex-col items-center">
//         <h1 className="font-bold text-3xl text-gray-800 text-center">
//           Compress PDF
//         </h1>
//         <p className="text-[16px] text-gray-600 mt-2 text-center">
//           Upload a PDF file to compress it.
//         </p>

//         <label className="mt-8 inline-block px-10 py-5 font-medium bg-blue-800 text-white text-2xl rounded-2xl cursor-pointer hover:opacity-90">
//           Select PDF
//           <input
//             type="file"
//             accept="application/pdf"
//             className="hidden"
//             onChange={handleFiles}
//           />
//         </label>

//         <div
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//           ref={dropRef}
//           className="mt-6 border-2 border-dashed border-gray-400 rounded-xl p-20 text-gray-600 bg-gray-100 w-2/3 text-center"
//         >
//           <h2 className="text-2xl font-semibold text-gray-500">
//             Or Drop PDF here
//           </h2>
//         </div>
//       </div>
//     );
//   }

//   // 2. Compress options screen
//   if (file && !downloadUrl) {
//     return (
//       <div className="bg-gray-200 min-h-screen p-5 flex">
//         {/* Left Section - PDF Card */}
        
            
// <div className="w-[75%] bg-gray-50 p-6 rounded-xl shadow min-h-[80vh] mb-20 flex justify-center items-center">
//             <div className="relative  p-8 rounded-xl w-[280px] flex flex-col items-center shadow-md">
                
//                 {/* X Button (top-right corner) */}
//                 <button
//                 onClick={resetAll}
//                 className="absolute top-3 right-3 text-red-600 hover:bg-red-600 hover:text-white border-1 rounded-[5px] "
//                 >
//                 <X size={22} />
//                 </button>

//                 {/* PDF Icon */}
//                 <div className="w-20 h-20 bg-red-100 rounded-lg flex items-center justify-center mb-4">
//                 <img
//                     src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
//                     alt="PDF Icon"
//                     className="w-10 h-10"
//                 />
//                 </div>

//                 {/* File Info */}
//                 <p className="text-lg font-semibold text-gray-800 truncate max-w-[200px] text-center">
//                 {file.name}
//                 </p>
//                 <p className="text-gray-500 text-sm">Original size: {origKb} KB</p>
//             </div>
// </div>


//         {/* Right Section - Status & actions */}
//         <div className="w-[25%]">
//                 <div className="fixed top-20 right-5 bg-white shadow-xl rounded-2xl p-10 flex flex-col items-center">
//                     <p className='font-bold text-3xl mb-5 text-gray-700'>Select One</p>
//                     <hr />
//             {loading && (
//               <div className="flex flex-col items-center mb-4">
//                 <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin mb-2"></div>
//                 <p>Compressing...</p>
//               </div>
//             )}
//                     <p className="text-gray-500 text-center">{status}</p>
                    
//                     {/* Quality buttons */}
//           <div className="flex flex-col gap-4 ">
//             {['high', 'medium', 'low', 'verylow'].map((q) => (
//               <button
//                 key={q}
//                 onClick={() => setSelectedQuality(q)}
//                 className={`w-full py-3 px-6 rounded-xl text-[16px] font-semibold transition
//                 ${selectedQuality === q
//                     ? 'ring-4 ring-offset-2 ring-blue-400'
//                     : ''
//                   }
//                 ${
//                   q === 'high'
//                     ? 'bg-green-600 text-white hover:bg-green-700'
//                     : q === 'medium'
//                     ? 'bg-blue-600 text-white hover:bg-blue-700'
//                     : q === 'low'
//                     ? 'bg-yellow-400 text-black hover:bg-yellow-500'
//                     : 'bg-red-600 text-white hover:bg-red-700'
//                     }
//                       hover:cursor-pointer
//                     `}
//               >
//                 {q === 'high'
//                   ? 'High Quality'
//                   : q === 'medium'
//                   ? 'Medium Quality'
//                   : q === 'low'
//                   ? 'Low Quality'
//                   : 'Very Low Quality'}
//               </button>
//             ))}
//                     </div>
                    

//                      {/* Compress Button */}
//           {selectedQuality && (
//             <button
//               onClick={() => handleCompress(selectedQuality)}
//               className="mt-6 w-full py-4 px-8 bg-purple-600 text-white rounded-xl text-2xl font-semibold hover:bg-purple-700 hover:cursor-pointer"
//             >
//               Compress PDF
//             </button>
//           )}

//             <button
//               onClick={resetAll}
//               className="mt-6 flex items-center text-blue-600 hover:underline"
//             >
//               <ArrowLeft className="mr-2" /> Back
//                     </button>
//                     <style>{`
//           .loader {
//             border-width: 4px;
//             border-color: transparent;
//             border-top-color: #3b82f6;
//             border-radius: 50%;
//             width: 48px;
//             height: 48px;
//             animation: spin 1s linear infinite;
//           }
//           @keyframes spin {
//             0% { transform: rotate(0deg);}
//             100% { transform: rotate(360deg);}
//           }
//         `}</style>
//           </div>
//         </div>

        
//       </div>
//     );
//   }

//   // 3. Download screen
//   return (
//     <div className="bg-gray-200 min-h-screen p-20 flex justify-center items-center">
//       <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-2xl text-center">
//         <button
//           onClick={resetAll}
//           className="flex items-center text-blue-600 hover:underline mb-6"
//         >
//           <ArrowLeft className="mr-2" /> Back to Upload
//         </button>
//         <h2 className="text-3xl font-bold mb-6">Your PDF is ready 🎉</h2>
//         <a
//           href={downloadUrl}
//           download={`compressed-${file.name}`}
//           className="px-10 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
//         >
//           Download PDF
//         </a>
//       </div>
//     </div>
//   );
// }


// src/App.jsx
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ArrowLeft, X } from 'lucide-react';

export default function CompressPDF() {
  const [file, setFile] = useState(null);
  const [origKb, setOrigKb] = useState(null);
  const [status, setStatus] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState(null);

  const dropRef = useRef(null);

  const handleFile = (f) => {
    if (f && f.type === 'application/pdf') {
      setFile(f);
      setOrigKb(Math.round(f.size / 1024));
      setDownloadUrl('');
      setStatus('');
    }
  };

  const handleFiles = (e) => {
    const f = e.target.files[0];
    handleFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    handleFile(f);
  };

  const handleDragOver = (e) => e.preventDefault();

  const resetAll = () => {
    setFile(null);
    setOrigKb(null);
    setStatus('');
    setDownloadUrl('');
    setLoading(false);
    setSelectedQuality(null);
  };

  const handleCompress = async (quality) => {
    if (!file) return alert('Choose a PDF first');
    setLoading(true);
    setStatus(`Compressing (${quality} quality)...`);
    setDownloadUrl('');

    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('quality', quality);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      const resp = await axios.post(
        `${apiUrl}/api/compress/pdf`,
        formData,
        { responseType: 'blob' }
      );

      const blob = new Blob([resp.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setStatus('Compression Done!');
      setLoading(false);

      // auto-download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `compressed-${file.name}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      const message =
        err.response?.data?.error || err.message || 'Compression failed';
      setStatus('Error: ' + message);
      setLoading(false);
    }
  };

  // 1. Upload screen
  if (!file) {
    return (
      <div className="bg-gray-200 min-h-screen p-6 flex flex-col items-center">
        <h1 className="font-bold text-2xl sm:text-3xl text-gray-800 text-center">
          Compress PDF
        </h1>
        <p className="text-[14px] sm:text-[16px] text-gray-600 mt-2 text-center">
          Upload a PDF file to compress it.
        </p>

        <label className="mt-8 inline-block px-6 sm:px-10 py-3 sm:py-5 font-medium bg-blue-800 text-white text-lg sm:text-2xl rounded-2xl cursor-pointer hover:opacity-90">
          Select PDF
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFiles}
          />
        </label>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          ref={dropRef}
          className="mt-6 border-2 border-dashed border-gray-400 rounded-xl p-10 sm:p-20 text-gray-600 bg-gray-100 w-full sm:w-2/3 text-center"
        >
          <h2 className="text-lg sm:text-2xl font-semibold text-gray-500">
            Or Drop PDF here
          </h2>
        </div>
      </div>
    );
  }

  // 2. Compress options screen
  if (file && !downloadUrl) {
    return (
      <div className="bg-gray-200 min-h-screen p-5 flex flex-col lg:flex-row gap-6">
        {/* Left Section - PDF Card */}
        <div className="flex-1 bg-gray-50 p-6 rounded-xl shadow min-h-[60vh] flex justify-center items-center">
          <div className="relative p-6 sm:p-8 rounded-xl w-[220px] sm:w-[280px] flex flex-col items-center shadow-md">
            {/* X Button (top-right corner) */}
            <button
              onClick={resetAll}
              className="absolute top-3 right-3 text-red-600 hover:bg-red-600 hover:text-white rounded-md"
            >
              <X size={22} />
            </button>

            {/* PDF Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                alt="PDF Icon"
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
            </div>

            {/* File Info */}
            <p className="text-base sm:text-lg font-semibold text-gray-800 truncate max-w-[200px] text-center">
              {file.name}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              Original size: {origKb} KB
            </p>
          </div>
        </div>

        {/* Right Section - Status & actions */}
        <div className="w-full lg:w-[30%]">
          <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 flex flex-col items-center sticky top-20">
            <p className="font-bold text-2xl sm:text-3xl mb-5 text-gray-700 text-center">
              Select One
            </p>
            <hr className="w-full mb-4" />

            {loading && (
              <div className="flex flex-col items-center mb-4">
                <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-10 h-10 sm:w-12 sm:h-12 animate-spin mb-2"></div>
                <p>Compressing...</p>
              </div>
            )}
            <p className="text-gray-500 text-center mb-4">{status}</p>

            {/* Quality buttons */}
            <div className="flex flex-col gap-3 w-full">
              {['high', 'medium', 'low', 'verylow'].map((q) => (
                <button
                  key={q}
                  onClick={() => setSelectedQuality(q)}
                  className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-[14px] sm:text-[16px] font-semibold transition 
                    ${selectedQuality === q ? 'ring-4 ring-offset-2 ring-blue-400' : ''}
                    ${q === 'high'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : q === 'medium'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : q === 'low'
                      ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                      : 'bg-red-600 text-white hover:bg-red-700'}
                  `}
                >
                  {q === 'high'
                    ? 'High Quality'
                    : q === 'medium'
                    ? 'Medium Quality'
                    : q === 'low'
                    ? 'Low Quality'
                    : 'Very Low Quality'}
                </button>
              ))}
            </div>

            {/* Compress Button */}
            {selectedQuality && (
              <button
                onClick={() => handleCompress(selectedQuality)}
                className="mt-6 w-full py-3 sm:py-4 px-6 sm:px-8 bg-purple-600 text-white rounded-xl text-lg sm:text-2xl font-semibold hover:bg-purple-700"
              >
                Compress PDF
              </button>
            )}

            <button
              onClick={resetAll}
              className="mt-6 flex items-center text-blue-600 hover:underline"
            >
              <ArrowLeft className="mr-2" /> Back
            </button>
            <style>{`
              .loader {
                border-width: 4px;
                border-color: transparent;
                border-top-color: #3b82f6;
                border-radius: 50%;
                animation: spin 1s linear infinite;
              }
              @keyframes spin {
                0% { transform: rotate(0deg);}
                100% { transform: rotate(360deg);}
              }
            `}</style>
          </div>
        </div>
      </div>
    );
  }

  // 3. Download screen
  return (
    <div className="bg-gray-200 min-h-screen p-6 sm:p-20 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 w-full max-w-xl text-center">
        <button
          onClick={resetAll}
          className="flex items-center text-blue-600 hover:underline mb-6"
        >
          <ArrowLeft className="mr-2" /> Back to Upload
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Your PDF is ready 🎉
        </h2>
        <a
          href={downloadUrl}
          download={`compressed-${file.name}`}
          className="px-6 sm:px-10 py-3 sm:py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}
