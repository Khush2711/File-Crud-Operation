const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  fileName: String,
  fileUrl: String,
  publicId: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('File', FileSchema);