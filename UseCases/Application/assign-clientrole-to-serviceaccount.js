const { RolesApplication } = require("../../Entities/Role");

const AssignClientRoleToServiceAccount = ({serviceaccount_roles_db, app_role_db, app_db}) => {

    return async (req) => {
        try {

            const {data} =  req;
            const app =  await app_db.get_application(data.applicationid);
            if(!app) {
                throw new Error('Invalid application');
            }
            if(!app.isServiceAccountEnabled()) {

                throw new Error('Service account is not enabled')
            }
            const role = await app_role_db.GetRoleById(data.roleid, data.applicationid);
           
            if(!role) {
                throw new Error('Invalid role');
            }

            
            const isassigned =  await serviceaccount_roles_db.check_if_role_assigned_to_application(data.roleid, data.applicationid);
            console.log(isassigned)
            if(isassigned) {
                throw new Error('Role already assigned');
            }
            const roleapp =  RolesApplication({...data, type: 'client'});
            await serviceaccount_roles_db.assign_role_to_application(roleapp.ToJson());
            return  roleapp.ToJson();

        } catch(ex) {
            console.log(ex);
            throw ex;
        }
    }

}

module.exports =  AssignClientRoleToServiceAccount;