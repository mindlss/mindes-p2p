const mongoose = require('mongoose');

const FileOfferSchema = new mongoose.Schema({
    uuid: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    filename: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    fileExtextension: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    fileSize: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date(),
    },
});

module.exports = mongoose.model('fileOffers', FileOfferSchema);
