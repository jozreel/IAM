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
const ID = (id) => {
    if(!id) {
        return new ObjectID();
    }
    if(typeof id === 'string') {
        if(id.length !== 24) {
        return;
      }
       // id =  id.toString();
        return new ObjectID(id);
    } else {
        return id;
    }
    
}

const autoID = async (sequence, filter, collection='counters', start=1) => {
    try {
        const db =  await makeDB();
        
        let query = {_id: sequence};
        if(filter) {
            filter.counterid = sequence;
            query =  filter;
        }

        const counter = await db.collection(collection).findOne(query);
        let res;
       
        if(counter) {
           console.log('incrementing')
            res =  await db.collection(collection).findOneAndUpdate(query, {$inc: {seq: 1}}, {upsert: true, returnDocument: "after"});
            console.log(res);
        } else {
           
             await db.collection(collection).insertOne({...query, seq:start});
             res = {...query, seq:start}
        }
        console.log(res.seq);
        return res?.seq;
        

    } catch (ex) {
        throw ex;
    }
}

const user_db =  require('./user-db');
const app_db =  require('./application-db');
const login_db =  require('./login-db');
const role_db_factory = require('./role-db');
const access_db_factory  = require('./access-db');
const token_db = require('./token-db');
const tenant_db =  require('./tenant-db');


module.exports =  Object.freeze({
    makeDB,
    user_db: user_db({makeDB, ID}),
    app_db: app_db({makeDB, ID,autoID}),
    login_db: login_db({makeDB, ID}),
    role_db: role_db_factory({makeDB, ID}),
    access_db: access_db_factory({makeDB, ID, autoID}),
    token_db: token_db({makeDB, ID}),
    tenant_db: tenant_db({makeDB, ID}),
    ID,
    autoID
});