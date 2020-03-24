var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/TodoApp';
//set the promise to be used
mongoose.Promise = global.Promise;

mongoose.connect(url);

//add models
var Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

// var newTodo = new Todo({ text: "Cook dinner" });

// newTodo.save().then((doc) => {
//     console.log('Saved todo ', doc);
// }, (err) => {
//     console.log(err); 
// });

var newTodo2 = new Todo({
    text: "Play Football",
    completed: true,
    completedAt: 1234
});

newTodo2.save().then((doc) => {
    console.log(`Saved properly ${doc}`);
}, (err) => {
    console.log(err);
});