const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://doapps-603ec79b-9846-4a86-97d1-214f75430494:3OXwj8076vqr154R@db-mongodb-nyc3-77238-bc13cf00.mongo.ondigitalocean.com/admin?authSource=admin&tls=true'; 
let db = null;

// connect to mongo
async function connect() {
    client = await MongoClient.connect(url);
    console.log("Connected successfully to db server");
    db = client.db('bank_app');
}

connect();

// create user account using the collection.insertOne function
function create(name, email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 100};
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
    });
}


module.exports = {create, findOne, find, update, all};
