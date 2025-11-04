const strings = require('../../strings');
const make_app =  require('../../Entities/Application');
const {AppRole} = require('../../Entities/Role');
const make_access =  require('../../Entities/Access');
const make_tenant = require('../../Entities/Tenant');
const application_db_factory = ({makeDB, ID, autoID}) => {
    const insert_application = async (data) => {
        try {
            
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
        //const result =  await cursor.toArray();
        let res  = [];
        while(await cursor.hasNext()) {
            let re =  await cursor.next(); 
            console.log(re.tenantid)
            const tenant =  await db.collection(strings.TENANT_COLLECTION).findOne({_id: re.tenantid});
            console.log(tenant);
            const app_ten =  make_tenant(tenant);
            re.tenant =  app_ten;
            const app = build_application(re);
            res.push(app);
        }
    
        
        return res;
    }
    const get_application =  async (id) => {
        try {
            const _id = id;
            const db =  await makeDB();
            const result = await db.collection(strings.APP_COLLECTON).findOne({_id});
            
           
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




    const get_apps_assigned_to_role = async (roleid) => {
        try {
            const db =  await makeDB();
            const res =  db.collection(strings.APP_COLLECTON).find({"serviceaccountroles.roleid": roleid}).project({applicationname: 1, serviceaccountroles: {$elemMatch: {roleid}}})
            return await res.toArray()

        } catch(ex) {
            throw ex;APP_COLLECTON
        }

    }

    const remove_app_role = async(roleid, appid) => {
        try {
            const db = await makeDB();
            const _id = appid.length === 24 ?  ID(appid) : appid;
            const rem =  await db.collection(strings.APP_COLLECTON).updateOne({_id, "roles.id": roleid}, {
                $pull: {roles:  {id: roleid}}
            });
            if(rem?.matchedCount > 0 && rem.modifiedCount !== 0) {
                return {deteled: true}
            } else {
                throw new Error("Could not delete the role");
            }


        } catch(ex) {
            throw ex;
        }
    }

    const get_applications_for_tenant = async tid => {
        try {
            const db =  await makeDB();
            const res = db.collection(strings.APP_COLLECTON).find({
                tenantid: tid
            });
            let resarr = [];
            while(await res.hasNext()) {
                const r = await  res.next();
                const aapp = build_application(r);
                
                resarr.push(aapp);
            }

            return resarr;

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

            const ro =  AppRole(rl)
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
        get_apps_assigned_to_role,
        remove_app_role,
        get_applications_for_tenant,
        autoID
    });
    
}

module.exports = application_db_factory;