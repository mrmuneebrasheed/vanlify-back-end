const mongoose = require("mongoose");
const Location = require("../models/Location");

const getAllLocations = (req, res) => {
  Location.find()
    .then((locations) => {
      if (!locations) res.status(400).json({ error: "Locations do not exist" });
      res.status(200).json({
        locations: locations,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    });
};

const getOneLocation = (req, res) => {
  Location.findOne({
    _id: req.params.id,
  })
    .then((location) => {
      if (!location) res.status(400).json({ error: "Location do not exist" });
      res.status(200).json({
        location: location,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        err: err,
      });
    });
};

const getLocationsOfUser = (req, res) => {
  Location.findOne({
    userId: req.params.userId,
  })
    .then((location) => {
      res.status(200).json({
        location: location,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        err: err,
      });
    });
};
const createOneLocation = (req, res) => {
  const imagesUrl = req.files.map((file) => `/locations/${file.filename}`);
  const location = new Location({
    ...req.body,
    images: imagesUrl,
  }).catch((err) => {
    console.log(err);
    return res.status(500).json({
      message: "La location n'a pas pu être crée",
      error: err,
    });
  });
};

const modifyOneLocation = (req, res) => {
  Location.updateOne(
    {
      _id: req.params.id,
    },
    {
      ...req.body,
      _id: req.params.id,
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
        message: "Erreur: La Location n'a pas pu être modifié",
        error: err,
      });
    });
};

const deleteOneLocation = (req, res) => {
  Location.deleteOne({
    _id: req.params.id,
  })
    .then((location) => {
      if (!location) return res.status(404).send("Location Introuvable");
      return res.status(200).json({
        message: "Location supprimé !",
        location: location,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        message: "Erreur: La location n'a pas pu être supprimé",
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
};
