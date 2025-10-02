const { TenantRole } = require('../../Entities/Role');
const make_tenant =  require('../../Entities/Tenant')
const crypto =  require('crypto');
const AddTenant = ({tenant_db}) => {
     const create_default_tenant_roles = (tid) => {
        const roles = [
            {name: 'view-realm', id: crypto.randomUUID(), tenantid: tid},
            {name: 'view-users', id: crypto.randomUUID(), tenantid: tid},
            {name: 'manage-users', id: crypto.randomUUID(),tenantid: tid},
            {name: 'create-tenant', id: crypto.randomUUID(), tenantid: tid},
            {name: 'manage-tenant', id: crypto.randomUUID(), tenantid: tid},
            {name: 'manage-apps', id: crypto.randomUUID(), tenantid: tid},
            {name: 'view-apps', id: crypto.randomUUID(), tenantid: tid}
        ]

        const mr =  roles.map(r => TenantRole(r));

        return mr;
    }
    return async (req) => {
        try {
            const data =  req.data;
            data.id =  crypto.randomUUID();
            data.roles =  create_default_tenant_roles(data.id);
            const exist = await tenant_db.get_tenant_by_name(data.tenantname);
            if(exist) {
                throw new Error('Duplicate tenant name');
            }
            const tenant = make_tenant(data);

            const ins =  tenant_db.add_tenant({_id: data.id, ...tenant.toJson()});
            return ins;

        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }
}

module.exports =  AddTenant;