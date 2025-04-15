const cloudinary = require("../config/cloudinary");
const express = require('express');
const router = express.Router();
const {
    uploadFile,
    getAllFiles,
    getFileById,
    updateFileName,
    deleteFile
} = require("../controllers/fileHandling")

// Create - Upload File
router.post('/files', uploadFile);

// Read - All Files
router.get('/files', getFileById);

// Read - Single File
router.get('/files/:id', getAllFiles);

// Update - Rename File (metadata only)
router.put('/files/:id', updateFileName);


router.delete('/files/:id', deleteFile);

module.exports = router;