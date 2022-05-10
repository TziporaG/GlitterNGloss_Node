const express = require('express');
const app = express();
const path = require('path');
var mysql = require('mysql');
var http = require('http');
var fs = require('fs');
var url = require('url');
//const bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

let menu = [ 
    {
        title: "Home",
        url: "/"
    },
    {
        title: "Face Products",
        url: "/face"
    },
    {
        title: "Eye Products",
        url: "/eye"
    },
    {
        title: "Lip Products",
        url: "/lip"
    },
    {
        title: "Brushes",
        url: "/brushes"
    },
    {
        title: "Sale",
        url: "/sale"
    },
    {
        title: "About",
        url: "/about"
    },
    {
        title: "Locations",
        url: "/locations"
    },
    {
        title: "Consultations",
        url: "/consultations"
    },
    {
        title: "Cart",
        url: "/cart"
    },
    {
        title: "Register",
        url: "/register"
    },
    {
        title: "Contact",
        url: "/contact"
    },
    {
        title: "Reviews",
        url: "/reviews"
    }
];
app.get("/", function(req, res) {
    res.render("home", {
        title: 'Home',
        content: 'This is the home page',
        menu: menu
    });
});

app.get("/face", function(req, res) {
    res.render("face", {
        title: 'Face Products',
        content: 'Here are the face products',
        menu: menu
    });
});

app.get("/eye", function(req, res) {
    res.render("eye", {
        title: 'Eye Products',
        content: 'Here are the eye products',
        menu: menu
    });
});

app.get("/lip", function(req, res) {
    res.render("lip", {
        title: 'Lip Products',
        content: 'Here are the lip products',
        menu: menu
    });
});

app.get("/brushes", function(req, res) {
        try{
            allProducts = getProducts(() => {
                console.log("on line 104");
                    res.render("brushes", {
                    title: "Brushes",
                    list: allProducts,
                    content: 'Here are the brushes',
                    menu: menu
                });
            });
    
     }
        catch(error){
            console.log('error with database line 115');
        }  
        
   });

app.get("/sale", function(req, res) {
    res.render("sale", {
        title: 'Sales',
        content: 'Here are the sales',
        menu: menu
    });
});

app.get("/about", function(req, res) {
    
    res.render("about", {
        title: 'About',
        content: 'About the company...',
        menu: menu
    });
});

app.get("/locations", function(req, res) {
    res.render("locations", {
        title: 'Locations',
        content: 'Here are the locations of the company',
        menu: menu
    });
});

app.get("/consultations", function(req, res) {
    res.render("consultations", {
        title: 'Consultations',
        content: 'Here is where you can get a consultation',
        menu: menu
    });
});

app.get("/contact", function(req, res) {
    res.render("contact", {
        title: 'Contact Us',
        content: 'Here is our contact info',
        menu: menu
    });
});

app.get("/cart", function(req, res) {
    res.render("cart", {
        title: 'Cart',
        content: 'Here is where you can view your cart',
        menu: menu
    });
});

app.get("/register", function(req, res) {
    res.render("register", {
        title: 'Register',
        content: 'Register for our website here',
        menu: menu
    });
});

app.post('/register_action', (req, res) => {
    registerToDatabase();
    res.render('confirmation', {
        title: 'Confirmation',
        menu: menu
    });
});

app.get("/reviews", function(req, res) {
    res.render("reviews", {
        title: 'Reviews',
        content: 'View customer opinions here',
        menu: menu
    });
});

function getProducts(){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "node_project"
    });

    con.connect(function(err){
        var products = [];
        if(err) {

                    throw err;}
        else{
            console.log("connected!");
        }
        var sql = "select * from products";
        con.query(sql, function(err, result, fields){
            if (err){
                console.log("error line 208");
                throw err;
            } 
            for(var i = 0; i < result.length; i++){
                //if(result[i].category === 'brush') {
                   // console.log(result[i].CLASS_NAME);
                var Product = {
                    'name':result[i].description,
                    'price':result[i].price,
                    'color':result[i].color
                };
                products.push(Product);
                //}
                 console.log("in loop");
                
            }
            
            console.log("done looping");
            return products;
        });
       // return products; 
    });
}

function registerToDatabase() {
    
    var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_project"
});
con.connect(function (err) {
    if (err) {
        console.log('ERROR line 241');
        throw err; }
    console.log("Connected!");
});

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    res.writeHead(200, {'Content-type': 'pug'});
    fs.readFile("/register", function (err, data) {
        if (err) {
            res.writeHead(200, {'Content-Type': 'pug'});
             console.log('ERROR line 252');
            return res.end("404 Not Found");
        }
        res.write(data);

        if (q.pathname === "/register_action") {
            var query = q.query;
            if (query.password === query.confirmpassword) {
                var sql2 = "INSERT INTO validusers (UserName,Password, RoleID) values (\'" + query.username + "\', \'" + query.password +
                        "\', '1')";

                con.query(sql2, function (err, result) {
                    try {
                        if (err) {

                            if (err.errno === 1062) {
                                 console.log('ERROR line 268');
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
                        console.log("ERROR linie 280");
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
            if (err) {
                console.log('ERROR line 294');
                throw err;}
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

});




}
app.listen(8080, () => {console.log("Listening on port 8080");});
