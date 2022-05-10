/*var express = require('express');
var mysql = require('mysql');

var app = express();

///
///	Create connection to MySQL database server.
/// 
function getMySQLConnection() {
	return mysql.createConnection({
	      host: "localhost",
    user: "root",
    password: "",
    database: "node_project"
	});
}

///
/// Use pug as templating engine. Pug is renamed jade.
///
app.set('view engine', 'pug');

///
/// HTTP Method	: GET
/// Endpoint 	: /person
/// 
/// To get collection of person saved in MySQL database.
///
app.get('/brushes', function(req, res) {
	var products = [];

	// Connect to MySQL database.
	var connection = getMySQLConnection();
	connection.connect();

	// Do the query to get data.
	connection.query('SELECT * FROM products', function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		// Loop check on each row
	  		for (var i = 0; i < rows.length; i++) {

	  			// Create an object to save current row's data
		  		var product = {
		  			'description':rows[i].description,
		  			'price':rows[i].price,
		  			'color':rows[i].color
		  		}
		  		// Add object into array
		  		products.push(product);
	  	}

	  	// Render index.pug page using array 
	  	res.render('brushes', {"products": products});
	  	}
	});

	// Close the MySQL connection
	connection.end();
	
});

app.listen(8080, function () {
    console.log('listening on port', 8080);
});*/