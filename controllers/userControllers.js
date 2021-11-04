const mongoose = require("mongoose")
const User = require("../models/User")

const getOneProfile = (req, res) => {
    User.find({
            _id: req.params.id
        })
        .then(user => res.status(200).json(user))
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
}

const modifyUserProfile = (req, res) => {

}

const createNewUser = (req, res) => {

}
const handleLogin = (req, res) => {

}

module.exports = {
    getOneProfile,
    modifyUserProfile,
    createNewUser,
    handleLogin
}