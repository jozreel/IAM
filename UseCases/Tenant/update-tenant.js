const Tenant = require("../../Entities/Tenant");

const UpdateTenant = ({tenant_db, check_has_role_by_name}) => {
    return async (req) => {
        try {
            const {aud, sub} =  req.access;
            await check_has_role_by_name(sub, 'manage-tenants', aud);
            const {id} =  req.params;
            const {data} = req;
            const tenant =  await tenant_db.get_tenant(id);
            if(!tenant) {
                throw new RangeError('Tenant not found');
            }
            const ntd =  {...tenant.toJson(), ...data};
           
            const tem =  Tenant(ntd);
            
            await tenant_db.update_tenant({
                id: tem.getId(), 
                tenantname: tem.getTenentName(), 
                managers: tem.getManagers()});
            return ntd

        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }

}

module.exports =  UpdateTenant;