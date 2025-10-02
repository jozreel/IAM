const { RolesApplication } = require("../../Entities/Role");

const AssignTenantRoleToServiceAccount = ({serviceaccount_roles_db, app_db, tenant_role_db}) => {

    return async (req) => {
        try {

            const {data} =  req;
            const isassigned =  await serviceaccount_roles_db.check_if_role_assigned_to_application(data.roleid, data.applicationid);
            
            if(isassigned) {
                throw new Error('Role already assigned');
            }
            const app = await app_db.get_application(data.applicationid);
            if(!app) {
                throw new Error('Invalid app');
            }
             if(!app.isServiceAccountEnabled()) {

                throw new Error('Service account is not enabled')
            }
            const tenantid =  app.getTenantId();
            console.log(tenantid);
            const role =  await tenant_role_db.get_tenant_role_by_id(data.roleid, tenantid);
            if(!role) {
                throw new Error('invalid role');
            }
            
            const roleapp =  RolesApplication({...data, type: 'tenant'});
            const res = await serviceaccount_roles_db.assign_role_to_application(roleapp.ToJson());
            console.log(res);
            return  roleapp.ToJson();

        } catch(ex) {
            throw ex;
        }
    }

}

module.exports =  AssignTenantRoleToServiceAccount;