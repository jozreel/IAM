const strings = require('../../strings');
const login_db = ({makeDB, ID}) => {
    const insert_login = async (data) => {
        try {
            const db = await makeDB();
            const result =  await db.collection(strings.LOGIN_COLLECION).insertOne(data);
            console.log(result);
            return {_id: result.insertedId, ...data};

        } catch (ex) {
            throw ex;
        }
    }

    const list_logins = async ({skip=0, limit=0, uid, from, to}) => {
        try {
            const query = {};
            if(uid) {
                query.uid =  uid;
            }
            if(from) {
                console.log(from);
                query.createddate = {$gte: from, $lte: to}
            }
            const db = await makeDB();
            const cursor = db.collection(strings.LOGIN_COLLECION).find(query).skip(skip).limit(limit);
            const result = await cursor.toArray();
            console.log(query, result);
            return result;

        } catch (ex) {
            throw ex;
        }

    }

    const update_login  = async ({id, ...changes}) => {
        try {
            const db =  await makeDB();
            const _id =  ID(id);
            const result =  await db.collection(strings.LOGIN_COLLECION).findOneAndUpdate({_id}, {$set: changes});
            return result && result.value ? result.value : null;
        } catch (ex) {
            throw ex;
        }

    }

    const  get_last_login = async (user) => {
        const db = await makeDB();
        const cursor = db.collection(strings.LOGIN_COLLECION).find({uid: user}).sort({createddate: -1}).limit(1);
        const logins = await cursor.toArray();
        if(logins.length > 0) {
            return logins[0];
        } else {
            return null;
        }
    }

    const delete_login = async (id) => {
        try {
            const db =  await makeDB();
            const _id =  ID(id);
            const result =  await db.collection(strings.LOGIN_COLLECION).deleteOne({_id});
            return result.deletedCount;

        } catch (ex) {
            throw ex;
        }
    }

    const clear_login = async(id, uid) => {
        try {
            const db =  await makeDB();
            const _id =  ID(id);
            console.log(id, uid);
            const aggr =  db.collection(strings.LOGIN_COLLECION).aggregate([
                
                {$match: {uid}},
                {$set:{_id: ID()}},
            
                {$merge: {
                     into: {db: this.DbName, coll: 'loginversions'},
                     on: "_id",
                     whenNotMatched: "insert"

                   }
                }
            ]);

            await aggr.toArray();

            const res = await db.collection(strings.LOGIN_COLLECION).deleteOne({_id});
            console.log(res);
        } catch(ex) {
            throw ex;
        }
    }

    const get_login = async (id) => {
        try  {
            const _id =  ID(id);
            console.log(typeof _id)
            const db =  await makeDB();
            const result = await db.collection(strings.LOGIN_COLLECION).findOne({_id});
            return result;


        } catch (ex) {
            throw ex;
        }
    }

    return Object.freeze({
        insert_login,
        update_login,
        list_logins,
        get_login,
        delete_login,
        get_last_login,
        clear_login
    });
}
module.exports = login_db;