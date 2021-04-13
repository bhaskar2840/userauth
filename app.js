//jshint esversion:6

require('dotenv').config();

const express = require("express");
const ejs = require ("ejs");
const mongoose = require("mongoose");

// const encrypt = require("mongoose-encryption");  // npm i mongoose-encryption
//const md5=require("md5");  //for the hashing.
//const bcrypt=recquire("bcrypt"); // another hasing function.
//const saltRounds = 10;

const passport = require("passport");
const session=require("express-session");
const passportLocalMongoose= require("passport-local-mongoose");

 


const app = express();

app.use(express.static("public"));
app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:"our little secret.",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true},{ useUnifiedTopology: true});

mongoose.set("useCreateIndex", true);

const userSchema= new mongoose.Schema({ // for encrption new type of schema is created
    email:String,
    password:String});

// console.log(process.env.API_KEY); for the access of file.

//  const secret = "this is our little secret.";

// we created a new SECRET In env and access through it.

// userSchema.plugin(encrypt,{secret:process.env.SECRET, encrptedFields:["password"]});  //study about the plugins
// encrptedFields will work and encrpt when the save option is trigered and decrpt when find option is shown.


userSchema.plugin(passportLocalMongoose);

const User=new mongoose.model("User",userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/",function(req,res){
    res.render("home");
});

app.get("/login",function(req,res){
    res.render("login");
});

app.get("/register",function(req,res){
    res.render("register");
});

app.get("/secrets", function(req, res){
    if (req.isAuthenticated()){
      res.render("secrets");
    } else {
      res.redirect("/login");
    }
  });
  
  app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
  });


app.post("/register",function(req,res){ 
    User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets");
      });
    }
  });    
});

app.post("/login",function(req,res){

    const user = new User({
        username: req.body.username,
        password: req.body.password
      });
    
      req.login(user, function(err){
        if (err) {
          console.log(err);
        } else { passport.authenticate("local")(req, res, function(){
            res.redirect("/secrets");
          });
        }
      });
    

}); 




app.listen(3000,function(){
    console.log("server is up an running at port 3000.");
});
