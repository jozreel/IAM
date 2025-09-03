const MongoClient =  require('mongodb').MongoClient;
const ObjectID  =  require('mongodb').ObjectId;
const url = process.env.DBURL;
const dbname = process.env.DBNAME;
const dbclient =  new MongoClient(url);
let cachedb;
const makeDB = async () => {

    try {
        if (!cachedb) {
            const dc = await dbclient.connect();
        }
         const db = dbclient.db(dbname);
         cachedb =  db;
         return db;

    } catch (ex) {
        console.log(ex);
        throw ex;
    }
}

module.exports =  Object.freeze({makeDB: makeDB});