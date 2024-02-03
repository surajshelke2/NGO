
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileViewer({ fileId }) {
  const [file, setFile] = useState(null);

  useEffect(() => {
    async function fetchFile() {
      try {
        const response = await axios.get(`/api/files/${fileId}`);
        setFile(response.data);
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    }
    fetchFile();
  }, [fileId]);

  return (
    <div>
      {file && (
        <div>
          <h2>{file.name}</h2>
          <p>MIME Type: {file.mimeType}</p>
          <p><a href={file.webViewLink} target="_blank" rel="noopener noreferrer">View File</a></p>
        </div>
      )}
    </div>
  );
}

export default FileViewer;
