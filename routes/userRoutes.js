const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/userControllers")

router.get("/:id", userControllers.getOneProfile)
router.put("/:id", userControllers.modifyUserProfile)
router.post("/signup", userControllers.createNewUser)
router.post("/login", userControllers.handleLogin)

module.exports = router