
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const { classId } = useParams();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/class/subject/unit/content/file/upload/${classId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button
        className={classNames(
          'bg-red-500',
          'text-white',
          'px-4',
          'py-2',
          'rounded-md',
          'hover:bg-red-600',
          'focus:outline-none',
          'focus:ring-2',
          'focus:ring-red-500',
          'focus:ring-opacity-50'
        )}
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
