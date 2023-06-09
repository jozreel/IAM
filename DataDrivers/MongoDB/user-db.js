const string =  require('../../strings');
const user_db_factory =  ({makeDB, ID}) => {
    const insert_user = async (data) => {
        try {
        const db = await makeDB();
        const result = await db.collection(string.USER_COLLECTION).insertOne(data);
        return result.ops[0];
        } catch (ex) {
            throw ex;
        }

    }
    const update_user = async ({id, ...changes}) => {
        try {
            const _id =  ID(id);
            const db = await makeDB();
            const result =  await db.collection(string.USER_COLLECTION).findOneAndUpdate({_id}, {$set: changes});
            return result && result.value ? result.value : null;

        } catch (ex) {
            throw ex;
        }

    }
    const delete_user = async(id) => {
        try {
            const _id =  ID(id);
            const db = await makeDB();
            const result = await db.collection(string.USER_COLLECTION).deleteOne({_id});
            return result.deletedCount;
            
        } catch (ex) {
            throw ex;
        }

    }
    const get_user = async (id, passwod=false) => {
        try {
            const _id =  ID(id);
            const db = await makeDB();
            let options ={};
            if(passwod === false) {
                options.projection = {password:false};
            }
            const result =  await db.collection(string.USER_COLLECTION).findOne({_id}, options);
            return result;
            
        } catch (ex) {
            throw ex;
        }
    }
    const find_by_email =  async ({email, password = false}={}) => {
        try {
            const db = await makeDB();
            let options ={};
            if(password = false) {
                options.projection = {password:false};
            }
            const result =  await db.collection(string.USER_COLLECTION).findOne({email},options);
            return result;


        } catch (ex) {
            throw ex;
        }
    }
    const list_users = async ({skip=0, limit=0, appid, q, password=false}={}) => {
        try {
            const db =  await makeDB();
            let options ={};
            if(password === false) {
                options.projection = {password:false};
            }
            let query = {};
            if(appid) {
                query = {"applications.appid": appid};
            }
            if(q) {
                const re =  new RegExp(q,'i');
                query.$or = [{fullname: {$regex: re}}, {email: {$regex: re}}];
            }
            const cursor =  await db.collection(string.USER_COLLECTION).find(query, options).skip(skip).limit(limit);
            const result =  await cursor.toArray();
            return result;

        } catch (ex) {
            throw ex;
        }
    }
    const find_with_role = async (roleid, appid) => {
        try {
            const db = await makeDB();
            const cursor =  await db.collection(string.USER_COLLECTION).find({"applications.appid": appid, "applications.role": roleid});
            return await cursor.toArray();

        } catch (ex) {
            throw ex
        }
    }
    return Object.freeze({
        insert_user,
        update_user,
        delete_user,
        find_by_email,
        get_user,
        list_users,
        find_with_role
    });
}
module.exports = user_db_factory;