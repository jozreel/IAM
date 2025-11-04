const string =  require('../../strings');
const user_model =  require('../../Entities/User');
const app_model =  require('../../Entities/Application');
const role_model =  require('../../Entities/Role');
const strings = require('../../strings');
const user_db_factory =  ({makeDB, ID}) => {
    const insert_user = async (data) => {
        try {
        const db = await makeDB();
        const result = await db.collection(string.USER_COLLECTION).insertOne(data);
        console.log(result);
        data.id =  result.insertedId;
        return data;
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
             if(result) {
                if(result.applications) {
                    const apps  =  db.collection(strings.APP_COLLECTON).find({id: {$in: result.applications}});
                   result.applications = await apps.toArray();
                }

                if(result.roles) {
                const roles =  db.collection(strings.ROLES_COLLECTION).find({id: {$in: result.roles}});
                result.roles =  await roles.toArray();
                }
            }
            return result ? make_user(result) : null;
            
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
             if(result) {
                if(result.applications) {
                    const apps  =  db.collection(strings.APP_COLLECTON).find({id: {$in: result.applications}});
                    result.applications = await apps.toArray();
                }
                if(result.roles) {
                    const roles =  db.collection(strings.ROLES_COLLECTION).find({id: {$in: result.roles}});
                    result.roles =  await roles.toArray();
                }
            }
            return result ? make_user(result) : null;


        } catch (ex) {
            throw ex;
        }
    }


     const find_by_username =  async ({username, password = false}={}) => {
        try {
            const db = await makeDB();
            let options ={};
            if(password = false) {
                options.projection = {password:false};
            }
            const result =  await db.collection(string.USER_COLLECTION).findOne({username},options);
            if(result) {
                if(result.applications) {
                    const apps  =  db.collection(strings.APP_COLLECTON).find({id: {$in: result.applications}});
                    result.applications = await apps.toArray();
                }
                if(result.roles) {
                    const roles =  db.collection(strings.ROLES_COLLECTION).find({id: {$in: result.roles}});
                    result.roles =  await roles.toArray();
                }
            }
            return result ? make_user(result) : null;


        } catch (ex) {
            throw ex;
        }
    }

       const find_by_username_or_email =  async ({username, password = false}={}) => {
        try {
            const db = await makeDB();
            let options ={};
            if(password = false) {
                options.projection = {password:false};
            }
            const result =  await db.collection(string.USER_COLLECTION).findOne({$or:[{username},{email:username}]},options);
            if(result) {
                if(result.applications) {
                    const apps  =  db.collection(strings.APP_COLLECTON).find({id: {$in: result.applications}});
                    result.applications = await apps.toArray();
                }
                if(result.roles) {
                    const roles =  db.collection(strings.ROLES_COLLECTION).find({id: {$in: result.roles}});
                    result.roles =  await roles.toArray();
                }
            }
            return result ? make_user(result) : null;


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
            const cursor =  await db.collection(strings.USER_COLLECTION).find(query, options).skip(skip).limit(limit);
            const result =  await cursor.toArray();
            if(result.applications) {
                const apps  =  db.collection(strings.APP_COLLECTON).find({id: {$in: result.applications}});
                result.applications = await apps.toArray();
            }
            if(result.roles) {
                const roles =  db.collection(strings.ROLES_COLLECTION).find({id: {$in: result.roles}});
                result.roles =  await roles.toArray();
            return result.map(r => make_user(r));
            }

        } catch (ex) {
            throw ex;
        }
    }
    const find_with_role = async (roleid, appid = '') => {
        try {
            const match = appid ? {"applications.appid": appid, "roles.roleid": roleid} : {"roles.roleid": roleid};
            const db = await makeDB();
            const cursor =  await db.collection(string.USER_COLLECTION).find(match);
            const rarr = []
            //const r =  await cursor.toArray();
            while(await cursor.hasNext()) {
            const r =  await cursor.next();
            if(r.applications) {
                const apps  =  db.collection(strings.APP_COLLECTON).find({id: {$in: r.applications}});
                r.applications = await apps.toArray();
            }
            if(r.roles) {

                const roles =  db.collection(strings.ROLES_COLLECTION).find({id: {$in: r.roles}});
                r.roles =  await roles.toArray();
            }
            rarr.push(r);
           }
           return rarr.map(u => make_user(u));

        } catch (ex) {
            throw ex
        }
    }


    const check_if_role_assigned =async (userid, roleid) => {
        try {
            const db =  await makeDB();
              const _id = ID(userid);
              const has_role = await db.collection(string.USER_COLLECTION).findOne({_id, "roles.roleid": roleid}, {projection :{roles: {$elemMatch: {roleid}}}});
              if(has_role) {

                const rl =  has_role.roles[0];
                return rl;
              }

        } catch (ex) {
            throw ex;
        }
    }


    const assign_role_to_user = async (data) => {
        try {
            const _id =  ID(data.userid);
            const db = await makeDB();
            const upd =  await db.collection(strings.USER_COLLECTION).updateOne({_id}, {
                $push: {roles: data}
            });
            if(upd.modifiedCount > 0) {
                return {data};
            } else {
                throw new Error('could not add role to user');
            }
        } catch(ex) {
            throw ex;
        }

    }

   

    const verify_access = async (userid, roleid) => {
        try {
              const db =  await makeDB();
              const _id = ID(userid);
              const has_role = await db.collection(string.USER_COLLECTION).findOne({_id, "roles.roleid": roleid}, {projection :{roles: {$elemMatch: {roleid}}}});
              if(has_role) {

                const rl =  has_role.roles[0];
                return rl;
              }
             
              const has_app_role = await db.collection(string.APP_COLLECTON).findOne({_id: userid, "serviceaccountroles.roleid": roleid}, {projection: {serviceaccountroles: {$elemMatch: {roleid}}}});
              if(has_app_role) {
                const ar =  has_app_role.roles[0];
                return ar
              }

        } catch (ex) {
            throw ex;
        }
    }


    
    const make_user = (data) => {
        data.applications = data.applications ?  data.applications.map(s => app_model(a)): [];
        data.roles = data.roles ?   data.roles.map(r => role_model(r)) : [];
        return user_model({
            id: data._id,
            ...data
        })
    }

    return Object.freeze({
        insert_user,
        update_user,
        delete_user,
        find_by_email,
        get_user,
        list_users,
        find_with_role,
        find_by_username,
        find_by_username_or_email,
        verify_access,
         check_if_role_assigned,
         assign_role_to_user
    });
}
module.exports = user_db_factory;