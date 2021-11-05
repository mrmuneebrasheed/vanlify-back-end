const express = require("express")
const router = express.Router()
const locationControllers = require("../controllers/locationControllers")

router.get("/all", locationControllers.getAllLocations)
router.get("/all/:userId", locationControllers.getLocationsOfUser)
router.get("/:id", locationControllers.getOneLocation)
router.post("/", locationControllers.createOneLocation)
router.put("/:id", locationControllers.modifyOneLocation)
router.delete("/:id", locationControllers.deleteOneLocation)

module.exports = router