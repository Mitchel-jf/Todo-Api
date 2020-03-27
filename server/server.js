
var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
var _ = require("lodash");

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());


//Create/Post endpoint 
app.post('/todos', (req, res) => {
    console.log('Received new todo: ', req.body.text);

    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    });

    todo.save().then((doc) => {
        console.log('Saved todo ', doc);
        res.send(doc);
    }, (err) => {
        console.log('Unable to save todo ', err);
        res.status(400).send(err);
    });
});

//GET/ReadAll endpoint
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (err) => {
        res.status(400).send({ err });
    });
});

//GET a single document by req.params endpoint
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ msg: "Invalid id" });
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send({ msg: "Todo not found" });
        }

        res.send({ todo });
    }, (e) => {


        res.status(400).send({ msg: "There was an error" });
    });

});




// GET documents by req.body endpoint
// app.get('/todo', (req, res) => {
//     Todo.find(req.body).then((todo) => {

//         if (!req.body) {
//             return res.status(400).send({ msg: "No query was specified" });
//         }
//         res.send({todo});
//     }, (err) => {
//         res.status(400).send({ msg: "There was an error" });
//     });
// }); 


app.listen(port, () => {

    console.log(`Started on port ${port}`);
});


module.exports = { app };