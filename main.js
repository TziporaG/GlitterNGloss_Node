const express = require('express');
const app = express();
const path = require('path');
var mysql = require('mysql');
var http = require('http');
var fs = require('fs');
var nodemailer = require('nodemailer');
var url = require('url');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

let menu = [ 
    {
        title: "Home",
        url: "/"
    },
    {
        title: "Products",
        url: "/products"
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
        content: 'Welcome to Glitter n Gloss!',
        menu: menu
    });
});


app.get("/products", function(req, res) {
    console.log("on line 101");
        try{
            getProducts(res);
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

app.post("/contact_action", function(req, res) {
    sendEmail(req.body, res);
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
    registerToDatabase(req.body, res);

});

app.get("/reviews", function(req, res) {
    res.render("reviews", {
        title: 'Reviews',
        content: 'View customer opinions here',
        menu: menu
    });
});

function getProducts(res){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "node_project"
    });
    var products = [];
    con.connect(function(err){
        
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
                 console.log(Product);
                
            }
            
            console.log("done looping");
            res.render("products", {
                    title: "Products",
                    list: products,
                    content: 'Here are the products',
                    menu: menu
                });
        });
        
    });
    
}

function registerToDatabase(query, res) {
    var message = "";
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
    
            if (query.password === query.confirmpassword) {
                var sql2 = "INSERT INTO validusers (UserName,Password, RoleID) values (\'" + query.username + "\', \'" + query.password +
                        "\', '1')";
                console.log(sql2);
                con.query(sql2, function (err, result) {
                    try {
                        if (err) {

                            if (err.errno === 1062) {
                                 console.log('ERROR line 268'); 
                                 message += ("Username already in use");
                                throw new Error('Duplicate username');
                                
                            } else {
                                throw err;
                            }
                        } else {
                            
                            message += ("You registered succesfully!");
                            console.log("Added to the Database ");
                        }
                    } catch (err) {
                        message += ("Username already in use. Please try again.");
                        console.log("ERROR line 280");
                    }

                });
            } else {
                message += ("Passwords do not match.Please try again.");
                console.log("Passwords do not match");
            };
        
        res.render('confirmation', {
        title: 'Confirmation',
        menu: menu,
        msg: message
    });
        }
        
  function sendEmail(query, res) {
        var transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'glitterngloss6@gmail.com',
            pass: 'PHPTermProject2022'
        }
    });

  
       var mailOptions = {
        from: 'glitterngloss6@gmail.comm', 
        to: 'glitterngloss6@gmail.com',
        subject: 'Message received from form submission', 
        html: '<h3>From: ' + query.fname + ' ' + query.lname + '</h3>'+
        '<h3>Email Address: ' + query.emailAdd + '</h3>' +
        '<h2>Review:</h2><p>' + query.message + '</p>'+
        '<h2>Product:' + query.prod + '</h2>'+
        '<h2>Age:' + query.age + '</h2>',
    
    };

    transport.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }
         else {
            console.log('Email sent: ' + info.response);
        }
    });
        var message = "Looking forward to reading your review!";
        res.render('confirmation', {
        title: 'Confirmation',
        menu: menu,
        msg: message
    });
        }
app.listen(8080, () => {console.log("Listening on port 8080");});
