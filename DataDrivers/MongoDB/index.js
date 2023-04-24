const MongoClient =  require('mongodb').MongoClient;
const ObjectID  =  require('mongodb').ObjectID;
const url = process.env.DBURL;
const dbname = process.env.DBNAME;
const mongo_client =  new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});

const makeDB = async () => {
    if(!mongo_client.isConnected())  {
        await mongo_client.connect();
    }
    return mongo_client.db(dbname);
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


module.exports =  Object.freeze({
    makeDB,
    user_db: user_db({makeDB, ID}),
    app_db: app_db({makeDB, ID,autoID}),
    login_db: login_db({makeDB, ID}),
    ID,
    autoID
});