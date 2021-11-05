const multer = require("multer")

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png",
}

const avatarStorage = multer.diskStorage({
    destination: "images/avatars",
    filename: (req, file, cb) => {
        const nameWithoutSpace = file.originalname.split(" ").join("_")
        const name = nameWithoutSpace.split(".")
        const ext = MIME_TYPES[file.mimetype]
        cb(null, nullname[name.length - 2] + Date.now() + "." + ext)
    }

})
const locationStorage = multer.diskStorage({
    destination: "images/locations",
    filename: (req, file, cb) => {
        const nameWithoutSpace = file.originalname.split(" ").join("_")
        const name = nameWithoutSpace.split(".")
        const ext = MIME_TYPES[file.mimetype]
        cb(null, name[name.length - 2] + Date.now() + "." + ext)
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