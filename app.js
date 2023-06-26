const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const students =[];
app.set('view engine', 'ejs');
const mongoose =require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/collegepredcitor",{useNewUrlParser: true});
const studentschema = new mongoose.Schema({
    name : String,
    email : String,
    gender : String,
    rank : Number,
    category : String
});
const student = mongoose.model("student",studentschema);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res)
{
    res.render('index');
})
app.get("/dashboard",function(req,res){
    

})
app.post("/dashboard",function(req,res)
{
    res.redirect('/result');
})
app.post("/signup",function(req,res)
{
    const istudent = new student({
        name : req.body.sname,
        email : req.body.email,
        gender : req.body.gender,
        rank : req.body.rank,
        category : req.body.category
    })
    istudent.save();
   student.find({}).then(function(studentDetails)
   {
        console.log(studentDetails)
        res.render('dashboard',{sdetails:studentDetails});
    })
});

app.get("/signup",function(req,res)
{
    res.render('signup');
})
app.get("/result",function(req,res)
{
    res.render('result');
})
app.listen(3000,function()
{
    console.log("server started on 3000 port")
})