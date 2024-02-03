const { createFolder } = require("../service/fileService");


async function createClassFolder(className, classCode) {
  try {
    const folderName = `Class ${className} ${classCode}`;
    // Assuming process.env.FOLDER_ID is properly set
    const folderId = await createFolder(folderName, process.env.FOLDER_ID);
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

module.exports = { createClassFolder };
