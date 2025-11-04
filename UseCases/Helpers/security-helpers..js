const security_helpers = ({user_db, app_role_db, tenant_role_db, app_db}) => {
    
    const check_has_role = async(userid, role) => {
        try {
            const role =  await user_db.verify_access(userid, role);
            if(!role) {
                throw new Error('Invalid role');
            }
            return role;
        } catch(ex) {
            throw ex;
        }

    }

    const check_has_role_by_name = async (userid, role, client) => {
        try {
            const app =  await app_db.get_application(client);
            if(!app) {
                throw new Error('Invalid app');
            }
            let mr = await app_role_db.GetRoleByName(role, client);
            if(!mr) {
                const tenantid =  app.getTenantId();
                mr =  await tenant_role_db.get_tenant_role_by_name(role, tenantid);
            }
            if(!mr) {
                throw new Error('Invalid role');
            }
        
            
            const hasaccess = await user_db.verify_access(userid, mr.GetId());
            if(!hasaccess) {
                throw new Error('You do not have access');
            }
            return hasaccess;

        } catch(ex) {
            throw ex;
        }

    }

    return Object.freeze({
        check_has_role,
        check_has_role_by_name
    })
}

module.exports =  security_helpers;