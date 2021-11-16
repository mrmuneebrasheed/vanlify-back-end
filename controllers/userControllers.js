const mongoose = require("mongoose");
const User = require("../models/User");
const fs = require("fs")
const path = require("path");
const {
    report
} = require("../routes/locationRoutes");

const getOneProfile = (req, res) => {
    console.log("Get one profile");
    User.findOne({
            _id: req.params.id,
        })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    error: "Utilisateur n'existe pas",
                });
            }
            return res.status(200).json({
                message: "Utilisateur trouvé",
                user: user,
            });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({
                message: "L'utilisateur n'a pas pu être trouvé",
                error: err,
            });
        });
};

const modifyUserProfile = (req, res) => {
    console.log("Modifying profile");
    User.findOneAndUpdate({
            _id: req.params.id,
        }, {
            ...req.body,
        })
        .then((user) => {
            return res.status(200).json({
                message: "User modifié",
                user: user,
            });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({
                message: "L'utilisateur n'a pas pu être modifié",
                error: err,
            });
        });
};

const modifyAvatar = async (req, res) => {
    console.log("Modifying avatar");
    try {
        if (!req.file) {
            const error = new Error('Please provide an image');
            error.code = 400;
            throw error;
        }
        const oldUser = await User.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                avatar: `/images/avatars/${req.file.filename}`
            }
        }, {
            new: false
        })
        if (oldUser.avatar) {
            const oldAvatar = path.join(__dirname, "../" + oldUser.avatar)
            fs.unlink(oldAvatar, (err) => {
                if (err) {
                    throw err
                }
                return res.status(200).json({
                    message: "Avatar modified"
                })
            })
        } else {
            res.status(200).json({
                message: "Avatar modified"
            })
        }
    } catch (err) {
        console.error(err)
        if (err.code === 400) {
            return res.status(400).json(err.message)
        }

        return res.status(500).json(err)
    }
};

const handleSignup = (req, res) => {
    console.log("Handle signup");
    delete req.body.passwordConfirm;
    const user = new User({
        ...req.body,
    });
    user
        .save()
        .then((user) => {
            return res.status(200).json({
                message: "Utilisateur crée",
                user: user,
            });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({
                message: "L'utilisateur n'a pas pu être crée",
                error: err,
            });
        });
};

const handleLogin = (req, res) => {
    console.log("Handle login");
    User.findOne({
            username: req.body.username,
        })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    error: "Utilisateur introuvable",
                });
            }
            if (user.password !== req.body.password) {
                return res.status(403).json({
                    error: "Incorrect password",
                });
            }
            return res.status(200).json({
                message: "Utilisateur trouvé",
                userId: user._id,
            });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({
                message: "L'utilisateur n'a pas pu être trouvé",
                error: err,
            });
        });
};

module.exports = {
    getOneProfile,
    modifyUserProfile,
    handleSignup,
    handleLogin,
    modifyAvatar,
};