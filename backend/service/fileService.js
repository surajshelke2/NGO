const { google } = require('googleapis');
const fs = require('fs');
const apikeys = require('../Api/apiKey.json');
const File = require('../model/fileModel');



const SCOPE = ["https://www.googleapis.com/auth/drive"];

async function authorize() {
  const jwtClient = new google.auth.JWT(
    apikeys.client_email,
    null,
    apikeys.private_key,
    SCOPE
  );
  await jwtClient.authorize();
  return jwtClient;
}

async function uploadFile(file, folderId, next) {
  try {
    const mimeType = file.mimeType ||'application/pdf'; // Default MIME type to application/pdf if not provided
    const auth = await authorize(); // Authorize and get the authentication credentials

    const drive = google.drive({ // Initialize the drive variable here
      version: 'v3',
      auth: auth,
    });
    
    const fileMetadata = {
      name: file.originalname,
      parents: [folderId],
    };

    const media = {
      mimeType: mimeType,
      body: fs.createReadStream(file.path),
    };
   
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });

    const fileId = response.data.id;

    // Save file information to MongoDB
    const newFile = await File.create({
      originalname: file.originalname,
      mimeType: mimeType,
      fileId: fileId,
    });

    fs.unlinkSync(file.path);
  
    return fileId;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Error uploading file to Google Drive');
  }
}

async function createFolder(folderName, folderId, next) {
  try {
    const auth = await authorize();
  
    const drive = google.drive({
      version: 'v3',
      auth: auth,
    });
  
    const folderIds = [];
    if (folderId) { // Check if folderId is truthy (not null or undefined)
      folderIds.push(folderId);
    }
  
    const fileMetadata = {
      'name': folderName,
      'mimeType': 'application/vnd.google-apps.folder',
      'parents': folderIds
    };
  
    const response = await drive.files.create({
      resource: fileMetadata,
      fields: 'id',
    });
  
    const fileId = response.data.id;
    console.log('Folder Id: ', fileId);
    return fileId;
  } catch (error) {
    console.error("Error creating folder:", error);
    throw new Error('Error creating folder on Google Drive');
  }
}

module.exports = { uploadFile, createFolder };
