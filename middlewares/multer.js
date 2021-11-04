const multer = require("multer")

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png",
}

const avatarStorage = multer.diskStorage({
    destination: "images/avatars",
    filename: (req, file, cb) => {
        const name = file.originalname.split(" ").join("_")
        const ext = MIME_TYPES[file.mimetype]
        cb(null, name + Date.now() + "." + ext)
    }
})
const locationStorage = multer.diskStorage({
    destination: "images/locations",
    filename: (req, file, cb) => {
        const name = file.originalname.split(" ").join("_")
        const ext = MIME_TYPES[file.mimetype]
        cb(null, name + Date.now() + "." + ext)
    }
})

module.exports = {
    multerSingle: multer({
        storage: avatarStorage
    }).single("image"),
    multerArray: multer({
        storage: locationStorage
    }).array("images")
}