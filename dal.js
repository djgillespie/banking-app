//const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const url = 'mongodb+srv://djgillespie611:b3nFX7kj4KuU8ks@cluster0.brhlryj.mongodb.net/?retryWrites=true&w=majority';
//const url = 'mongodb://localhost:27017'; 
let db = null;

// connect to mongo
async function connect(err, client) {
    await mongoose.connect(url);
    console.log("Connected successfully to db server");
    //db = client.db('admin');
}

connect();
// MongoClient.connect(url, async function (err, client) {
//     await client.connect();
//     console.log("Connected successfully to db server");

//     // connect to myproject database
//     db = client.db('Project 0');
// });

// create user account using the collection.insertOne function
function create(name, email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance:0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    })
}

// find user account 
function find(email) {
    return new Promise((resolve, reject) => {
        const users = db
            .collection('users')
            .find({ email: email })
            .toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

// find user account
function findOne(email) {
    return new Promise((resolve, reject) => {
        const users = db
            .collection('users')
            .findOne({ email: email })
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    })
}

// update - deposit/withdraw amount
function update(email, amount) {
    return new Promise((resolve, reject) => {
        const users = db
            .collection('users')
            .findOneAndUpdate(
                { email: email },
                { $inc: { balance: amount } },
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );


    });
}

// return all users by using the collection.find method
function all() {
    return new Promise((resolve, reject) => {
        const users = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}


module.exports = { create, findOne, find, update, all };