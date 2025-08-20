const strings = require('../../strings');
const make_app =  require('../../Entities/Application');
const mmake_role = require('../../Entities/Role');
const make_access =  require('../../Entities/Access');
const application_db_factory = ({makeDB, ID, autoID}) => {
    const insert_application = async (data) => {
        try {
            console.log(data)
            const db =  await makeDB();
            data._id = data.id;
            const result = await db.collection(strings.APP_COLLECTON).insertOne(data);
           
            return data;

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
        const res = result.map(re => build_application(re));
        
        return res;
    }
    const get_application =  async (id) => {
        try {
            const _id = id;
            const db =  await makeDB();
            const result = await db.collection(strings.APP_COLLECTON).findOne({_id});
            
            console.log(result, "result", id);
            if(result) {
              const res =  build_application(result);
              return res;
            }

        } catch (ex) {
            throw ex;
        }
    }
    const update_application = async ({id, ...changes}) => {
        try {
            
            const _id = id;
            const db = await makeDB();
            const update = await db.collection(strings.APP_COLLECTON).findOneAndUpdate({_id}, {$set: changes}, {returnDocument: "after"});
            return update;

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

    const build_application = (data) => {
        const roles = [];
      
        data.id =  data._id;
        const app_access = [];
        for(let rl of data.roles) {
            if(rl.access) {
                const accss = [];
                for(let access of rl.access) {
                    const oa =  data.access ? data.screens.find(a => a.id == access) : null;
                    if(oa) {
                        const aa =  make_access(oa);
                        accss.push(aa);
                    }

                }
                rl.access  = accss;
            }

            const ro =  mmake_role(rl)
            roles.push(ro);
        }
        data.roles =  roles;
        for(let access of data.screens) {
            const accs = make_access(access);
            app_access.push(accs);
        }
        data.screens =  app_access;
       

        return  make_app(data);
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