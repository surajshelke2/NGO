const mongoose = require('mongoose');


const fileSchema = new mongoose.Schema({
  originalname: { type: String, required: true },
  mimeType: { type: String, required: true },
  fileId: { type: String },
  fileURL: { type: String },
});

// Create a Mongoose model based on the schema
const File = mongoose.model('File', fileSchema);

// Export the model
module.exports = File;
