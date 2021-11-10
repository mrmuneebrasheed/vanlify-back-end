const mongoose = require("mongoose");
const Location = require("../models/Location");

const getAllLocations = (req, res) => {
  console.log("Get all locations");
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
  console.log("Get one location");
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
  console.log("Get locations of user");
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
  console.log("Get locations by type");
  const type = req.params.type.split(" ").join().toLowerCase();
  Location.find({ type: type })
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
  console.log("Creating Location");
  const coordinatesObject = JSON.parse(req.body.coordinates);
  const type = req.body.type.split(" ").join().toLowerCase();
  delete req.body.coordinates;
  delete req.body.type;
  if (!req.files) {
    return res.status(400).json({
      message: "You need to provide at least one image",
    });
  }
  const imagesUrl = req.files.map(
    (file) => `/images/locations/${file.filename}`
  );
  const location = new Location({
    ...req.body,
    coordinates: coordinatesObject,
    type: type,
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
  console.log("Modify Location");
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
  console.log("Delete Location");
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
  console.log("Comment one location");
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
