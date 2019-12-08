var express = require("express");
var path = require("path");
var fs = require("fs");
var journal = require("../../../db/db.json");
var noteObj= {};

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


//post
app.post("/api/notes", function(req, res){
  
  console.log(`New request sent to API ${req.body}`);

  //reading existing data  
  fs.readFile(path.join(__dirname, "../../../db/db.json"), "utf8", (err, jsonString)=>{
    if (err){
      console.log(`Cannot read exisitng JSON file: ${err}`);
    }try{
      let apiNotes = JSON.parse(jsonString);
      noteObj = apiNotes;
    }catch(err){
      console.log(`Error reading existing notes: ${err}`);
    }
  
    //adding new entry to journal
    newEntry = req.body;
    noteObj.entries.push(newEntry);
    
    //rewriting JSON DB file with new entry added
    fs.writeFile("../../../db/db.json", JSON.stringify(noteObj),(error, success)=>{
      if(error) {
        console.log(`Error writing to api: ${error}`);
      }console.log(`Entry added to API: Title:${newEntry.title}, Body: ${newEntry.text}`);
    });
  });

  
  res.send("Content Added");
});

//api routes
app.get("/api/notes", function(req, res){
   res.send(journal)
});


//listen on server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

