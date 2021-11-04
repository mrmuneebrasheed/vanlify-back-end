const mongoose = require("mongoose")

const locationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    coordinates: Object,
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