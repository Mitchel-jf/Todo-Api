const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

var id = '5e7a3c080f171e0c8c9acb9e';
if (!ObjectID.isValid(id)) {
    return console.log('Your ID is not valid');
}

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos: ', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     if(todo === null){
//         return console.log('ID not found');
//     }
//     console.log('Todo: ', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (todo === null) {
//         return console.log('ID not found at all');
//     }
//     console.log('Todo by ID: ', todo);
// }).catch((e) => console.log(e));

User.findById(id).then((user) => {
    if (!user) {
        return console.log('There is no user with this id');
    }
    console.log('User by ID: ', JSON.stringify(user, undefined, 2));
})
    .catch((e) => console.log(e));