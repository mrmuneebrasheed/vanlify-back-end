const mongoose = require("mongoose");
const User = require("../models/User");

const getOneProfile = (req, res) => {
    User.findOne({
        _id: req.params.id,
    })
        .then((user) => res.status(200).json(user))
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
};

const modifyUserProfile = (req, res) => {
    User.updateOne(
        {
            _id: req.params.id,
        },
        {
            ...req.body,
            _id: req.params.id,
        }
    )
        .then(() =>
            res.status(200).json({
                message: "User modified",
            })
        )
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
};

const modifyAvatar = (req, res) => {
    console.log(`req.file`, req.file);

    User.updateOne(
        {
            _id: req.params.id,
        },
        {
            avatar: `/avatar/${req.file.filename}`,
        }
    )
        .then(() =>
            res.status(200).json({
                message: "avatar modified",
            })
        )
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
};

const handleSignup = (req, res) => {
    delete req.body.passwordConfirm;
    const user = new User({
        ...req.body,
    });
    user.save()
        .then((user) => res.status(200).json(user))
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
};

const handleLogin = (req, res) => {
    User.findOne({
        username: req.body.username,
    })
        .then((user) => {
            if (!user) throw new Error("User does not exist");
            if (user.password !== req.body.password) {
                throw new Error("Password not valid");
            }
            return res.status(200).json({
                userId: user._id,
            });
        })
        .catch((err) => {
            return res.status(404).json({ error: err.message });
        });
};

module.exports = {
    getOneProfile,
    modifyUserProfile,
    handleSignup,
    handleLogin,
    modifyAvatar,
};
