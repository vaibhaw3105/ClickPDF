// src/components/Dropzone.jsx
import React from 'react';

const Dropzone = ({ isDragActive }) => (
    <div
        className={`flex flex-col items-center justify-center w-full h-40 px-4 py-3 text-gray-600 bg-white border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ${
            isDragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
        }`}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mb-2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
        </svg>
        <p className="font-medium text-center">
            {isDragActive ? 'Drop the files here...' : 'Drag & drop PDFs here, or click to select'}
        </p>
    </div>
);

export default Dropzone;
