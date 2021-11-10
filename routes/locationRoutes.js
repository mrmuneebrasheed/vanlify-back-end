const express = require("express");
const router = express.Router();
const locationControllers = require("../controllers/locationControllers");
const {
    multerArray
} = require("../middlewares/multer");

router.get("/all/:userId", locationControllers.getLocationsOfUser);
router.get("/all", locationControllers.getAllLocations);
router.get("/type/:type", locationControllers.getLocationsByType);
router.get("/:id", locationControllers.getOneLocation);
router.post("/add", multerArray, locationControllers.createOneLocation);
router.post("/:id", locationControllers.commentOneLocation);
router.put("/:id", locationControllers.modifyOneLocation);
router.delete("/:id", locationControllers.deleteOneLocation);

module.exports = router;