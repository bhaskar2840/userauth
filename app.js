//jshint esversion:6

require('dotenv').config();

const express = require("express");
const ejs = require ("ejs");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption"); // npm i mongoose-encryption
const md5=require("md5");


const app = express();

app.use(express.static("public"));
app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true},{ useUnifiedTopology: true});

const userSchema= new mongoose.Schema({ // for encrption new type of schema is created
    email:String,
    password:String});

// console.log(process.env.API_KEY); for the access of file.

//  const secret = "this is our little secret.";

// we created a new SECRET In env and access through it.

// userSchema.plugin(encrypt,{secret:process.env.SECRET, encrptedFields:["password"]});  //study about the plugins
// encrptedFields will work and encrpt when the save option is trigered and decrpt when find option is shown.




const User=new mongoose.model("User",userSchema);


app.get("/",function(req,res){
    res.render("home");
});

app.get("/login",function(req,res){
    res.render("login");
});

app.get("/register",function(req,res){
    res.render("register");
});



app.post("/register",function(req,res){
    const newUser = new User({
        email:req.body.username,
        password:md5(req.body.password) // this will do the hashing in the password.
    });
    newUser.save(function(err){  // this will trigger the encryption 
        if(err){
            console.log(err);
        }
        else{res.render("secrets");}
    })
});

app.post("/login",function(req,res){

    const username=req.body.username;
    const password = md5(req.body.password);

    User.findOne({email:username},function(err,foundUser)
    {
        if (err){console.log(err);}
        else{if (foundUser){
            if(foundUser.password === password){
                res.render("secrets");
            }
        }}
        
    });
    

}); 




app.listen(3000,function(){
    console.log("server is up an running at port 3000.");
});
