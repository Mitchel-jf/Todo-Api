const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

var id = '5e7a3c080f171e0c8c9acb9e';
if (!ObjectID.isValid(id)) {
    return console.log('Your ID is not valid');
}

Todo.deleteMany({ _id: '5e7f726ad0264d0cc0fd8469' }).then(
    (todo) => console.log(`deleted todo: ${JSON.stringify(todo, undefined, 2)}`),
    (err) => console.log(`there was an error ${err}`)
);

// var todo = new Todo({
//     text: "Call Dammy"
// });

// todo.save().then((doc) => console.log('Saved'), (err) => console.log('error'));

// Todo.deleteMany
// Todo.deleteOne

// Todo.findOneAndDelete
// Todo.findOneAndRemove

// Todo.findByIdAndDelete