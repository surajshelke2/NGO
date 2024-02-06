const { createFolder } = require("../service/fileService");


async function createClassFolder(className, classCode, foldId) {
  try {
    const folderName = `Class ${className} ${classCode}`;
    // Assuming process.env.FOLDER_ID is properly set
    const folderId = await createFolder(folderName,foldId );
    if (!folderId) {
      console.log("Class folder is not created");
      
    } else {
      console.log("Class folder is created successfully");
      return folderId;
    }
  } catch (error) {
    throw new Error("Error creating class folder");
  }
}

async function createOtherFolder(className, classCode, foldId) {
  try {
    const folderName = `${className} ${classCode}`;
    // Assuming process.env.FOLDER_ID is properly set
    const folderId = await createFolder(folderName,foldId );
    if (!folderId) {
      console.log("Class folder is not created");
      
    } else {
      console.log("Class folder is created successfully");
      return folderId;
    }
  } catch (error) {
    throw new Error("Error creating class folder");
  }
}


module.exports = { createClassFolder ,createOtherFolder };
