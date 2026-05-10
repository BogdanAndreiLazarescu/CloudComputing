import { MongoClient } from 'mongodb';

const uri = process.env.NEXT_ATLAS_URI;

if (!uri) {
    throw new Error('Please add your Mongo URI to .env');
}

let mongoClient = null;
let database = null;

export async function connectToDatabase() {
    try {
        if (mongoClient && database) {
            return { mongoClient, database };
        }
        if (!global._mongoClient) {
            global._mongoClient = await (new MongoClient(uri)).connect();
        }
        mongoClient = global._mongoClient;
        database = mongoClient.db(process.env.NEXT_ATLAS_DATABASE);
        return { mongoClient, database };
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export async function getCollection(name) {
    const { database } = await connectToDatabase();
    return database.collection(name);
}