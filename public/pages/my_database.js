var http = require('http');
var fs = require('fs');
var url = require('url');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_project"
});
con.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected!");
});

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    res.writeHead(200, {'Content-type': 'text/html'});
    fs.readFile("register.html", function (err, data) {
        if (err) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
        res.write(data);

        if (q.pathname === "/my_database.js") {
            var query = q.query;
            if (query.password === query.confirmpassword) {
                var sql2 = "INSERT INTO validusers (UserName,Password, RoleID) values (\'" + query.username + "\', \'" + query.password +
                        "\', '1')";

                con.query(sql2, function (err, result) {
                    try {
                        if (err) {

                            if (err.errno === 1062) {
                                throw new Error('Duplicate username');
                            } else {
                                throw err;
                            }
                        } else {

                            res.write("<br><b>You registered succesfully!</b><br>");
                            console.log("Added to the Database ");
                        }
                    } catch (err) {
                        res.write("<br><b>Username already in use. Please try again.</b><br>");
                        console.log("ERROR CAUGHT");
                    }

                });
            } else {
                res.write("<br><b>Passwords do not match.<br>Please try again.</b>");
                console.log("Passwords do not match");
            };
        };
        
        res.write("<br><br><u>Usernames already in use:</u>");
        var sql = "SELECT UserName FROM validusers";
        con.query(sql, function (err, result) {
            if (err)
                throw err;
            console.log("Database Shown");
            if (result) {
                for (var i of result) {
                    res.write("<br>Username: " + i.UserName);
                }
                ;
            }
            ;
        });
    });

}).listen(8080);


