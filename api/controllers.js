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
	leave_comment: (req, res) => {
		const comment = req.body;

		try {
			let sql = `INSERT INTO comments(comment,userID) VALUES('${comment.comment}', ${comment.id})`;
			db.query(sql, (err) => {
				if (err) throw err;
			});
			let getLastComment = `SELECT * FROM comments WHERE userID = 11 ORDER BY  comment_id DESC LIMIT 1`;
			db.query(getLastComment, (err, lastComment) => {
				if (err) throw err;

				res.json({
					comment: lastComment,
				});
			});
		} catch (err) {
			console.error(err.message);
		}
	},
	update:(req,res)=>{
		const newComment = req.body;
		try{
			let sql =`UPDATE comments SET comment = '${newComment.comment}' WHERE (comment_id = ${newComment.comment_id})`;

            db.query(sql,(err,result)=>{
				if(err)throw err;
				console.log(result)
				res.json({
					comment:newComment
				})
			})
				
		}catch (err) {
			console.error(err.message);
		}

	},
	delete:(req,res)=>{
		const deleteComment = req.params.id;
		try{
			console.log('deleted-item',deleteComment)
			let sql = `DELETE FROM comments WHERE (comment_id = '${deleteComment}');`;
			db.query(sql,(err,result)=>{
				if(err)throw err;
				console.log(result)
			})

		}catch(err){
			console.error(err.message);
		}
	}
};
 
module.exports = controllers;
