const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

async function main() {
    const client = new MongoClient(url, { monitorCommands: true });

    try {
        // Connect to MongoDB using the client
        await client.connect();

        // database Name
        const dbName = 'myproject';
        const db = client.db(dbName);

        // new user
        var name = 'user' + Math.floor(Math.random() * 10000);
        var email = name + '@mit.edu';

        // insert into customer table
        var collection = db.collection('customers');
        var doc = { name, email };

        collection.insertOne(doc, { w: 1 }, function (err, result) {
            console.log('Document insert');
        });

        var customers = await collection.find().toArray();
        console.log('Collection:', customers);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        // Close the MongoDB client when all operations are done
        client.close();
    }
}

main();