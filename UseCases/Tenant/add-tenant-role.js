const crypto = require('crypto')
const { TenantRole } = require("../../Entities/Role");

const AddTenantRole = ({tenant_db, tenant_role_db}) => {
    return async (req) => {
        try {
           
            const {data, params} =  req;
            const id =  params.id;
            const tenant =  await tenant_db.get_tenant(id);
            if(!tenant) {
                throw new Error('invalid application');
            }
            data.id =  crypto.randomUUID();
            console.log(data)
            const role = TenantRole({...data, tenantid: id});
            const exists = await tenant_role_db.get_tenant_role_by_name(role.GetName().trim(), id);
            
            
            if(exists) {
                throw new Error("A role with this name alreadt exist");
            }
           
            const roledata =  role.ToJson();
            roledata.type = 'tenant';
            
            const res =  await tenant_role_db.add_tenant_role(roledata);
            return roledata;
        } catch(ex) {
            console.log(ex);
            throw ex;
        }
    }

}

module.exports = AddTenantRole;