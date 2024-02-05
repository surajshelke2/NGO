const { drive } = require('googleapis/build/src/apis/drive');
const { Class } = require('../model/class');
const fileService = require('../service/fileService');

async function upload(req, res) {
  try {
    console.log(req.params.classId)
    const folder = await Class.findById(req.params.classId);
    if (!folder) {
     
      return res.status(404).json({ error: 'Class not found' });
    }
     console.log("FolderId :",folder.folderId)

    const fileId = await fileService.uploadFile(req.file, folder.folderId);
    console.log("fileController:",fileId)
    console.log("File Successfully Added ");
    res.status(200).json({ 
      message: "File Successfully Added",
      folderId: folder.folderId,
      fileId: fileId
    });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


async function  getAllFilesInAFolder(req,res){
  try {
    
    const folder = await Class.findById(req.params.classId);
    if (!folder) {
     
      return res.status(404).json({ error: 'Class not found' });
    }
     console.log("FolderId :",folder.folderId)

     const  files=await fileService.getAllFiles(folder.folderId);
      
     //console.log("files======="+JSON.stringify(files))
     res.status(200).send(files);  

   
    res.json(files);
} catch (error) {
    console.error('Error retrieving folder contents:', error);
    res.status(500).json({ error: 'Internal server error' });
}
};
module.exports = { upload ,getAllFilesInAFolder};
