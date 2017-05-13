var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:"false"}));

app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Firebase
var firebase = require("firebase");

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };
firebase.initializeApp(config);

// Authentication
var email = '';
var password =  '';
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode);
  console.log(errorMessage);
  
}); 

//firebase database init
var database = firebase.database();
// var user = firebase.auth().currentUser;


firebase.auth().onAuthStateChanged(function(user) {
  if (user)
    console.log(user.uid);
    // console.log(user.email);
     
});


// var coursename =  firebase.database().ref('/100cent/institute/').on("child_added", function(data){
//     console.log(data.val().institute_name);
//     institutes.push(data.val().institute_name);
//     console.log("All Institutes: " + institutes); //error here
    
// });

// while(institutes != null)
    // console.log("All Institutes: " + institutes); //error here
    


// Set static path
app.use(express.static(path.join(__dirname, 'public')));


app.get('/institute', function(req, res){
    res.render("institute");
});

app.get('/student', function(req, res){
    res.render("student");
});

app.get('/course', function(req, res){
    res.render("course");
});

app.get('/teacher', function(req, res){
    res.render("teacher");
});

app.get('/course_teacher', function(req, res){
    var institutes = new Array();
    var courses = new Array();

    // get institutes
    var institutename =  firebase.database().ref('/100cent/institute/').on("child_added", function(data){
    console.log(data.val().institute_name);
    institutes.push(data.val().institute_name);
    
    });

    var coursename =  firebase.database().ref('/100cent/course/').on("child_added", function(data){
    console.log(data.val());
    // courses.push(data.val().institute_name);
    });

    res.render("course_teacher", { institutes : institutes});
});

app.get('/course_student', function(req, res){
    res.render("course_student");
});


app.listen(3000, function(){
    console.log('Server Started!');
})