const { google } = require('googleapis');
const fs = require('fs');
const File = require('../model/fileModel');
const apikeys = require('../Api/apiKey.json')

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

async function uploadFile(file, folderId, contentTitle, next) { // Pass contentTitle as a parameter
  try {
    const mimeType = file.mimeType || 'application/pdf';
    const auth = await authorize();
    const drive = google.drive({
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
    if (folderId) {
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


async  function getAllFiles(folderId){

  const auth = await authorize();
  const drive = google.drive({
    version: 'v3',
    auth: auth,
  })

  const response = await drive.files.list({
    q: `'${folderId}' in parents`,
    fields: 'files(id, name, mimeType)'
});
 const files = response.data.files;
 console.log(response.data);
 return files;
  
}

module.exports = { uploadFile, createFolder,getAllFiles };
