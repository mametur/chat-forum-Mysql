'use strict';
const path = require('path');
const tv4 = require('tv4');

const SCHEMA = require('../data/sign-up-schema.json');
const DATA_PATH = path.join(__dirname, '..', 'data', 'chat.db');

const controllers = {
	readAll: async (req, res) => {
		const newUser = req.body;

		try {
			const isValid = tv4.validate(newUser, SCHEMA);

			if (!isValid) {
				const error = tv4.error;
				console.error(error);

				res.status(400).json({
					error: {
						message: error.message,
						dataPath: error.dataPath,
					},
				});
				return;
			}
			console.log(newUser.name);
		} catch (err) {
			console.error(err.message);
		}
	},
}; /*
	signUp: async (req, res) => {
		const newUser = req.body;

		try {
			const readData = await readFile(DATA_PATH, 'utf-8');
			const parseRead = JSON.parse(readData);

			parseRead.users.push(newUser);

			const newUserData = JSON.stringify(parseRead, null, ' ');
			await writeFile(DATA_PATH, newUserData);
			console.log(newUser);
			res.json(parseRead);
		} catch (err) {
			console.log(err);

			if (err && err.code === 'ENOENT') {
				res.status(404).end();
				return;
			}
		}
	},

	leaveComments: async (req, res, next) => {
		const newComment = req.body;

		try {
			const readData = await readFile(DATA_PATH, 'utf-8');
			const parseRead = JSON.parse(readData);

			parseRead.comments.push(newComment);

			const storeNewComment = JSON.stringify(parseRead, null, ' ');
			await writeFile(DATA_PATH, storeNewComment);
			console.log(storeNewComment);
			res.json(parseRead);
		} catch (error) {
			next(error);
		}
	},

};*/

module.exports = controllers;
