const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
app.set('view engine', 'ejs');
const mongoose =require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/collegepredictor",{useNewUrlParser: true});
var sid="";
var studetails=[];
var collegenames=[];
const studentschema = new mongoose.Schema({
    name : String,
    email : String,
    gender : String,
    rank : Number,
    category : String,
    password: String,
    username:String

});
const verifystudent =new mongoose.Schema({
    username:String,
    password:String
});
const collegeschema =new mongoose.Schema({
    name:String,
    maxrank:Number
});

const student = mongoose.model("student",studentschema);
const college =mongoose.model("names",collegeschema);
const registeredStudent = mongoose.model("registered",verifystudent);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/",function(req,res)
{
    res.render('index');
})
app.post("/",function(req,res){
    const vstudent= new registeredStudent({
       username:req.body.username,
       password:req.body.password
    });
    vstudent.save();
    student.find({username:vstudent.username,password:vstudent.password}).then(function(studentDetails){
        studetails=studentDetails;
        res.redirect('dashboard');
    })
})
app.get("/dashboard",function(req,res){
  
    if(studetails.length===1)
    {
        res.render("dashboard",{sdetails:studetails}); 
    }
    else{
    student.find({_id:sid}).then(function(studentDetails)
    {

        res.render("dashboard",{sdetails:studentDetails}); 
    })
}
})
app.post("/dashboard",function(req,res)
{
   let rank=req.body.sbutton;
   college.find({maxrank:{$gt:rank}},{name:1}).then(function(cname){
    collegenames=cname;
    res.redirect("/result");
})


})
app.post("/signup",function(req,res)
{
    const istudent = new student({
        name : req.body.sname,
        email : req.body.email,
        gender : req.body.gender,
        rank : req.body.rank,
        category : req.body.category,
        username:req.body.username,
        password:req.body.password
    })
    istudent.save();
   
   student.find({username:istudent.username},{_id:1}).then(function(studentDetails)
   {
      sid=studentDetails;
      res.redirect("/dashboard");
    })
   
});
app.get("/signup",function(req,res)
{
    res.render('signup');
})
app.get("/result",function(req,res)
{
    res.render("result",{colleges:collegenames});
})
app.listen(3000,function()
{
    console.log("server started on 3000 port")
})
