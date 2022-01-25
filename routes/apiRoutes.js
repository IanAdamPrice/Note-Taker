const fs = require('fs');
const notesArray = require('../db/db.json');

module.exports = function (app) {

    function updateDb(notes) {
        notes = JSON.stringify(notes);
        fs.writeFileSync('./db/db.json', notes, function(err){
            if (err) {
                return console.log(err);
            }
        });
    }

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
    });

    app.delete("/api/notes/:id", function(req, res){
        let id = req.params.id.toString();

        for (i=0; i < notesArray.length; i++){
            if (notesArray[i].id == id){
                res.send(notesArray[i]);
                notesArray.splice(i,1);
                break;
            }
        }

        updateDb(notesArray);
    });
};