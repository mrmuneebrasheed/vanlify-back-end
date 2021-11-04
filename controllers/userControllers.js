const mongoose = require("mongoose")
const User = require("../models/User")

const getOneProfile = (req, res) => {

}

const modifyUserProfile = (req, res) => {

}

const handleSignup = (req, res) => {
    const user = new User({
        ...req.body
    })
    user.save()
        .then(user => res.status(200).json(user))
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
}


const handleLogin = (req, res) => {

}

module.exports = {
    getOneProfile,
    modifyUserProfile,
    handleSignup,
    handleLogin
}