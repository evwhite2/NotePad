var express = require("express");
var path = require("path");
var fs = require("fs");
var journal = require("../../../db/db.json");
var noteObj= {};

var app = express();
const PORT = process.env.PORT || 3000;


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


//API Routes
app.get("/api/notes", function(req, res){
  res.json(journal);
});


app.post("/api/notes", function(req, res){
  newEntry = req.body;
  journal.entries.push(newEntry);
  
  //adding unique id to each entry
  journal.entries.forEach((entry,index) => {
    Object.assign(entry, {"id": index});
    });
  
  
  return res.send(`Content Added: ${newEntry.title}`);

});



// app.delete("/api/notes", function(req, res){
// })


//listen on server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

