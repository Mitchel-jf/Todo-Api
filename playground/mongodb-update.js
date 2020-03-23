const { MongoClient, ObjectID } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function (err) {
    if (err) throw err;
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    // db.collection('Todos').findOneAndUpdate(
    //     { _id: new ObjectID('5e78da8c760d4e1094c411ab') },
    //     { $set: { completed: false } },
    //     { returnOriginal: false }
    // ).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate(
        { name: 'Angel' },
        {
            $set: { name: 'Tobi' },
            $inc: { age: 1 }
        },
        { returnOriginal: false }
    ).then((result)=> {
        console.log(result);
    });


    // client.close();
});
