const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    city: String,
    bio: String,
    avatar: String
})

module.exports = mongoose.model("User", userSchema)