const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/userControllers")
const {
    multerSingle
} = require("../middlewares/multer")

router.get("/:id", userControllers.getOneProfile)
router.put("/:id", userControllers.modifyUserProfile)
router.put("/avatar/:id", multerSingle, userControllers.modifyAvatar)

router.post("/signup", userControllers.handleSignup)
router.post("/login", userControllers.handleLogin)

module.exports = router