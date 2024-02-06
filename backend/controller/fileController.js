const { drive } = require('googleapis/build/src/apis/drive');
const { Class, Unit } = require('../model/class');
const fileService = require('../service/fileService');

async function upload(req, res) {
  try {
  
    const folder = await Unit.findById(req.params.unitId);

    console.log(req.params.unitId)
    if (!folder) {
     
      return res.status(404).json({ error: 'Class not found' });
    }
    
    console.log(folder)

    const fileId = await fileService.uploadFile(req.file, folder.folderId);
   
    
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
    
    const folder = await Class.findById(req.params.unitId);
    if (!folder) {
     
      return res.status(404).json({ error: 'Unit not found' });
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
