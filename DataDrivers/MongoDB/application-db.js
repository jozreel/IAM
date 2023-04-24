const strings = require('../../strings');
const application_db_factory = ({makeDB, ID, autoID}) => {
    const insert_application = async (data) => {
        try {
            const db =  await makeDB();
            const result = await db.collection(strings.APP_COLLECTON).insertOne(data);
            return result.ops[0];

        } catch (ex) {
            throw ex;
        }
    }
    const list_applications = async ({skip = 0, limit=0, appid}) => {
        const db = await makeDB();
        let query = {};
        if(appid) {
            query = {"applications.appid": appid};
        }
        const cursor =  db.collection(strings.APP_COLLECTON).find(query).skip(skip).limit(limit);
        const result =  await cursor.toArray();
        return result;
    }
    const get_application =  async (id) => {
        try {
            const _id = ID(id);
            const db =  await makeDB();
            const result = await db.collection(strings.APP_COLLECTON).findOne({_id});
            return result;

        } catch (ex) {
            throw ex;
        }
    }
    const update_application = async ({id, ...changes}) => {
        try {
            const _id = ID(id);
            const db = await makeDB();
            const update = await db.collection(strings.APP_COLLECTON).findOneAndUpdate({_id}, {$set: changes}, {returnOriginal: false});
            return update && update.value ? update.value : null;

        } catch (ex) {
            throw ex;
        }
    }
    const delete_application = async (id) => {
        try {
            const _id =  ID(id);
            const db = await makeDB();
            const del = await db.collection(strings.APP_COLLECTON).deleteOne({_id});
            return del.deletedCount;

        } catch (ex) {
            throw ex;
        }
    }
    return Object.freeze({
        insert_application,
        list_applications,
        get_application,
        update_application,
        delete_application,
        autoID
    });
}

module.exports = application_db_factory;