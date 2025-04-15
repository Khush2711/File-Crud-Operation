// const cloudinary = require("../config/cloudinary");
const File = require("../model/file");
const cloudinary = require('cloudinary').v2;

const uploadFile = async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({
                message: 'No file uploaded'
            });
        }

        const file = req.files.file;

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'uploads'
        });

        const newFile = new File({
            fileName: file.name,
            fileUrl: result.secure_url,
            publicId: result.public_id
        });

        await newFile.save();

        res.status(201).json(newFile);

    } catch (error) {
        console.log("Error...............", error)
        res.status(500).json({
            error: error.message
        });
    }
}

const getFileById = async (req, res) => {
    try {
        const files = await File.find().sort({ uploadedAt: -1 });
        res.json(files);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const getAllFiles = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({
                message: 'File not found'
            });
        }
        res.json(file);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const updateFileName = async (req, res) => {
    try {
        const { fileName } = req.body;
        if (!fileName) {
            return res.status(400).json({
                message: 'fileName is required'
            });
        }

        const updatedFile = await File.findByIdAndUpdate(
            req.params.id,
            { fileName },
            { new: true }
        );

        if (!updatedFile) {
            return res.status(404).json({
                message: 'File not found'
            });
        }

        res.status(200).json(updatedFile);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


const deleteFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({
                message: 'File not found'
            });
        }

        await cloudinary.uploader.destroy(file.publicId);
        await File.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'File deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


module.exports = {
    uploadFile,
    getAllFiles,
    getFileById,
    updateFileName,
    deleteFile
};