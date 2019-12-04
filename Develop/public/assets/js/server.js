var express = require("express");
var path = require("path");
var journal = require("../../../db/db.json");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public'))); 


//user routes
app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "../../../public/index.html"));
});

app.get("/notes", function(req, res){
  res.sendFile(path.join(__dirname, "../../../public/notes.html"));
});

//api routes
app.get("/api/notes", function(req, res){
   res.send(journal)
});


//post
app.post("api/notes", function(req, res){
  var newNote = req.body;
  console.log(newNote);
})

//listen on server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});