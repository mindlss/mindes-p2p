const mongoose = require('mongoose');

// Schema for file offers
const FileOfferSchema = new mongoose.Schema(
    {
        uuid: {
            type: mongoose.SchemaTypes.String,
            required: true,
            unique: true,
        },
        serviceId: {
            type: mongoose.SchemaTypes.String,
            required: true,
            unique: true,
        },
        fileName: {
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
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('fileOffers', FileOfferSchema);
