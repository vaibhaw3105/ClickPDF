
// import React, { useState } from 'react';
// import axios from 'axios';
// import { ArrowLeft, X } from 'lucide-react';

// const JPG_to_PDF = () => {
//   const [files, setFiles] = useState([]);
//   const [downUrl, setDownUrl] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Options
//   const [orientation, setOrientation] = useState("portrait");
//   const [pageSize, setPageSize] = useState("A4");
//   const [margin, setMargin] = useState("no-margin");

//   const handleFiles = (newFiles) => {
//     setFiles([...files, ...Array.from(newFiles)]);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     handleFiles(e.dataTransfer.files);
//   };

//   const resetAll = () => {
//     setFiles([]);
//     setDownUrl('');
//     setLoading(false);
//   };

//   const handleUpload = async () => {
//     if (!files.length) {
//       alert("Please select at least one file.");
//       return;
//     }

//     setLoading(true);
//     setDownUrl("");

//     try {
//       const fd = new FormData();
//       files.forEach((file) => fd.append("images", file));
//       fd.append("orientation", orientation);
//       fd.append("pageSize", pageSize);
//       fd.append("margin", margin);

//       const apiUrl = import.meta.env.VITE_API_URL;

//       const resp = await axios.post(`${apiUrl}/api/convert/images-to-pdf`, fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//         responseType: "blob",
//       });

//       const blob = new Blob([resp.data], { type: "application/pdf" });
//       const url = URL.createObjectURL(blob);
//       setDownUrl(url);

//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "converted.pdf");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.error || "Conversion failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 1. No file uploaded -> Upload UI
  
//   if (files.length === 0) {
//     return (
//       <div className="bg-gray-200 min-h-screen p-10">
//         <div className="text-center">
//           <h1 className="font-bold text-5xl text-gray-800">JPG to PDF</h1>
//           <p className="text-2xl mt-2 text-gray-600">
//             Convert JPG images to PDF in seconds.
//           </p>
//           <label className="mt-6 inline-block px-10 py-5 font-medium bg-[#1b2c8d] text-white text-2xl rounded-2xl cursor-pointer hover:opacity-90">
//             Select JPG images
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               className="hidden"
//               onChange={(e) => handleFiles(e.target.files)}
//             />
//           </label>
//           <div
//             onDrop={handleDrop}
//             onDragOver={(e) => e.preventDefault()}
//             className="mt-6 border-2 border-dashed border-gray-400 rounded-xl p-20 text-gray-600 bg-gray-100 mx-auto w-2/3"
//           >
//             <h2 className='text-2xl font-semibold text-gray-500'>Or Drop images here</h2>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // 2. After file upload but before conversion -> Options UI
//   if (files.length > 0 && !downUrl) {
//     return (
//       <div className="bg-gray-200 min-h-screen p-5 flex">
//         {/* Left Section */}
//         <div className="w-[75%] pr-6">
//           <div className='flex flex-col items-center mb-4'>
//             <label className="mt-2 inline-block px-10 py-3 font-medium bg-[#1b2c8d] text-white text-2xl rounded-2xl cursor-pointer hover:opacity-90">
//               Add more images
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 className="hidden"
//                 onChange={(e) => handleFiles(e.target.files)}
//               />
//             </label>
//             <div
//               onDrop={handleDrop}
//               onDragOver={(e) => e.preventDefault()}
//               className="mt-2 border-2 border-dashed border-gray-400 rounded-xl p-15 w-[80%] text-gray-600 bg-gray-100"
//             >
//               <h2 className='text-xl font-semibold text-gray-500'>Or Drop images here</h2>
//             </div>
//           </div>

//           <div className="w-full mt-4 p-4 rounded-lg">
//             <p className="mt-4 text-gray-600 font-semibold mb-5">
//               Files Uploaded: {files.length}
//             </p>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
//               {files.map((file, index) => (
//                 <div
//                   key={index}
//                   className="relative flex flex-col items-center hover:border-2 bg-white hover:border-amber-500 border-1 p-4 rounded-lg shadow-sm hover:shadow-lg transition"
//                 >
//                   <button
//                     onClick={() => setFiles((prev) => prev.filter((_, i) => i !== index))}
//                     className="absolute top-2 right-2 bg-white border border-red-500 rounded-full hover:bg-red-500"
//                   >
//                     <X className='w-6 h-6 text-red-500 hover:text-white' />
//                   </button>
//                   <img
//                     src={URL.createObjectURL(file)}
//                     alt="preview"
//                     className="rounded-lg shadow-md w-32 h-32 object-contain"
//                   />
//                   <p className="mt-2 text-sm text-gray-700 font-medium truncate w-full text-center">
//                     {file.name}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* again pasted the  code for file upload */}
          
//            <div className='flex flex-col items-center mt-20 mb-4'>
//             <label className="mt-2 inline-block px-10 py-3 font-medium bg-[#1b2c8d] text-white text-2xl rounded-2xl cursor-pointer hover:opacity-90">
//               Add more images
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 className="hidden"
//                 onChange={(e) => handleFiles(e.target.files)}
//               />
//             </label>
//             <div
//               onDrop={handleDrop}
//               onDragOver={(e) => e.preventDefault()}
//               className="mt-2 border-2 border-dashed border-gray-400 rounded-xl p-15 w-[80%] text-gray-600 bg-gray-100"
//             >
//               <h2 className='text-xl font-semibold text-gray-500'>Or Drop images here</h2>
//             </div>
//           </div>


//         </div>

//         {/* Right Section */}
//         <div className="w-[25%] p-2">
//           <div className="fixed top-20 right-5  bg-white shadow-xl rounded-2xl p-4">
//             <h2 className="text-2xl font-semibold mb-4">Image to PDF options</h2>
//             <hr />

//             {/* Orientation */}
//             <div className="mb-4 mt-2">
//               <p className="font-medium mb-2">Page orientation</p>
//               <div className="flex space-x-4">
//                 <button
//                   className={`px-4 py-2 border rounded-lg ${orientation === "portrait" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
//                   onClick={() => setOrientation("portrait")}
//                 >
//                   Portrait
//                 </button>
//                 <button
//                   className={`px-4 py-2 border rounded-lg ${orientation === "landscape" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
//                   onClick={() => setOrientation("landscape")}
//                 >
//                   Landscape
//                 </button>
//               </div>
//             </div>

//             {/* Page Size */}
//             <div className="mb-4 mt-2">
//               <p className="font-medium mb-2">Page size</p>
//               <select
//                 value={pageSize}
//                 onChange={(e) => setPageSize(e.target.value)}
//                 className="border p-2 rounded-lg w-full"
//               >
//                 <option value="fit">Fit (Same size as image)</option>
//                 <option value="A4">A4 (210x297 mm)</option>
//                 <option value="Letter">US Letter (215x279 mm)</option>
//               </select>
//             </div>

//             {/* Margin */}
//             <div className="mb-4 mt-2">
//               <p className="font-medium mb-2">Margin</p>
//               <div className="flex space-x-4">
//                 {["no-margin", "small", "big"].map((m) => (
//                   <button
//                     key={m}
//                     className={`px-4 py-2 border rounded-lg capitalize ${margin === m ? "bg-blue-600 text-white" : "bg-gray-100"}`}
//                     onClick={() => setMargin(m)}
//                   >
//                     {m.replace("-", " ")}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Convert Button */}
//             <button
//               disabled={loading}
//               onClick={handleUpload}
//               className="mt-6 px-10 py-4 bg-red-600 text-white text-2xl rounded-xl font-semibold hover:bg-red-700 disabled:opacity-50"
//             >
//               {loading ? "Converting…" : "Convert to PDF"}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // 3. After conversion -> Download Page
//   return (
//     <div className="bg-gray-200 min-h-screen p-20 flex justify-center items-center">
//       <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-2xl text-center">
//         <button
//           onClick={resetAll}
//           className="flex items-center text-blue-600 hover:underline mb-6"
//         >
//           <ArrowLeft className="mr-2" /> Back to JPG Upload
//         </button>
//         <h2 className="text-3xl font-bold mb-6">Your PDF is ready 🎉</h2>
//         <a
//           href={downUrl}
//           download="converted.pdf"
//           className="px-10 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
//         >
//           Download PDF
//         </a>
//       </div>
//     </div>
//   );
// };

// export default JPG_to_PDF;


import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, X, UploadCloud } from 'lucide-react';

const App = () => {
  const [files, setFiles] = useState([]);
  const [downUrl, setDownUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // Options
  const [orientation, setOrientation] = useState("portrait");
  const [pageSize, setPageSize] = useState("A4");
  const [margin, setMargin] = useState("no-margin");

  const handleFiles = (newFiles) => {
    setFiles([...files, ...Array.from(newFiles)]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const resetAll = () => {
    setFiles([]);
    setDownUrl('');
    setLoading(false);
  };

  const handleUpload = async () => {
    if (!files.length) {
      alert("Please select at least one file.");
      return;
    }

    setLoading(true);
    setDownUrl("");

    try {
      const fd = new FormData();
      files.forEach((file) => fd.append("images", file));
      fd.append("orientation", orientation);
      fd.append("pageSize", pageSize);
      fd.append("margin", margin);

      // Kept axios as requested
      // NOTE: Replace with your actual API endpoint if it's different
      // const apiUrl = '/api/convert/images-to-pdf';
      const apiUrl = import.meta.env.VITE_API_URL;

      const resp = await axios.post(`${apiUrl}/api/convert/images-to-pdf`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });

      const blob = new Blob([resp.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownUrl(url);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "converted.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Conversion failed");
    } finally {
      setLoading(false);
    }
  };

  // 1. No file uploaded -> Upload UI
  if (files.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen p-4 sm:p-10 flex items-center justify-center">
        <div className="text-center w-full max-w-3xl">
          <h1 className="font-bold text-3xl sm:text-5xl text-gray-800">JPG to PDF</h1>
          <p className="text-lg sm:text-2xl mt-2 text-gray-600">
            Convert JPG images to PDF in seconds.
          </p>
          <label className="mt-8 inline-block px-8 py-4 sm:px-10 sm:py-5 font-medium bg-blue-600 text-white text-lg sm:text-2xl rounded-2xl cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
            Select JPG images
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="mt-6 border-2 border-dashed border-gray-400 rounded-xl p-10 sm:p-20 text-gray-600 bg-white mx-auto w-full"
          >
            <UploadCloud className="w-16 h-16 mx-auto text-gray-400" />
            <h2 className='text-xl sm:text-2xl font-semibold text-gray-500 mt-4'>Or Drop images here</h2>
          </div>
        </div>
      </div>
    );
  }

  // 2. After file upload but before conversion -> Options UI
  if (files.length > 0 && !downUrl) {
    return (
      <div className="bg-gray-100 min-h-screen p-4 sm:p-5 flex flex-col lg:flex-row gap-6">
        {/* Left Section - File Previews */}
        <div className="w-full lg:w-3/4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h1 className='mb-3 text-gray-600'><span className='text-red-500 font-bold'>Note:</span> Select only Images</h1>
            <p className="text-gray-600 font-semibold mb-4">
              Files Uploaded: {files.length}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="relative group flex flex-col items-center bg-gray-50 border p-2 rounded-lg shadow-sm transition-all duration-300"
                >
                  <button
                    onClick={() => setFiles((prev) => prev.filter((_, i) => i !== index))}
                    className="absolute top-1 right-1 bg-white border border-red-500 rounded-full hover:bg-red-500 text-red-500 hover:text-white transition-colors z-10 opacity-0 group-hover:opacity-100"
                  >
                    <X className='w-5 h-5' />
                  </button>
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="rounded-md w-28 h-28 object-contain"
                  />
                  <p className="mt-2 text-xs text-gray-700 font-medium truncate w-full text-center">
                    {file.name}
                  </p>
                </div>
              ))}
              <label className="flex flex-col items-center justify-center w-full h-32 sm:h-auto border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                  <div className="text-center">
                      <UploadCloud className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">Add more</p>
                  </div>
                  <input type="file" onChange={(e) => handleFiles(e.target.files)} multiple className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* Right Section - Options */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white shadow-xl rounded-2xl p-6 lg:sticky lg:top-5">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Image to PDF options</h2>
            <hr />

            {/* Orientation */}
            <div className="my-4">
              <p className="font-medium mb-2 text-gray-700">Page orientation</p>
              <div className="flex space-x-2">
                <button
                  className={`w-full py-2 border rounded-lg transition-colors ${orientation === "portrait" ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 hover:bg-gray-200"}`}
                  onClick={() => setOrientation("portrait")}
                >
                  Portrait
                </button>
                <button
                  className={`w-full py-2 border rounded-lg transition-colors ${orientation === "landscape" ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 hover:bg-gray-200"}`}
                  onClick={() => setOrientation("landscape")}
                >
                  Landscape
                </button>
              </div>
            </div>

            {/* Page Size */}
            <div className="mb-4">
              <p className="font-medium mb-2 text-gray-700">Page size</p>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
                className="border p-2 rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-blue-500"
              >
                <option value="fit">Fit (Same size as image)</option>
                <option value="A4">A4 (210x297 mm)</option>
                <option value="Letter">US Letter (215x279 mm)</option>
              </select>
            </div>

            {/* Margin */}
            <div className="mb-4">
              <p className="font-medium mb-2 text-gray-700">Margin</p>
              <div className="flex flex-wrap gap-2">
                {["no-margin", "small", "big"].map((m) => (
                  <button
                    key={m}
                    className={`flex-grow px-4 py-2 border rounded-lg capitalize transition-colors ${margin === m ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 hover:bg-gray-200"}`}
                    onClick={() => setMargin(m)}
                  >
                    {m.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Convert Button */}
            <button
              disabled={loading}
              onClick={handleUpload}
              className="mt-6 w-full py-4 bg-red-600 text-white text-xl rounded-xl font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
            >
              {loading ? "Converting…" : "Convert to PDF"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. After conversion -> Download Page
  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-10 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 w-full max-w-2xl text-center">
        <button
          onClick={resetAll}
          className="flex items-center text-blue-600 hover:underline mb-6 group mx-auto"
        >
          <ArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" /> Back to JPG Upload
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Your PDF is ready 🎉</h2>
        <a
          href={downUrl}
          download="converted.pdf"
          className="inline-block w-full sm:w-auto px-10 py-4 bg-green-600 text-white text-lg rounded-xl font-semibold hover:bg-green-700 transition-colors duration-300 shadow-lg"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
};

// Renamed component to App for convention, but you can change it back to JPG_to_PDF if you prefer.
export default App;

