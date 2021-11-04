const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/userControllers")

router.get("/:id", userControllers.getOneProfile)
router.put("/:id", userControllers.modifyUserProfile)
router.post("/signup", userControllers.handleSignup)
router.post("/login", userControllers.handleLogin)

module.exports = router