// import React, { useState } from 'react';
// import axios from 'axios';
// import { ArrowLeft, X } from 'lucide-react';

// const MergePDF = () => {
//   const [files, setFiles] = useState([]);
//   const [downUrl, setDownUrl] = useState('');
//   const [loading, setLoading] = useState(false);

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
//       alert("Please select at least one PDF file.");
//       return;
//     }

//     setLoading(true);
//     setDownUrl("");

//     try {
//       const fd = new FormData();
//       files.forEach((file) => fd.append("pdfs", file)); // use "pdfs"

//       const apiUrl = import.meta.env.VITE_API_URL;

//       const resp = await axios.post(`${apiUrl}/api/convert/merge/pdfs`, fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//         responseType: "blob",
//       });

//       const blob = new Blob([resp.data], { type: "application/pdf" });
//       const url = URL.createObjectURL(blob);
//       setDownUrl(url);

//       // auto-download
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "merged.pdf");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.error || "Merging failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 1. No file uploaded -> Upload UI
//   if (files.length === 0) {
//     return (
//       <div className="bg-gray-200 min-h-screen p-10">
//         <div className="text-center">
//           <h1 className="font-bold text-5xl text-gray-800">Merge PDFs</h1>
//           <p className="text-2xl mt-2 text-gray-600">
//             Upload multiple PDF files and merge them into one.
//           </p>
//           <label className="mt-6 inline-block px-10 py-5 font-medium bg-[#1b2c8d] text-white text-2xl rounded-2xl cursor-pointer hover:opacity-90">
//             Select PDF files
//             <input
//               type="file"
//               accept="application/pdf"
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
//             <h2 className='text-2xl font-semibold text-gray-500'>Or Drop PDF files here</h2>
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
//               Add more PDFs
//               <input
//                 type="file"
//                 accept="application/pdf"
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
//               <h2 className='text-xl font-semibold text-gray-500'>Or Drop PDFs here</h2>
//             </div>
//           </div>

//           <div className="w-full mt-4 p-4 rounded-lg">
//             <p className="mt-4 text-gray-600 font-semibold mb-5">
//               Files Uploaded: {files.length}
//             </p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
//                   <p className="mt-2 text-sm text-gray-700 font-medium truncate w-full text-center">
//                     {file.name}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="w-[25%] p-2">
//           <div className="fixed md:top-20  lg:top-20 right-5 sm:bottom-20 sm:h-max-100 bg-white shadow-xl rounded-2xl p-4">
//             <h2 className="text-2xl font-semibold mb-4">Merge PDF</h2>
//             <hr />
//             <button
//               disabled={loading}
//               onClick={handleUpload}
//               className="mt-6 px-10 py-4 bg-red-600 text-white text-2xl rounded-xl font-semibold hover:bg-red-700 disabled:opacity-50"
//             >
//               {loading ? "Merging…" : "Merge PDFs"}
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
//           <ArrowLeft className="mr-2" /> Back to PDF Upload
//         </button>
//         <h2 className="text-3xl font-bold mb-6">Your merged PDF is ready 🎉</h2>
//         <a
//           href={downUrl}
//           download="merged.pdf"
//           className="px-10 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
//         >
//           Download PDF
//         </a>
//       </div>
//     </div>
//   );
// };

// export default MergePDF;



import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, X } from 'lucide-react';

const MergePDF = () => {
  const [files, setFiles] = useState([]);
  const [downUrl, setDownUrl] = useState('');
  const [loading, setLoading] = useState(false);

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
      alert("Please select at least one PDF file.");
      return;
    }

    setLoading(true);
    setDownUrl("");

    try {
      const fd = new FormData();
      files.forEach((file) => fd.append("pdfs", file));

      const apiUrl = import.meta.env.VITE_API_URL;

      const resp = await axios.post(`${apiUrl}/api/convert/merge/pdfs`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });

      const blob = new Blob([resp.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownUrl(url);

      // auto-download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "merged.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Merging failed");
    } finally {
      setLoading(false);
    }
  };

  // ------------------ 1. No file uploaded -> Upload UI ------------------
  if (files.length === 0) {
    return (
      <div className="bg-gray-200 min-h-screen p-10">
        <div className="text-center">
          <h1 className="font-bold text-5xl text-gray-800">Merge PDFs</h1>
          <p className="text-2xl mt-2 text-gray-600">
            Upload multiple PDF files and merge them into one.
          </p>
          <label className="mt-6 inline-block px-10 py-5 font-medium bg-[#1b2c8d] text-white text-2xl rounded-2xl cursor-pointer hover:opacity-90">
            Select PDF files
            <input
              type="file"
              accept="application/pdf"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="mt-6 border-2 border-dashed border-gray-400 rounded-xl p-20 text-gray-600 bg-gray-100 mx-auto w-2/3"
          >
            <h2 className='text-2xl font-semibold text-gray-500'>Or Drop PDF files here</h2>
          </div>
        </div>
      </div>
    );
  }

  // ------------------ 2. Options Screen ------------------
  if (files.length > 0 && !downUrl) {
    return (
      <div className="bg-gray-200 min-h-screen p-5 flex flex-col md:flex-row">
        
        {/* Left Section */}
        <div className="w-full md:w-[75%] md:pr-6">
          <div className='flex flex-col items-center mb-4'>
            <label className="mt-2 inline-block px-10 py-3 font-medium bg-[#1b2c8d] text-white text-2xl rounded-2xl cursor-pointer hover:opacity-90">
              Add more PDFs
              <input
                type="file"
                accept="application/pdf"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="mt-2 border-2 border-dashed border-gray-400 rounded-xl p-15 w-[80%] text-gray-600 bg-gray-100"
            >
              <h2 className='text-xl font-semibold text-gray-500'>Or Drop PDFs here</h2>
            </div>
          </div>

          <div className="w-full mt-4 p-4 rounded-lg">
            <p className="mt-4 text-gray-600 font-semibold mb-5">
              Files Uploaded: {files.length}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center hover:border-2 bg-white hover:border-amber-500 border-1 p-4 rounded-lg shadow-sm hover:shadow-lg transition"
                >
                  <button
                    onClick={() => setFiles((prev) => prev.filter((_, i) => i !== index))}
                    className="absolute top-2 right-2 bg-white border border-red-500 rounded-full hover:bg-red-500"
                  >
                    <X className='w-6 h-6 text-red-500 hover:text-white' />
                  </button>
                  <p className="mt-2 text-sm text-gray-700 font-medium truncate w-full text-center">
                    {file.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        

        <div className="hidden md:block w-[25%] p-2">
  <div className="fixed md:top-20 lg:top-20 right-5">
    <button
      disabled={loading}
      onClick={handleUpload}
      className="px-10 py-4 bg-red-600 text-white text-2xl rounded-xl font-semibold hover:bg-red-700 disabled:opacity-50"
    >
      {loading ? "Merging…" : "Merge PDFs"}
    </button>
  </div>
</div>


        {/* Floating Merge Button for Mobile (<768px) */}
        <div className="md:hidden fixed bottom-5 right-5 z-50">
          <button
            disabled={loading}
            onClick={handleUpload}
            className="px-6 py-4 bg-red-600 text-white text-lg rounded-full font-semibold shadow-lg hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Merging…" : "Merge PDFs"}
          </button>
        </div>
      </div>
    );
  }

  // ------------------ 3. After conversion -> Download Page ------------------
  // return (
  //   <div className="bg-gray-200 min-h-screen p-20 flex justify-center items-center">
  //     <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-2xl text-center">
  //       <button
  //         onClick={resetAll}
  //         className="flex items-center text-blue-600 hover:underline mb-6"
  //       >
  //         <ArrowLeft className="mr-2" /> Back to PDF Upload
  //       </button>
  //       <h2 className="text-3xl font-bold mb-6">Your merged PDF is ready 🎉</h2>
  //       <a
  //         href={downUrl}
  //         download="merged.pdf"
  //         className="px-10 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
  //       >
  //         Download PDF
  //       </a>
  //     </div>
  //   </div>
  // );

  return (
  <div className="bg-gray-200 min-h-screen flex justify-center items-center p-4 sm:p-10">
    <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 w-full max-w-2xl text-center">
      {/* Back button */}
      <button
        onClick={resetAll}
        className="flex items-center text-blue-600 hover:underline mb-4 sm:mb-6 text-sm sm:text-base"
      >
        <ArrowLeft className="mr-2 w-4 h-4 sm:w-5 sm:h-5" /> Back to PDF Upload
      </button>

      {/* Heading */}
      <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6">
        Your merged PDF is ready 🎉
      </h2>

      {/* Download button */}
      <a
        href={downUrl}
        download="merged.pdf"
        className="w-full sm:w-auto block sm:inline-block px-6 sm:px-10 py-3 sm:py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 text-sm sm:text-base"
      >
        Download PDF
      </a>
    </div>
  </div>
);

};

export default MergePDF;
