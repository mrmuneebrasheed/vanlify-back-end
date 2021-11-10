const mongoose = require("mongoose");
const Location = require("../models/Location");

const getAllLocations = (req, res) => {
    Location.find()
        .then((locations) => {
            if (!locations) {
                return res.status(400).json({
                    error: "Locations n'existe pas",
                });
            }
            return res.status(200).json({
                message: "locations trouvés",
                locations: locations,
            });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({
                message: "La location n'a pas pu être trouvé",
                error: err,
            });
        });
};

const getOneLocation = (req, res) => {
    Location.findOne({
        _id: req.params.id,
    })
        .then((location) => {
            if (!location) {
                return res.status(404).json({
                    error: "Location Introuvable",
                });
            }
            return res.status(200).json({
                message: "location trouvé",
                location: location,
            });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({
                message: "La location n'a pas pu être trouvé",
                error: err,
            });
        });
};

const getLocationsOfUser = (req, res) => {
    Location.find({
        userId: req.params.userId,
    })
        .then((locations) => {
            if (!locations) {
                return res.status(404).json("Locations Introuvable");
            }
            return res.status(200).json({
                message: "locations trouvés",
                locations: locations,
            });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({
                message: "Les ou la locations n'a pas pu être trouvé",
                error: err,
            });
        });
};
const createOneLocation = (req, res) => {
    console.log("Adding Location");
    console.log(req.body.coordinates);
    const coordinatesObject = JSON.parse(req.body.coordinates);
    delete req.body.coordinates;
    console.log(`req.body`, req.body);
    console.log(`coordinatesObject`, coordinatesObject);
    const imagesUrl = req.files.map((file) => `/locations/${file.filename}`);
    const location = new Location({
        ...req.body,
        coordinates: coordinatesObject,
        images: imagesUrl,
    });
    location
        .save()
        .then((location) => {
            return res.status(200).json({
                message: "Location crée",
                location: location,
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                message: "La location n'a pas pu être crée",
                error: err,
            });
        });
};

const modifyOneLocation = (req, res) => {
    Location.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        {
            ...req.body,
        }
    )
        .then((location) => {
            return res.status(200).json({
                message: "Location modifié",
                location: location,
            });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({
                message: "La Location n'a pas pu être modifié",
                error: err,
            });
        });
};
const deleteOneLocation = (req, res) => {
    Location.deleteOne({
        _id: req.params.id,
    })
        .then((location) => {
            if (!location) {
                return res.status(404).json("Location Introuvable");
            }
            return res.status(200).json({
                message: "Location supprimé !",
                location: location,
            });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({
                message: "La location n'a pas pu être supprimé",
                error: err,
            });
        });
};
const commentOneLocation = (req, res) => {
    Location.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        {
            $push: {
                comments: req.body,
            },
        }
    )
        .then((location) => {
            return res.status(200).json({
                message: "Commentaire enregistré",
                location: location,
            });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({
                message: "Le commentaire n'a pas pu être enregistré",
                error: err,
            });
        });
};

module.exports = {
    getAllLocations,
    getOneLocation,
    getLocationsOfUser,
    createOneLocation,
    modifyOneLocation,
    deleteOneLocation,
    commentOneLocation,
};
