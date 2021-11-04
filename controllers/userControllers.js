const mongoose = require("mongoose")
const User = require("../models/User")

const getOneProfile = (req, res) => {
    User.findOne({
            _id: req.params.id
        })
        .then(user => res.status(200).json(user))
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
}

const modifyUserProfile = (req, res) => {
    console.log(`req.file`, req.file)
    console.log(`req.body.thing`, req.body.thing)
    console.log(`req.file.filename`, req.filename)

    const userObject = req.file ? {
        ...JSON.parse(req.body.thing),
        avatar: `/avatars/${req.file.filename}`
    } : {
        ...req.body
    }
    User.updateOne({
            _id: req.params.id
        }, {
            ...userObject,
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: "User modified"
        }))
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })

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
    User.findOne({
            username: req.body.username
        })
        .then(user => {
            if (user.password !== req.body.password) {
                res.status(403).json({
                    error: "Incorrect password"
                })
            }
            res.status(200).json({
                userId: user._id
            })
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
}

module.exports = {
    getOneProfile,
    modifyUserProfile,
    handleSignup,
    handleLogin
}