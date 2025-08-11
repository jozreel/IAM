const MongoClient =  require('mongodb').MongoClient;
const ObjectID  =  require('mongodb').ObjectId;
const url = process.env.DBURL;
const dbname = process.env.DBNAME;
const dbclient =  new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});
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
const ID = (id) => {
    if(typeof id !== 'string') {
        id =  id.toString();
    }
    return new ObjectID(id);
}

const autoID = async (sequence, filter, collection='counters') => {
    try {
        const db =  await makeDB();
        let query = {_id: sequence};
        if(filter) {
            filter.counterid = sequence;
            query =  filter;
        }
        const res =  await db.collection(collection).findOneAndUpdate(query, {$inc: {seq: 1}}, {upsert: true, returnOriginal: false});
        return res.value.seq;
        

    } catch (ex) {
        throw ex;
    }
}

const user_db =  require('./user-db');
const app_db =  require('./application-db');
const login_db =  require('./login-db');
const { default: role_db_factory } = require('./role-db');
const { default: access_db_factory } = require('./access-db');


module.exports =  Object.freeze({
    makeDB,
    user_db: user_db({makeDB, ID}),
    app_db: app_db({makeDB, ID,autoID}),
    login_db: login_db({makeDB, ID}),
    role_db: role_db_factory({makeDB, ID}),
    access_db: access_db_factory({makeDB, ID, autoID}),
    ID,
    autoID
});