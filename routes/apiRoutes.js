const fs = require('fs');
const notesArray = require('../db/db.json');

module.exports = (app) => {
  // create function to get notes then post
  function updateDb(notes) {
    notes = JSON.stringify(notes);
    
    fs.writeFileSync('./db/db.json', notes, function(err){
      if (err) {
        return;
      }
    });
  } // end updateDb function

  app.get('/api/notes', (req, res) => {
    res.json(notesArray);
  });

  app.post('/api/notes', (req,res) => {
    if (notesArray.length == 0) {
      req.body.id = "0";
    } else {
      req.body.id = JSON.stringify(JSON.parse(notesArray[notesArray.length - 1].id) + 1);
    }

    notesArray.push(req.body);    
    updateDb(notesArray);       
    res.json(req.body);

  }); // end app.post

  app.delete("/api/notes/:id", (req, res) => {
    let id = req.params.id.toString();

    for (i=0; i < notesArray.length; i++){
      if (notesArray[i].id == id){
        res.send(notesArray[i]);
        notesArray.splice(i,1);
        break;
        }
    }

    updateDb(notesArray);

  }); // end app.delete
};