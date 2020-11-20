'use strict';
const path = require('path');
const tv4 = require('tv4');
const db = require('./databaseConnection.js');

const SCHEMA = require('../data/sign-up-schema.json');
const DATA_PATH = path.join(__dirname, '..', 'data', 'chat.db');

const controllers = {
	signUp: (req, res) => {
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
			let sql = `SELECT name FROM users Where name = '${newUser.name}'`;
			let insertUser = `INSERT INTO users (name, password, avatar) VALUES ('${newUser.name}', '${newUser.password}','${newUser.avatar}')`;
			db.query(sql, (err, data) => {
				if (err) throw err;
				const isExist = Boolean(data[0]);
				if (!isExist) {
					db.query(insertUser, (err, result) => {
						if (err) throw err;
					});
				}
				res.json({
					status: 200,
					data,
					message: `${newUser.name} user has been successfully registered`,
				});
			});
		} catch (err) {
			console.error(err.message);
		}
	},
	signIn: (req, res) => {
		const signInPerson = req.body;

		try {
			console.log('check user', signInPerson);
			let sql = `SELECT * FROM  users WHERE name = '${signInPerson.name}' and password = '${signInPerson.password}';`;
			db.query(sql, (err, data) => {
				if (err) throw err;
				const isExist = Boolean(data[0]);
				let comments = {};
				if (isExist) {
					let comment = `SELECT * from comments`;
					db.query(comment, (err, result) => {
						if (err) throw err;
						comments = result;
						db.query(`SELECT * FROM users`, (err, users) => {
							if (err) throw err;
							res.json({
								user: data,
								comments: comments,
								users: users,
							});
						});
					});
				} else {
					res.json({
						user: data,
					});
				}
			});
		} catch (err) {
			console.error(err.message);
		}
	},
};

module.exports = controllers;
