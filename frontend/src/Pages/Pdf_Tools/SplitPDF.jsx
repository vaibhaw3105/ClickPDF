import React, { useState } from 'react';
import axios from 'axios';

// --- Helper Components for a Cleaner Look ---

// SVG Icon for the header
const ScissorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 7.879a3 3 0 014.243 0l.002.002a3 3 0 010 4.243L12 18.364l-6.364-6.364a3 3 0 010-4.243l.002-.002a3 3 0 014.243 0L12 10.121l2.121-2.242zM12 10.121l-2.121-2.242" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.121l2.121 2.242M12 18.364V21m-3.182-8.182a3 3 0 01-4.243 0l-.002-.002a3 3 0 010-4.243L12 3.636l2.121 2.243m4.243 4.242a3 3 0 010 4.243l-.002.002a3 3 0 01-4.243 0L12 10.121" />
    </svg>
);

// Custom File Input component
const FileInput = ({ file, onFileChange }) => (
    <div>
        <label htmlFor="pdf-upload" className="block text-sm font-medium text-gray-700 mb-2">
            Select PDF
        </label>
        <label
            htmlFor="pdf-upload"
            className="flex items-center justify-center w-full px-4 py-3 text-gray-600 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-gray-100 hover:border-indigo-400"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span className="font-medium truncate">
                {file ? file.name : 'Click to upload a file'}
            </span>
        </label>
        <input id="pdf-upload" type="file" accept=".pdf" onChange={onFileChange} className="hidden" />
    </div>
);


function App() {
    const [file, setFile] = useState(null);
    const [startPage, setStartPage] = useState('');
    const [endPage, setEndPage] = useState('');
    const [message, setMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !startPage || !endPage) {
            alert('Please fill out all fields and select a PDF file.');
            return;
        }

        setIsProcessing(true);
        setMessage('Processing...');

        const formData = new FormData();
        formData.append('pdf', file);
        formData.append('start', startPage);
        formData.append('end', endPage);

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.post(`${apiUrl}/api/split/pdf`, formData, {
                responseType: 'blob',
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;

            const contentDisposition = response.headers['content-disposition'];
            let fileName = `split_pages_${startPage}_to_${endPage}.pdf`;
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                if (fileNameMatch && fileNameMatch.length === 2) fileName = fileNameMatch[1];
            }

            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);

            setMessage('Download successful!');
        } catch (error) {
            let errorMessage = 'An unknown error occurred.';
            if (error.response && error.response.data) {
                try {
                    const errorText = await error.response.data.text();
                    errorMessage = errorText;
                } catch (e) {
                    console.log(e);
                    
                    errorMessage = 'Could not parse error response from the server.';
                }
            } else if (error.request) {
                errorMessage = 'Cannot connect to the server. Please ensure it is running.';
            } else {
                errorMessage = error.message;
            }
            alert(`Error: ${errorMessage}`);
            setMessage('Failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-2xl p-8 space-y-6">
                {/* --- App Header --- */}
                <div className="text-center space-y-2">
                    <ScissorIcon />
                    <h1 className="text-3xl font-bold text-gray-800">Split PDF</h1>
                    <p className="text-gray-500">Extract a range of pages into a new document.</p>
                </div>

                {/* --- Form --- */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <FileInput file={file} onFileChange={handleFileChange} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="start" className="block text-sm font-medium text-gray-700">Start Page</label>
                            <input type="number" id="start" value={startPage} onChange={(e) => setStartPage(e.target.value)} min="1" required
                                className="w-full mt-1 px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                        </div>
                        <div>
                            <label htmlFor="end" className="block text-sm font-medium text-gray-700">End Page</label>
                            <input type="number" id="end" value={endPage} onChange={(e) => setEndPage(e.target.value)} min="1" required
                                className="w-full mt-1 px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" disabled={isProcessing}
                            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:bg-indigo-300 disabled:cursor-not-allowed disabled:scale-100">
                            {isProcessing ? 'Processing...' : 'Split and Download'}
                        </button>
                    </div>
                </form>

                {/* --- Status Message --- */}
                {message && (
                    <p className={`text-center font-medium ${message.includes('successful') ? 'text-green-600' : 'text-gray-600'}`}>
                        {message}
                    </p>
                )}
            </div>
        </main>
    );
}

export default App;

