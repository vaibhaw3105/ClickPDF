// import React, { useState, useCallback } from 'react';
// import axios from 'axios';
// import { useDropzone } from 'react-dropzone';

// // --- UI Helper Component to display the list of selected files ---
// const FileList = ({ files, onRemove }) => (
//     <div className="mt-4 space-y-2 max-h-40 overflow-y-auto pr-2">
//         {files.map((file) => (
//             <div key={file.path} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg shadow-sm">
//                 <p className="text-sm text-gray-700 truncate">{file.name} - {Math.round(file.size / 1024)} KB</p>
//                 <button onClick={() => onRemove(file)} className="text-red-500 hover:text-red-700 font-bold ml-2 text-xl leading-none">&times;</button>
//             </div>
//         ))}
//     </div>
// );

// // --- UI Helper Component for the Drag-and-Drop area ---
// const Dropzone = ({ isDragActive }) => (
//     <div className={`flex flex-col items-center justify-center w-full h-40 px-4 py-3 text-gray-600 bg-white border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ${isDragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}>
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//         </svg>
//         <p className="font-medium text-center">
//             {isDragActive ? 'Drop the files here...' : 'Drag & drop PDFs here, or click to select'}
//         </p>
//     </div>
// );

// function PDF_to_JPG() {
//     const [files, setFiles] = useState([]);
//     const [status, setStatus] = useState('');
//     const [isProcessing, setIsProcessing] = useState(false);

//     const onDrop = useCallback(acceptedFiles => {
//         const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf');
//         setFiles(prevFiles => [...prevFiles, ...pdfFiles]);
//         setStatus('');
//     }, []);

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/pdf': ['.pdf'] } });

//     const removeFile = (fileToRemove) => {
//         setFiles(files.filter(file => file !== fileToRemove));
//     };

//     const handleConvert = async () => {
//         if (files.length === 0) {
//             return alert('Please select at least one PDF file to convert.');
//         }
//         setIsProcessing(true);
//         setStatus('Uploading and converting...');

//         const formData = new FormData();
//         files.forEach(file => formData.append("pdfs", file));

//         try {
//             const response = await axios.post("http://localhost:5001/convert", formData, {
//                 responseType: "blob", // Important for downloading the zip file
//             });

//             const url = window.URL.createObjectURL(new Blob([response.data]));
//             const link = document.createElement("a");
//             link.href = url;
//             link.setAttribute("download", "converted_documents.zip");
//             document.body.appendChild(link);
//             link.click();
//             link.parentNode.removeChild(link);
//             window.URL.revokeObjectURL(url);

//             setStatus('Conversion successful! Your download has started.');
//             setFiles([]); // Clear files after successful conversion
//         } catch (error) {
//             let errorMessage = 'An error occurred during conversion.';
//             if (error.response && error.response.data) {
//                 try {
//                     const errorJsonText = await error.response.data.text();
//                     const errorJson = JSON.parse(errorJsonText);
//                     errorMessage = errorJson.error || 'Failed to process files.';
//                 } catch (e) {
//                     console.log(e);
                    
//                     errorMessage = 'Could not parse the error message from the server.';
//                 }
//             }
//             setStatus(`Error: ${errorMessage}`);
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     return (
//         <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
//             <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 space-y-8">
//                 <div className="text-center">
//                     <h1 className="text-4xl font-bold text-gray-800">PDF to Word Converter</h1>
//                     <p className="text-gray-500 mt-2">Upload multiple PDFs and get a single ZIP file with your converted Word documents.</p>
//                 </div>

//                 <div className="space-y-6">
//                     <div {...getRootProps()}>
//                         <input {...getInputProps()} />
//                         <Dropzone isDragActive={isDragActive} />
//                     </div>

//                     {files.length > 0 && <FileList files={files} onRemove={removeFile} />}

//                     <button
//                         onClick={handleConvert}
//                         disabled={isProcessing || files.length === 0}
//                         className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:bg-indigo-300 disabled:cursor-not-allowed"
//                     >
//                         {isProcessing ? 'Processing...' : `Convert ${files.length} File(s) to Word`}
//                     </button>

//                     {status && (
//                         <div className={`text-center p-4 rounded-lg ${status.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
//                             <p className="font-medium">{status}</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </main>
//     );
// }

// export default PDF_to_JPG;


import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import FileList from '../../components/FileList';
import Dropzone from '../../components/Dropzone';

function PDF_to_JPG() {
    const [files, setFiles] = useState([]);
    const [status, setStatus] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        const pdfFiles = acceptedFiles.filter((file) => file.type === 'application/pdf');
        setFiles((prevFiles) => [...prevFiles, ...pdfFiles]);
        setStatus('');
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
    });

    const removeFile = (fileToRemove) => {
        setFiles(files.filter((file) => file !== fileToRemove));
    };

    const handleConvert = async () => {
        if (files.length === 0) {
            return alert('Please select at least one PDF file to convert.');
        }
        setIsProcessing(true);
        setStatus('Uploading and converting...');

        const formData = new FormData();
        files.forEach((file) => formData.append('pdfs', file));

        const apiUrl = import.meta.env.VITE_API_URL;

        try {
            const response = await axios.post(`${apiUrl}/api/pdf-to-jpg`, formData, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'converted_documents.zip');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);

            setStatus('Conversion successful! Your download has started.');
            setFiles([]);
        } catch (error) {
            console.error(error);
            setStatus('Error: Conversion failed.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800">PDF to JPG Converter</h1>
                    <p className="text-gray-500 mt-2">Upload multiple PDFs and get a ZIP with your converted JPG images.</p>
                </div>

                <div className="space-y-6">
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Dropzone isDragActive={isDragActive} />
                    </div>

                    {files.length > 0 && <FileList files={files} onRemove={removeFile} />}

                    <button
                        onClick={handleConvert}
                        disabled={isProcessing || files.length === 0}
                        className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? 'Processing...' : `Convert ${files.length} File(s) to JPG`}
                    </button>

                    {status && (
                        <div
                            className={`text-center p-4 rounded-lg ${
                                status.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                            }`}
                        >
                            <p className="font-medium">{status}</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default PDF_to_JPG;

