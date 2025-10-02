const RemoveTenantRole = ({tenant_role_db, tenant_db, serviceaccount_role_db, user_db, app_db}) => {
    return async req => {
        try {11
            const {tenantid, roleid} =  req.params;
            const  tenant = await  tenant_db.get_tenant(tenantid);

            if(!tenant) {
                throw new Error('Invalid tenant');
            }
            const app_is_assigned =  await app_db.get_apps_assigned_to_role(roleid);
            const user_is_assighned = await user_db.find_with_role(roleid);
            console.log(app_is_assigned[0], user_is_assighned.map(u => u.getRoles()))
            if((app_is_assigned && app_is_assigned.length > 0) || (user_is_assighned && user_is_assighned.lengtn > 0) ) {
                throw new Error('Role is assigned');
            }
            const del =  await tenant_role_db.remove_tenant_role(tenantid);
            console.log(del);
            if(del.deleted) {
                return del
            } else {
                throw new Error('Could not delete')
            }
         } catch(ex) {
            console.log(ex);
            throw ex;
        }
    }
}

module.exports =  RemoveTenantRole;