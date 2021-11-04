const mongoose = require("mongoose")
const Location = require("../models/Location")

const getAllLocations = (req, res) => {
    Location.find()
<<<<<<< HEAD
        .then(locations => {
            res.status(200).json(locations)
        })  
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: err
            })
=======
        .then(locations => res.status(200).json(locations))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
>>>>>>> 3223ef5cf481a3627b64eb4f538a44ed19b0a01b
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