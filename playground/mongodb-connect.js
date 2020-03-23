const {MongoClient, ObjectID} = require('mongodb');
const assert = require('assert');

var obj = new ObjectID();
console.log(obj);
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'TodoApp';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function (err) {
    if(err) throw err;
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    db.collection('Todos').insertOne({
        text: 'something to do',
        completed: false,
    }, (err, result) => {
        console.log('in here');
        if(err) throw err;
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    // db.collection('Users').insertOne({
    //     name: 'Mitchel',
    //     age: 22,
    //     location: 'Lagos',
    // },(err, result)=>{
    //     if(err) throw err;
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    client.close();
});
