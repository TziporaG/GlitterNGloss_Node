 var http = require('http');
 var fs = require('fs');
 var url = require('url');

 http.createServer(function(req, res){
    var q = url.parse(req.url, true);
    res.writeHead(200, {'Content-type': 'text/html'});
     fs.readFile("form3.html", function(err, data){
     	//Choose a port to run it on that's not used by Apache (e.g. 8099)
         if(err){
             res.writeHead(200, {'Content-type': 'text/html'});
             return res.end("404 error not found.");
         }
         res.write(data);
     });
// your form's action should match the query.pathname that you'll use to handle it in your js file
     if(q.pathname == "/form"){
        var query = q.query;
        console.log(query);
        console.log(query.fname);
        console.log("You did a get from form.");
        console.log(q.pathname);
        res.write("Name: " + query.fname + " " + query.lname );
        res.write("<br>Review: " + query.message);
        res.write("<br>Product: " + query.prod);
        res.write("<br>Email: " + query.email);
        res.write("<br>Age: "+query.age);
        
        sendAnEmail( query.fname, query.lname, query.message,query.prod, query.email, query.age);
        res.write("<br>We have received your information");

    }

 }).listen(8080);

 function sendAnEmail(fname, lname, message, prod,emailAdd, age){
    var nodemailer = require('nodemailer');
    
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
        html: '<h3>From: ' + fname + ' ' + lname + '</h3>'+
        '<h3>Email Address: ' + emailAdd + '</h3>' +
        '<h2>Review:</h2><p>' + message + '</p>'+
        '<h2>Product:' + prod + '</h2>'+
        '<h2>Age:' + age + '</h2>',
    };
    
    transport.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }
    
        else {
            console.log('Email sent: ' + info.response);
        }
    });
 }