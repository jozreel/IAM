const make_tenant =  require('../../Entities/Tenant')
const AddTenant = ({tenant_db}) => {
    return async (req) => {
        try {
            const data =  req.data;
            const exist = await tenant_db.get_tenant_by_name(data.tenantname);
            if(exist) {
                throw new Error('Duplicate tenant name');
            }
            const tenant = make_tenant(data);

            const ins =  tenant_db.add_tenant(tenant.toJson());
            return ins;

        } catch (ex) {
            throw ex;
        }
    }
}

module.exports =  AddTenant;