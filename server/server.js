const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require("lodash");

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//functions
//1. log and send error
var logAndSendError = (res, msg, err) => {
    console.log(msg, err);
    res.status(400).send({ msg });
};

//2. log and send success
var logAndSendSuccess = (res, msg, doc) => {
    console.log(msg, JSON.stringify(doc, undefined, 2));
    res.send(doc);
};


//Create/Post endpoint 
app.post('/todos', (req, res) => {
    console.log('Received new todo: ', req.body.text);
    //create a new todo from the request
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    });

    todo.save().then(
        (doc) => logAndSendSuccess(res, 'Saved todo successfully ', doc),
        (err) => logAndSendError(res, 'Error unable to save todo', err));
});

//GET/ReadAll endpoint
app.get('/todos', (req, res) => {
    Todo.find().then(
        (todos) => logAndSendSuccess(res, 'Fetched Todos successfully ', todos),
        (err) => logAndSendError(res, 'Unable to fetch todo ', err));
});

//GET a single document by req.params endpoint
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return logAndSendError(res, 'Error invalid id', null);
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return logAndSendError(res, 'Error todo not found ', null)
        }
        logAndSendSuccess(res, `fetched todo with id: ${id}`, todo)
    },
        (e) => logAndSendError(res, 'Error unableto fetch todo ', e));
});




// GET documents by req.body endpoint
app.get('/todo', (req, res) => {
    Todo.find(req.body).then((todo) => {

        if (!req.body) {
            return logAndSendError(res, 'Error no query specified', null);
        }
        logAndSendSuccess(res, 'Fetched todo', todo);
    }, (err) => {
        logAndSendError(res, 'Error could not fetch todo', err);
    });
});


//GET delete one API route
app.delete('/todo/delete', (req, res) => {
    if (_.isEmpty(req.body)) {
        return logAndSendError(res, 'No query specified', null);
    }
    Todo.findOneAndDelete(req.body).then((deletedTodo) => {
        if (deletedTodo === null) {
            return logAndSendError(res, 'That todo was not found ', null);
        }
        logAndSendSuccess(res, 'Deleted successfully ', deletedTodo);
    },
        (err) => logAndSendError(res, 'Error, unable to delete the todo', err));
});


//GET delete many API route
app.delete('/todos/delete', (req, res) => {
    if (_.isEmpty(req.body)) {
        return logAndSendError(res, 'No query specified', null);
    }

    Todo.deleteMany(req.body).then((deletedTodos) => {
        if (deletedTodos === null) {
            return logAndSendError(res, 'That todo was not found', null);
        }
        logAndSendSuccess(res, 'Deleted todo successfully', deletedTodos);
    },
        (e) => logAndSendError(res, 'error unable to delete todo', null));
});


//update a value in the database
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return logAndSendError(res, 'Error invalid id', null);
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return logAndSendError(res, '', null);
        }
        res.send({ todo });
    }).catch((e) => {
        logAndSendError(res, '', null);
    });

});

app.listen(port, () => {

    console.log(`Started on port ${port}`);
});


module.exports = { app };