'use strict';

const path = require('path');
const tv4 = require('tv4');

const SCHEMA = require('../data/sign-up-schema.json');
const DATA_PATH = path.join(__dirname, '..', 'data', 'chat.db');

// database
const sqlite3 = require('sqlite3').verbose();

// check database connection
let db = new sqlite3.Database(DATA_PATH, (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Connected to the chat.db  SQlite database.');
});

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
		} catch (err) {
			console.error(err.message);
		}
	} /*
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

	deleteComment: async (req, res, next) => {
		const deleteUserComment = req.params.id;

		try {
			const readData = await readFile(DATA_PATH, 'utf-8');
			const parseRead = JSON.parse(readData);

			const commentToDelete = parseRead.comments.find((comment) => comment.id === deleteUserComment);

			if (commentToDelete) {
				parseRead.comments = parseRead.comments.filter((comment) => comment.id !== commentToDelete.id);

				const newComments = JSON.stringify(parseRead, null, '  ');

				await writeFile(DATA_PATH, newComments);

				res.json(parseRead);
			} else {
				res.json(`no entry with id ${deleteUserComment} to delete`);
			}
		} catch (err) {
			console.log(err);

			if (err && err.code === 'ENOENT') {
				res.status(404).end();
				return;
			}
		}
	},

	editComment: async (req, res) => {
		const updatedComment = req.body;
		try {
			const usersComments = await readFile(DATA_PATH, 'utf-8');
			const parsedData = await JSON.parse(usersComments);
			const targetComment = parsedData.comments.find((comment) => {
				return comment.name === updatedComment.name && comment.comment === updatedComment.comment;
			});
			targetComment.comment = updatedComment.editedComment;
			targetComment.date = updatedComment.date;
			const dataString = JSON.stringify(parsedData, null, ' ');
			await writeFile(DATA_PATH, dataString);
			res.send(targetComment);
		} catch (err) {
			console.error(err);
		}
	},*/,
};

module.exports = controllers;
