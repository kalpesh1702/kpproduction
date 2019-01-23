var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "kpproduction",
  password: "1234",
  database: "kpproduction"
});

connection.connect(function(err) {

  if (err) {
  	console.log(err);
  }
  else{
  	console.log("Connected!");
  }

  sql = 'SELECT name from Subject';

  connection.query(sql, function (err, row) {

    if (err){
    	console.log(err);
    }
    else{
    	console.log(row);
    }

  });

});