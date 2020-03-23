const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'TodoApp';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function (err) {
    if (err) {
        return console.log('Unable to connect to the server ', err);
    }
    console.log("Connected successfully to server");

    //get the database from the client
    const db = client.db(dbName);

    // db.collection('Todos').find({
    //     _id : new ObjectID('5e78acd8aabc9e02873cb556')
    // }).toArray().then((docs) => {
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     if (err) {
    //         return console.log('Unable to fetch todos ', err);
    //     }
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count ${count}`);
    // }, (err) => {
    //     if (err) {
    //         return console.log('Unable to count todos ', err);
    //     }
    // });

    db.collection('Users').find({ name: "Mitchel" }).count().then((counts) => { 
        console.log(`Users count: ${counts}`);
    }, (err) => {
        if (err) {
            console.log('Unable to make count ', err);
        }
    });

    // client.close();
});
