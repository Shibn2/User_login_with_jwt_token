import { MongoClient } from "mongodb";

console.log('process.env.ATLAS_URI -', process.env.ATLAS_URI);
const client = new MongoClient(process.env.ATLAS_URI);

let conn;

try{
    conn = await client.connect()
} catch(err) {
    console.log('Error occured', err);
}

const db = conn.db(process.env.db);
export default db;