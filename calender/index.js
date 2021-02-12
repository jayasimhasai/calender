const express  =  require('express'),
	mongoose = require("mongoose"), 
    passport = require("passport"), 
    bodyParser = require("body-parser"), 
    LocalStrategy = require("passport-local"), 
    passportLocalMongoose =  
        require("passport-local-mongoose"), 
    User = require("./models/user"); 
  
mongoose.set('useNewUrlParser', true); 
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true); 
mongoose.set('useUnifiedTopology', true); 
mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();
//Listen On Server
app.listen(process.env.PORT ||3000,function (err) {
    if(err){
       console.log(err);
    }else {
    console.log("Server Started At Port 3000");  }});
app.set("view engine","ejs");
app.engine('html', require('ejs').renderFile); 
app.use(express.static('public'));
//=======================
//      R O U T E S
//=======================

//Auth Routes
app.get("/",(req,res)=>{
    res.render("login");
});
app.get('/Dashboard',(req, res) =>{
  res.render("index.html");
});
app.get("/register", function (req, res) { 
    res.render("register"); 
}); 
app.post("/register", function (req, res) { 
    var username = req.body.username 
    var password = req.body.password 
    User.register(new User({ username: username }), 
            password, function (err, user) { 
        if (err) { 
            console.log(err); 
            return res.render("register"); 
        } 
  
        passport.authenticate("local")( 
            req, res, function () { 
            res.render("secret"); 
        }); 
    }); 
}); 

//Handling user login 
app.post("/login", passport.authenticate("local", { 
    successRedirect: "/Dashboard", 
    failureRedirect: "/"
}), function (req, res) { 
}); 

