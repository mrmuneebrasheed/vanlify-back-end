const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    coordinates: {
        lat: Number,
        lng: Number
    },
    images: {
        type: Array,
        required: true,
    },
    userId: {
        type: String,
        index: true,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    description: String,
    address: String,
    type: String,
    comments: Array,
});

module.exports = mongoose.model("Location", locationSchema);