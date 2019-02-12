const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "kpproduction",
    password: "1234",
    database: "kpproduction"
});

connection.connect(function(err){
	if(err)console.log(err);
});


module.exports = connection;