

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ViewFilesInFolder = () => {
    const [files, setFiles] = useState([]);
    const { classId } = useParams();

    useEffect(() => {
      const fetchFiles = async () => {
          try {
              const res = await axios.get(`http://192.168.59.242:4000/api/v1/class/subject/unit/content/file/gets/${classId}`);
              setFiles(res.data);
              console.log(res.data)
          } catch (error) {
              console.error('Error fetching files:', error);
          }
      };

      fetchFiles();
  }, []);


    return (
        <div className="max-w-4xl mx-auto">
            {files.length > 0 ? (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Contents of the folder:</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {files.map(file => (
                            <div key={file.id} className="bg-white shadow-md rounded-md p-4">
                                <strong className="block text-xl mb-2">{file.name}</strong>
                                <p className="text-gray-700">File ID: {file.id}</p>
                                <p className="text-gray-700">File Type: {file.mimeType}</p>
                                <div className="mt-4">
                                    <a href={`https://drive.google.com/uc?export=download&id=${file.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 mr-2" target="_blank" rel="noopener noreferrer">Download</a>
                                    <a href={`https://drive.google.com/file/d/${file.id}/view`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105" target="_blank" rel="noopener noreferrer">View</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>The folder is empty.</p>
            )}
        </div>
    );
};

export default ViewFilesInFolder;
