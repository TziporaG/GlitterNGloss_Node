const express = require('express');
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

let menu = [ 
    {
        title: "Home",
        url: "/"
    },
    {
        title: "Face Products",
        url: "/products/face"
    },
    {
        title: "Eye Products",
        url: "/products/eye"
    },
    {
        title: "Lip Products",
        url: "/products/lip"
    },
    {
        title: "Brushes",
        url: "/products/brushes"
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

app.get("/products/face", function(req, res) {
    res.render("face", {
        title: 'Face Products',
        content: 'Here are the face products',
        menu: menu
    });
});

app.get("/products/eye", function(req, res) {
    res.render("eye", {
        title: 'Eye Products',
        content: 'Here are the eye products',
        menu: menu
    });
});

app.get("/products/lip", function(req, res) {
    res.render("lip", {
        title: 'Lip Products',
        content: 'Here are the lip products',
        menu: menu
    });
});

app.get("/products/brushes", function(req, res) {
    res.render("brushes", {
        title: 'Brushes',
        content: 'Here are the brushes',
        menu: menu
    });
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

app.get("/reviews", function(req, res) {
    res.render("reviews", {
        title: 'Reviews',
        content: 'View customer opinions here',
        menu: menu
    });
});

app.listen(8080, () => {console.log("Listening on port 8080");});