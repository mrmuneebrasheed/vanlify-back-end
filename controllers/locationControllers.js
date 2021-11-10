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
        message: "Locations foud",
        locations: locations,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        message: "The locations couldn't be found",
        error: err,
      });
    });
};

const getLocationsByType = (req, res) => {
  Locations.find({ type: req.params.type })
    .then((locations) => {
      if (!locations) {
        return res.status(404).json("No location of this type");
      }
      return res.status(200).json({
        message: "Locations found",
        locations: locations,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        message: "The locations couldn't be found",
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
  const imagesUrl = req.files.map(
    (file) => `/images/locations/${file.filename}`
  );
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
        message: "Location modified",
        location: location,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        message: "Location couldn't be modified",
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
        return res.status(404).json("Location not found");
      }
      return res.status(200).json({
        message: "Location deleted",
        location: location,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        message: "Location couldn't be deleted",
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
        message: "Comment saved",
        location: location,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        message: "Comment couldn't be saved",
        error: err,
      });
    });
};

module.exports = {
  getAllLocations,
  getOneLocation,
  getLocationsOfUser,
  getLocationsByType,
  createOneLocation,
  modifyOneLocation,
  deleteOneLocation,
  commentOneLocation,
};
