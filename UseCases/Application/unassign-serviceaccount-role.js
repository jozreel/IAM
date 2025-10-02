const UnassignServiceAccountRole = ({app_db, serviceaccount_roles_db}) => {
    return async (req) => {
        try {
            const {appid, roleid} =  req.params;
            const app =  await app_db.get_application(appid);
            if(!app) {
                throw new Error('Invalid application');
            }
           
            const serviceaccountroles =  app.getServiceAccountRoles();
            
            if(serviceaccountroles) {
                const has =  serviceaccountroles.find(s => s.applicationid === appid);
                if(!has) {
                    throw new RangeError('Not assigned');
                }
            } else {
                throw new RangeError('Not assigned');
            }

            const res =  await serviceaccount_roles_db.remove_role_from_application(roleid, appid);
            return {deleted: true};

        } catch(ex) {
            console.log(ex);;
            throw ex;
        }

       
    }
}

 module.exports =  UnassignServiceAccountRole;