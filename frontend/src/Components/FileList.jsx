// src/components/FileList.jsx
import React from 'react';

const FileList = ({ files, onRemove }) => (
    <div className="mt-4 space-y-2 max-h-40 overflow-y-auto pr-2">
        {files.map((file) => (
            <div
                key={file.path || file.name}
                className="flex items-center justify-between bg-gray-50 p-2 rounded-lg shadow-sm"
            >
                <p className="text-sm text-gray-700 truncate">
                    {file.name} - {Math.round(file.size / 1024)} KB
                </p>
                <button
                    onClick={() => onRemove(file)}
                    className="text-red-500 hover:text-red-700 font-bold ml-2 text-xl leading-none"
                >
                    &times;
                </button>
            </div>
        ))}
    </div>
);

export default FileList;
