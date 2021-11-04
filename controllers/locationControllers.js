const mongoose = require("mongoose");
const Location = require("../models/Location");

const getAllLocations = (req, res) => {
    Location.find()
<<<<<<< HEAD
        .then(locations => {
            res.status(200).json({
                locations: locations
            })
        })  
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: err
            })
        })
}

const getOneLocation = (req, res) => {
    Location.findOne({
        _id: req.params.id
    })
    .then(location => {
        res.status(200).json({
            location: location
        })
    })
    .catch(err => {
        console.error(err)
        res.status(500).json({
            err: err
        })
    })
}

const getLocationsFromUser = (req, res) => {

}
const createOneLocation = (req, res) => {
    const location = new Location({
        ...req.body
    })
    location.save()
        .then(location => res.status(200).json(location))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
}

const modifyOneLocation = (req, res) => {
    Location.updateOne({
        _id: req.params.id
    },{
        ...req.body,
        _id: req.params.id
    })
    .then(location =>
        res.status(200).json({
            message: "Location modifié",
            location : location
        }))
    .catch(err => {
        console.error(err)
        res.status(500).json({
            message: "Erreur: La Location n'a pas pu être modifié",
            error: err
        })
    })
}

const deleteOneLocation = (req, res) => {
    Location.deleteOne({
            _id: req.params.id
        })
        .then(location => {
            res.status(200).json({
                message: "Location supprimé !",
                location: location
            })
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({
                message: "Erreur: La location n'a pas pu être supprimé",
                error: err
            })
        })

}
=======
        .then((locations) => res.status(200).json(locations))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

const getOneLocation = (req, res) => {};
const getLocationsFromUser = (req, res) => {};
const createOneLocation = (req, res) => {
    const location = new Location({
        ...req.body,
    });
    location
        .save()
        .then((location) => res.status(200).json(location))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

const modifyOneLocation = (req, res) => {};
const deleteOneLocation = (req, res) => {};
>>>>>>> 4c738b3785402a9a93254789172e26ff6d2afbc5

module.exports = {
    getAllLocations,
    getOneLocation,
    getLocationsFromUser,
    createOneLocation,
    modifyOneLocation,
    deleteOneLocation,
};