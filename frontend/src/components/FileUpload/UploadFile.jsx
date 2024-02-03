import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import classNames from "classnames";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const[contentTitle, setContentTitle] = useState('');
  const { classId } = useParams();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append('contentTitle',contentTitle);

    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/class/subject/unit/content/file/upload/${classId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div class="flex flex-col md:flex-row md:justify-between p-8 bg-gray-200">
    <div class="w-full md:w-1/3 md:mr-4 bg-white rounded-md overflow-hidden shadow-md p-4 mb-4 md:mb-0">
        <label for="Heading" class="block mb-2">Add Title</label>
        <input
          type="text"
          id="Heading"
          value={contentTitle}
          onChange={(e) => setContentTitle(e.target.value)}
          placeholder="Enter a title for your file..."
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
    </div>
  
    <div class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <input type="file" class="hidden" id="fileInput" onchange={handleFileChange} />
        <label for="fileInput" class="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out">Choose File</label>
        <button class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out" onclick={handleUpload}>Upload</button>
    </div>
</div>

  
  
  );
};

export default FileUpload;