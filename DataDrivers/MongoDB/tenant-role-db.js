const { TenantRole } = require("../../Entities/Role");
const strings = require("../../strings");

const tenant_role_db  = ({makeDB, ID}) => {
    const add_tenant_role = async(roledata) => {
        try {
            const _id =  ID(roledata.tenantid);                      
            const db =  await makeDB();
            const ud =  await db.collection(strings.TENANT_COLLECTION).updateOne({_id} , {
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


    const get_tenant_roles = async (tenantid) => {
        try {
            const db = await makeDB();
            const roles = [];
            const _id =  tenantid.length === 24 ? ID(tenantid) : tenantid;

            const res =  await db.collection(strings.TENANT_COLLECTION).findOne({_id}, {projection: {roles: 1}});
           
            if(res && res.roles) {
                for(let d of res.roles) {
                    
                    if(!d.tenantid) {
                        d.tenantid = tenantid;
                    }
                    

                    const rs =  build_role(d);
                    //const js =  rs.ToJson();
                    roles.push(rs);
                }
                return roles;
            } else {
                throw new Error("Unable to fetch role data");
            }
                        
        } catch (ex){
            throw ex;
        }

    }


    const remove_tenant_role = async (tenantid, roleid) => {
        try {
            const db = await makeDB();
            const _id = tenantid.length === 24 ?  ID(tenantid) : tenantid;
            const rem =  await db.collection(strings.TENANT_COLLECTION).updateOne({_id, "roles.id": roleid}, {
                $pull: {roles:  {id: roleid}}
            });
            if(rem?.matchedCount > 0 && rem.modifiedCount !== 0) {
                return {deteled: true}
            } else {
                throw new Error("Could not delete the role");
            }


        } catch(ex){
            throw ex;
        }
    } 

    const build_role = (data) => {
        const role =  TenantRole({
            id: data.id,
            name: data.name,
            tenantid: data.tenantid,
            createddate: data.createddate,
            lastmodifieddate: data.lastmodifieddate,
        });

        return role;
    }
    
    const get_tenant_role_by_id = async(id, tenantid) => {
        try {
            const db = await makeDB();
            const match = tenantid ?  {_id: ID(tenantid), "roles.id": id} :  {"roles.id": id}
            
            const accs =  db.collection(strings.TENANT_COLLECTION).aggregate([
                {$match:match},
                {$project: {roles: {$filter: {
                    input: "$roles",
                    as: "role",
                    cond: {$eq: ["$$role.id", id]}}}}},
                    {$unwind: "$roles"},
                {$replaceRoot: { newRoot: "$roles" } }
            ]);
            const arr =  await accs.toArray();
            const rl = arr[0];
            if(rl) {
               
                const res = build_role(rl);
                return res;
            }

        } catch(ex) {
            throw ex;
        }
    }

       
    const get_tenant_role_by_name = async(rolename, tenantid) => {
        try {
            const db = await makeDB();
            const regex = new RegExp(rolename, "ig");
             const match = tenantid ?  {_id: ID(tenantid), "roles.name": {$regex: regex}}: {"roles.name": {$regex: regex}};
            
            const accs =  db.collection(strings.TENANT_COLLECTION).aggregate([
                {$match:match},
                {$project: {roles: {$filter: {
                    input: "$roles",
                    as: "role",
                    cond: {$regexMatch: {input: "$$role.name", regex}}}}}},
                    {$unwind: "$roles"},
                {$replaceRoot: { newRoot: "$roles" } }
            ]);
            const arr =  await accs.toArray();
            const rl = arr[0];
            if(rl) {
               
                const res = build_role(rl);
                return res;
            }

        } catch(ex) {
            throw ex;
        }
    }


    return Object.freeze({
        add_tenant_role,
        get_tenant_roles,
        remove_tenant_role,
        get_tenant_role_by_id,
        get_tenant_role_by_name}
    )

}

module.exports = tenant_role_db;