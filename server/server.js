var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

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

// app.get('/read');

app.listen(3000, () => {
    console.log('Started on port 3000');
});
