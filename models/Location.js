const mongoose = require("mongoose")

const locationSchema = new mongoose.Schema({
    coordinates: {
        lat: String,
        lng: String
    },
    images: {
        type: Array,
        required: true
    },
    userId: {
        type: String,
        index: true
    },
    description: String,
    city: String,
    comments: Array
})

module.exports = mongoose.model("User", locationSchema)