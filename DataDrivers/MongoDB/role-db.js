const strings = require("../../strings");
const role_model =  require('../../Entities/Role');
const access_model =  require('../../Entities/Access');

const role_db_factory = ({makeDB, ID}) => {

    const InsertRole = async(roledata) => {
        try {
            const _id =  ID(roledata.applicationid);
            roledata.id = crypto.randomUUID();                          
            const db =  await makeDB();
            const ud =  await db.collection(strings.APP_COLLECTON).updateOne({_id} , {
                $push: {roles: {...roledata}}
            });
            
            if(ud.matchedCount > 0 && ud.modifiedCount !==0) {
                return roledata;
            } else  {
                throw new Error('Could not insert the role');
            }


        } catch(ex) {
            throw ex;
        }

    }

    const GetRoleById = async (roleid) => {
        try {
            
                    
            const db = await makeDB();
           
            const accs =  db.collection(strings.APP_COLLECTON).aggregate([{
                $match: {"roles.id": roleid}}, 
                {$project: {roles: {$filter: {
                    input: "$roles",
                    as: "role",
                    cond: {$eq: ["$$role.id", roleid]}}}}},{$unwind: "$roles"},
                {$replaceRoot: { newRoot: "$roles" } }
            ]);
            const arr =  await accs.toArray();
            const rl = arr[0];
            if(rl) {
                const acclst = await db.collection(strings.APP_COLLECTON).findOne({_id: ID(rl.applicationid)}, {projection: {screens: 1}});
                if(acclst && rl.access) {
                    if(acclst.screens) {
                        const acc_list = [];
                        const access_mapp =  new Map();
                        for(let a of acclst.screens) {
                            access_mapp.set(a.id, a);
                        }
                        for(let a of rl.access) {
                            const full_access =  access_mapp.get(a);
                            access_obj =  access_model(full_access)
                            acc_list.push(access_obj);
                        }
                       

                   }
                }
                const res = build_role(rl);
                return res;
            }
           

        } catch(ex) {
            throw ex;
        }
    }

    const GetRoleByName = async (rolename) => {
        try {
            
                    
            const db = await makeDB();
             const regex = new RegExp(rolename, "ig");
            const accs =  db.collection(strings.APP_COLLECTON).aggregate([{
                $match: {"roles.name": {$regex: regex}}}, 
                {$project: {roles: {$filter: {
                    input: "$roles",
                    as: "role",
                    cond: {$regexMatch: {input: "$$role.name", regex}}}}}},{$unwind: "$roles"},
                {$replaceRoot: { newRoot: "$roles" } }
            ]);
            const arr =  await accs.toArray();
            const rl = arr[0];
            if(rl) {
               
                const acclst = await db.collection(strings.APP_COLLECTON).findOne({_id: ID(rl.applicationid)}, {projection: {screens: 1}});
                if(acclst && rl.access) {
                    if(acclst.screens) {
                        const acc_list = [];
                        const access_mapp =  new Map();
                        for(let a of acclst.screens) {
                            access_mapp.set(a.id, a);
                        }
                        for(let a of rl.access) {
                            const full_access =  access_mapp.get(a);
                            access_obj =  access_model(full_access)
                            acc_list.push(access_obj);
                        }
                       

                   }
                }
                const res = build_role(rl);
                return res;
            }
           

        } catch(ex) {
            throw ex;
        }
    }



    const UpdateAppRole = async (role) => {
        try {
            const _id = ID(role.applicationid);
            const db =  await makeDB();
            const upd = await db.collection(strings.APP_COLLECTON).updateOne({_id, "roles.id": role.id},{
                $set: {"roles.$": role}
            });
            if(upd?.matchedCount > 0 && upd.modifiedCount !==0) {
                return role;
            } else {
                throw new Error('Cannot iupdate this role');
            }

        } catch (ex) {
            throw ex;
        }
    }

    const RemoveAppRole = async(roleid, appid) => {
        try {
            const db = await makeDB();
            const _id =  ID(appid);
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

    const GetAppRoles =  async(appid) => {
        try {
            const db = await makeDB();
            const roles = [];
            const _id =  ID(appid);

            const res =  await db.collection(strings.APP_COLLECTON).findOne({_id}, {projection: {roles: 1, screens: 1}});
            const accessMap = new Map();
            if(res.screens) {
                for(let ac of res.screens) {
                    accessMap.set(ac.id, ac);
                }
            }
            if(res && res.roles) {
                for(let d of res.roles) {
                    
                    if(!d.applicationid) {
                        d.applicationid = appid;
                    }
                   

                    const rs =  build_role(d);
                    const js =  rs.ToJson();
                    const accesslist = [];
                     if(d.access) {
                        for(let ra of d.access) {
                            const acc_d =  accessMap.get(ra); 
                          
                            if(acc_d) {
                            const access_obj = access_model(acc_d);       
                            accesslist.push(access_obj.ToJson());
                            }
                        }
                        js.access =  accesslist;
                    }
                    roles.push({...js });
                }
                return roles;
            } else {
                throw new Error("Unable to fetch role data");
            }
            

        } catch(ex) {
            throw ex;
        }
    }

    const AddAccessToRole = async (appid, roleid, access) => {
        try {
            const db =  await makeDB();
            const _id = ID(appid);
            let mut =  {$push: {"roles.$.access": access}};
            if(typeof access === 'object' && typeof access.push !== 'undefined' ) {
                mut =  {$push: {"roles.$.access": {$each: access}}}
            }
            
            const upd = await db.collection(strings.APP_COLLECTON).updateOne({_id, "roles.id": roleid}, mut);



            if(upd.matchedCount > 0 && upd.modifiedCount !== 0) {
                return true;
            } else {
                throw new Error("Could not add access to role");
            }


        } catch(ex) {
            throw ex
        }
    }

    const RemoveAccessFromRole = async (appid, roleid, access) => {
        try {
            const db =  await makeDB();
            const _id = ID(appid);
            let md =  {$pull: {"roles.$.access" : access}};
            if(typeof access === 'object' && typeof access.push !== undefined) {
                md = {$pull: {"roles.$.access": {$in: access}}};
            }
            console.log(md, access);
            const upd = await db.collection(strings.APP_COLLECTON).updateOne({_id, "roles.id": roleid}, 
                md
            );

            if(upd.matchedCount > 0 && upd.modifiedCount !== 0) {
                return {deleted: true};
            } else {
                throw new Error("Could not delere access from role");
            }


        } catch(ex) {
            throw ex;
        }
    }

    const CheckRoleUserConstraint = async(id) => {
        try {
            const db = await makeDB();
        
            const usr_role =  await db.collection(strings.USER_COLLECTION).findOne({"applications.roleid": id}, {projection: {applications: {$elemMatch: {roleid: id}}}});
            
            return usr_role;

        } catch (ex) {
            throw ex;
        }
    }

    const build_role = (data) => {
        const role =  role_model({
            id: data.id,
            name: data.name,
            applicationid: data.applicationid,
            access: data.screens || [],
            createddate: data.createddate,
            lastmodifieddate: data.lastmodifieddate,
        });

        return role;
    }


    return Object.freeze({
        InsertRole,
        GetRoleById,
        UpdateAppRole,
        RemoveAppRole,
        GetAppRoles,
        AddAccessToRole,
        RemoveAccessFromRole,
        CheckRoleUserConstraint,
        GetRoleByName
    });



}

module.exports = role_db_factory;