const mongoose = require("mongoose")
const Location = require("../models/Location")

const getAllLocations = (req, res) => {
    Location.find()
        .then(locations => {
            res.status(200).json(locations)
        })  
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: err
            })
        })
}
const getOneLocation = (req, res) => {

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

}
const deleteOneLocation = (req, res) => {

}

module.exports = {
    getAllLocations,
    getOneLocation,
    getLocationsFromUser,
    createOneLocation,
    modifyOneLocation,
    deleteOneLocation
}