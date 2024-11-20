
const {ObjectId} = require('mongodb');

let MongoClient = require('mongodb').MongoClient

const connectionString = "mongodb+srv://kmr6702:kmr6702@getoutthere.l8cjg.mongodb.net/TestDB?retryWrites=true&w=majority&appName=GetOutThere"
const client = new MongoClient(connectionString);
let conn;
    let db;
    async function connect(){
        if(!db){

            try {
                conn = await client.connect();
                db = await conn.db("TestDB");
                console.log("database connected !!")
            } catch(e) {
                console.error(e);
            }
        } else{
            console.log("already connected to database")
        }
    }

      
    function getDb(){
        if (!db) {
            throw Error('Db not initialized');
        }
        return db;
    };
    
    module.exports = {
        connect,
        getDb
    };