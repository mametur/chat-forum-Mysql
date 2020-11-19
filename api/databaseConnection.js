mysql = require('mysql');

db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'chatdb',
});
module.exports = db;
