const mongoose = require("mongoose")

const getAllLocations = (req, res) => {

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