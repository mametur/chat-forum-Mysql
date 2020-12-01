mysql = require('mysql');

db = mysql.createPool({
	host: 'eu-cdbr-west-03.cleardb.net',
	user: 'bb6c73c3a5e0e2',
	password: 'd4d70813',
	database: 'heroku_16ab16187995650',
});
module.exports = db;
