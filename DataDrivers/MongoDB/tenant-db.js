const strings = require("../../strings");
const make_tenant =  require('../../Entities/Tenant');
const make_app =  require('../../Entities/Application');
const {TenantRole, AppRole} =  require('../../Entities/Role');
const make_access = require('../../Entities/Access');

const tenant_db = ({makeDB, ID}) => {

    const add_tenant = async (data) => {
        try {
            const db =  await makeDB();
            const ins =  await db.collection(strings.TENANT_COLLECTION).insertOne(data);
            data.id =  ins.insertedId;
            return data;

        } catch(ex) {
            throw ex;
        }

    }

    const get_tenant = async id => {
        try {
            const _id =  ID(id);
            const db =  await makeDB();
            const res =  await db.collection(strings.TENANT_COLLECTION).findOne({_id});
            if(res.roles) {
                res.roles = res.roles.map(r => TenantRole(r));
            }
            return build_tenant(res);
        } catch (ex){
            throw ex;
        }
    }

        const get_tenant_by_name = async name => {
        try {
            const db =  await makeDB();
            const regex = new RegExp(name, "ig");
            const res =  await db.collection(strings.TENANT_COLLECTION).findOne({tenantname: {$regex: regex}});
            if(res) {
                if(res.roles) {
                    res.roles = res.roles.map(r => TenantRole(r));
                }
                return build_tenant(res);
           }
        } catch (ex){
            throw ex;
        }
    }

    const update_tenant = async ({id, ...data}) => {
        try {
            const _id =  ID(id);
            const upd =  await db.collection(strings.TENANT_COLLECTION).updateOne({_id}, {$set: data});
            return {
                id, ...data
            };
        } catch(ex) {
            throw ex;
        }
    }

    const delete_tenant = async (id) => {
        try {
            const _id =  ID(id);
            const db =  await makeDB();

            const del =  await db.collection(strings.TENANT_COLLECTION).deleteOne({_id});
            return {deleted: deletedCount >0 ? true : false}
        } catch(ex) {
            throw ex;
        }

    }

    const add_application_to_tenant = async (id, appid) => {
        try {

            const _id =  ID(id);
            const db =  await makeDB();
            const res = await db.collection(strings.TENANT_COLLECTION).updateOne({_id}, {$push: {applications: appid}});
            if(res.modifiedCount > 0) {
                return {appadded: true};
            } else {
                throw new Error('could not add app')
            }
        } catch(ex) {
            throw ex;
        }

    }

    const remove_application_from_tenant = async(id, appid) => {
        try {
            const _id =  ID(id);
            const db = await makeDB();
            const rem =  await db.collection(strings.TENANT_COLLECTION).updateOne({_id}, {$pull: {applications: appid}});

        } catch (ex){
            throw ex;
        }
    }

    const add_role_to_tenant = async (id, role) => {
        try {
            const _id =  ID(id);
            const db =  await makeDB();
            const get_tenant_by_nameins = await db.collection(strings.TENANT_COLLECTION).updateOne({_id}, {$push: role});
            if(ins.modifiedCount > 0) {
                throw new Error('Could not add role');
            }
            return {...role, tennentid: id};

        } catch(ex) {
            throw ex;
        }
    }

      const remove_role_from_tenant = async (id, role) => {
        try {
            const _id =  ID(id);
            const db =  await makeDB();
            const ins = await db.collection(strings.TENANT_COLLECTION).updateOne({_id}, {$pull: role});
            if(ins.modifiedCount > 0) {
                throw new Error('Could not add role');
            }
            return {...role, tenantid: id};

        } catch(ex) {
            throw ex;
        }
    }

    const get_tenantrole_by_name =  async (id, name) => {
        try {

            const _id =  ID(id);
            const db = await makeDB();
            const regex = new RegExp(name, "ig");
            const match = {_id, "roles.name": {$regex: regex}};
            const tnts =  db.collection(strings.TENANT_COLLECTION).aggregate([
                {$match:match}, 
                {$project: {roles: {$filter: {
                    input: "$roles",
                    as: "role",
                    cond: {$regexMatch: {input: "$$role.name", regex}}}}}
                },
                {$unwind: "$roles"},
                {$addFields: {"roles.tenantid": "$_id"}},
                {$replaceRoot: { newRoot: "$roles" } }
            ]);
            const res =  await tnts.toArray();
            const mrole =  res[0];
            if(mrole) {
                return TenantRole(mrole);
            } else {
                return null;
            }
                    

        } catch(ex) {
            throw ex;
        }
    }

    const get_tenant_roles = async(id) => {
        try {
            const _id =  ID(id);
            const db  =  await makeDB();
            const res =  await db.collection(strings.TENANT_COLLECTION).finsOne({_id}, {projection: {roles: 1}});
            if(res) {
               const rls = res.roles;
               const result =  rls.map(r => TenantRole({...r, tenantid: id}));
               return result;
            } else {
                return [];
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
    



    const build_tenant = data  => {
        return make_tenant({...data});
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
        add_tenant,
        get_tenant,
        update_tenant,
        delete_tenant,
        add_application_to_tenant,
        remove_application_from_tenant,
        add_role_to_tenant,
        remove_role_from_tenant,
        get_tenantrole_by_name,
        get_tenant_roles,
        get_tenant_by_name,
        get_applications_for_tenant
    })

}

module.exports =  tenant_db;