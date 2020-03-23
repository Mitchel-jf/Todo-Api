const {MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function (err) {
    if(err) throw err;
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    //delete many
    // db.collection('Todos').deleteMany({completed: false}).then((result)=>{
    //     console.log(result);
    // }, (err) => {
    //    return console.log('Failed to delete the documents', err);
    // });

    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Pray without ceasing'}).then((result)=>{
    //     console.log(result.result);
    // }, (err)=>{
    //     if(err){
    //       return console.log('Failed to delete the document ', err);
    //     }
    // });

    //findOneAndDelete
    db.collection('Todos').findOneAndDelete({completed: true},).then((result)=> {
        console.log(result);
    }, (err)=>{
        if(err){
            console.log('Unable to delete item ', err);
        }
    });
    

    // client.close();
});
