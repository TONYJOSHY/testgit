const { MongoClient, ObjectId } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'TodosAppDb';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const user_collection = db.collection('userCollection');
    const todos_collection = db.collection('Todos');


    // insert items to db
    // const insertedUser = await user_collection.insertMany([
    //     { name: 'First User', complete: true },
    //     { name: 'Second User', complete: false },
    //     { name: 'Third User', complete: true },
    // ]);
    // console.log('Inserted users =>', insertedUser);

    // const insertedTodos = await todos_collection.insertMany([
    //     { name: 'First Todo task', complete: true },
    //     { name: 'Second Todo task', complete: false },
    //     { name: 'Third Todo task', complete: true },
    // ])
    // console.log('Inserted todos =>', insertedTodos);

    // query item
    // const findItem = await user_collection.findOne({ complete: true })
    // console.log('findOne item =>', findItem);

    // const findItem = await user_collection.find({ complete: true }).toArray();
    // console.log('findOne item =>', findItem);

    // const findItem = await user_collection.findOne({ _id: new ObjectId('6414578a653601c0440aa55c') })
    // console.log('findOne item =>', findItem);

    // count items
    // const countItem = await user_collection.countDocuments({ complete: false })
    // console.log('count item =>', countItem);

    // const findItem = await user_collection.estimatedDocumentCount()
    // console.log('estimatedDocumentCount item =>', findItem);

    // delete item
    // const deleteItem = await user_collection.deleteOne({ complete: true })
    // console.log('findOne item =>', deleteItem);

    // const deleteItem = await todos_collection.deleteMany({ complete: true })
    // console.log('findOne item =>', deleteItem);

    // update item
    // const findItem = await user_collection.updateOne({ _id: new ObjectId('6414578a653601c0440aa55c') })
    // console.log('findOne item =>', findItem);


}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
