const express = require('express');
const router = express.Router();
const FileOffer = require('../database/schemas/FileOffer');

// API routes
router.get('/getFileInfo/:uuid', async function (req, res) {
    try {
        const fileOffer = await FileOffer.findOne({
            serviceId: req.params.uuid,
        });
        const fileData = {
            filename: fileOffer.fileName,
            filesize: fileOffer.fileSize,
            uuid: fileOffer.uuid,
        };
        res.status(200).json(fileData);
    } catch (error) {
        res.status(400).json({ message: 'Offer not found' });
    }
});

module.exports = router;
