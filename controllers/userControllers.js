const mongoose = require("mongoose");
const User = require("../models/User");

const getOneProfile = (req, res) => {
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
	User.findOneAndUpdate(
		{
			_id: req.params.id,
		},
		{
			...req.body,
			_id: req.params.id,
		}
	)
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
		.then(() => {
			return res.status(200).json({
				message: "Avatar modifié",
			});
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({
				message: "L'avatar n'a pas pu être modifié",
				error: err,
			});
		});
};

const handleSignup = (req, res) => {
	delete req.body.passwordConfirm;
	const user = new User({
		...req.body,
	});
	user.save()
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
